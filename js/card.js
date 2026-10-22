/* =====================================================================
   КАРТКА ТОВАРУ — лістинг (сітка 3 колонки) і каруселі, ширина 109 px.
   Бриф «Логіка відображення картки товару». Figma: 8602:18153.
   Усі правила словами й журнал рішень — docs/card-rules.md (міняєте правило — оновіть і його).

   Під фото — фіксований порядок слотів:
     1 Ціна (завжди перша) · 2 Бенефіти · 3 Інфо · 4 Мета · 5 Вага · 6 Назва
   Слоти 2–4 — додаткові рядки, максимум Card.MAX_EXTRAS на картку;
   зайві ховаються з кінця Card.PRIORITY. Порожній слот не рендериться.
   Рівень картки: A — 0–1 додатковий рядок, B — 2.
   Nutri-Score — окремим рядком одразу під назвою (settings.nutriPlace = 'bottom'):
   він не рахується в ліміт і не відривається від назви. 'slot' — як у брифі, у слоті «Мета».
   Висоту ряду вирівнює сітка (stretch); назва — максимум 3 рядки, за потреби 2; під короткою
   вільне місце лишається внизу картки, не між назвою й Nutri-Score.

   Card.html(item)        — розмітка картки (item з DATA: { id, badges, liked })
   Card.layout(container) — після рендеру: режим ББ, рівні рядів, рядки назви
   Card.settings          — перемикачі демо-сторінки (правила, режим ББ, debug)
   ===================================================================== */

const Card = {
  settings: {
    rules: true,        // true — «Нові правила»; false — «Як є» (стара картка), для порівняння
    bbMode: 'row',      // 'row' — чипом у рядку бенефітів (не влазить — бейджем на фото) | 'photo' — завжди бейджем на фото
    nutriPlace: 'bottom', // 'bottom' — окремим рядком одразу під назвою | 'slot' — у слоті «Мета» (рахується в ліміт рядків)
    oldPricePlace: 'row',    // 'row' — завжди окремим рядком | 'inline' — поруч із поточною (не влазить — окремим рядком)
    discountPlace: 'row',
    discountStyle: 'tag',
    bbStyle: 'tag',       // ББ на фото: 'tag' — компактний прямокутний «ⓑ +12» | 'round' — круглий фіолетовий із сумою // знижка на фото: 'tag' — прямокутний тег −30% | 'round' — круглий бейдж як «%», але з величиною // 'row' — тег −30% у рядку бенефітів | 'photo' — лише бейджем −30% на фото (без дубля)
    nutriStyle: 'official', // 'official' — модуль без змін | 'compact' — без напису й білої підкладки (НЕ за хартією, лише для порівняння)
    debug: false,       // підпис рівня, рядків назви й схованого на кожній картці
    highlightHidden: false, // підсвітити картки, де щось не влізло (data-hidden не порожній)
    roundBubbles: true, // false — круглі бейджі на фото не показуємо: «Я ще ОК», промо, «б» ББ, а також знижку й ББ у круглому вигляді
  },

  MAX_EXTRAS: 2,
  MAX_BUBBLES: 2,
  /** Важливість додаткових рядків: що в кінці — ховається першим.
      Термін уцінки — завжди перший: він юридично обовʼязковий і не ховається ні за яких умов.
      Окремий рядок ББ — найслабший: не влазить у ліміт — ББ просто не показуємо (ні в рядку, ні на фото). */
  PRIORITY: ['markdown', 'benefits', 'meta', 'installment', 'bbLine'],
  NAMES: {
    benefits: 'Бенефіти', bbLine: 'ББ окремим рядком', markdown: 'Термін', meta: 'Nutri-Score', installment: 'Розтермінування',
    bulk: '«від 2 шт»', bubble: 'бабл', bb: 'сума ББ',
  },
  // рядків назви = база − додаткові рядки картки, у межах 2–3: 0–1 доп. → 3 рядки, 2 доп. → 2
  NAME_BASE: { A: 4, B: 4 },
  NAME_MIN: 2,
  NAME_MAX: 3,             // назва — не більше 3 рядків; за потреби (2 додаткові рядки) — 2
  NAME_LINE: 16,             // line-height назви, px

  /* ---------------- Формати ---------------- */
  /** Від цієї суми ціну пишемо без копійок: «157 999 ₴»; дешевше — завжди дві цифри, як у Figma: «170.00 ₴» */
  NO_CENTS_FROM: 10000,
  money(v) { return v >= this.NO_CENTS_FROM ? UI.money(v).replace('.00\u00a0', '\u00a0') : UI.money(v); },
  /** Стара ціна без ₴: «526.90», «179 999» */
  oldMoney(v) { return this.money(v).replace('\u00a0₴', ''); },
  /** ББ: «+12.21», «+1 580» (цілі бали — без копійок). TBD: округлення великих сум (+1 580 б чи +1.5к б) */
  bbText(v) { return '+' + UI.money(v).replace('.00\u00a0', '\u00a0').replace('\u00a0₴', ''); },
  /** ББ коротко (компактний бейдж на фото), завжди вниз — не обіцяємо більше, ніж нарахують:
      до 10 — одна цифра після крапки («+0.5»), до 1 000 — цілі («+12»), далі тисячами («+1.5к») */
  bbShort(v) {
    const trim = n => String(n).replace(/\.0$/, '');
    if (v < 10) return '+' + trim(Math.floor(v * 10) / 10);
    if (v < 1000) return '+' + Math.floor(v);
    return '+' + trim(Math.floor(v / 100) / 10) + 'к';
  },
  fill(tpl, data) { return tpl.replace(/\{(\w+)\}/g, (_, k) => data[k]); },
  bbOf(p) { return p.bb ?? (p.bonus ? parseFloat(p.bonus) : 0); },
  /** Розтермінування є в усіх товарів від DATA.card.installment.from ₴; кількість платежів — з товару або типова */
  installmentOf(p) {
    const I = DATA.card.installment;
    if (p.price < I.from) return null;
    return { payments: (p.installment && p.installment.payments) || I.payments };
  },

  /* ---------------- Що показати ----------------
     variant: { oldInline — стара ціна в рядку ціни, bbOnPhoto — ББ бейджем на фото,
                bbLine — чип ББ окремим рядком під знижкою (не влазить з нею в один) } */
  plan(item, variant) {
    const p = DATA.products[item.id];
    let bb = this.bbOf(p);
    const sale = !!p.oldPrice;
    const hidden = [];

    // «Від 2 шт» — окремий тип цінової деталі; зі знижкою показуємо знижку (TBD)
    const bulk = p.bulk && !sale ? p.bulk : null;
    if (p.bulk && sale) hidden.push(this.NAMES.bulk);
    // Сума ББ — лише в одному місці: чипом у рядку бенефітів або бейджем на фото (режим ББ).
    const bbOnPhoto = !!bb && variant.bbOnPhoto;
    // Знижка на фото: тег −30% переїжджає на фото, у рядку бенефітів лишається хіба стара ціна (коли не влазить поруч)
    const discountOnPhoto = sale && this.settings.discountPlace === 'photo';
    const oldInline = sale && variant.oldInline;
    // Головний рядок бенефітів: стара ціна (коли не поруч із поточною) + знижка, або «від 2 шт»
    const mainBenefits = (sale && (!discountOnPhoto || !oldInline)) || !!bulk;
    // ББ в рядку не влазить поруч зі знижкою — переноситься на свій рядок (найслабший додатковий рядок, див. PRIORITY).
    const bbLine = !!bb && !bbOnPhoto && mainBenefits && !!variant.bbLine;

    const has = {
      benefits: mainBenefits || (!!bb && !bbOnPhoto),
      bbLine,
      markdown: !!p.markdown,
      // Nutri-Score унизу — окремий рядок поза лімітом додаткових
      meta: this.settings.nutriPlace === 'slot' && !!p.nutri,
      installment: !!this.installmentOf(p),
    };
    // Термін уцінки й розтермінування — один слот «Інфо», термін важливіший
    if (has.markdown && has.installment) { has.installment = false; hidden.push(this.NAMES.installment); }

    const candidates = this.PRIORITY.filter(k => has[k]);
    const extras = candidates.slice(0, this.MAX_EXTRAS);
    candidates.slice(this.MAX_EXTRAS).forEach(k => hidden.push(this.NAMES[k === 'bbLine' ? 'bb' : k]));
    // окремому рядку ББ не лишилось місця (термін уцінки, розтермінування…) — суму ББ не показуємо,
    // а фіолетовий бабл «б» лишається кандидатом на фото (найслабший серед баблів)
    const bbChipDropped = has.bbLine && !extras.includes('bbLine');
    if (bbChipDropped) bb = 0;

    // Бабли на фото: «Я ще ОК» (найсильніший) → знижка (коли вона на фото) → промо → ББ, максимум 2.
    // Промо можуть витіснити ББ. ББ на фото — бейдж із сумою; ББ чипом у рядку — на фото фіолетовий бабл «б»
    // без суми (сума лишається в рядку). Знижка на фото замінює загальний бабл «%» — інакше той самий сенс двічі.
    // Знижка й ББ обидві на фото (прямокутні бейджі) → інший ліміт: 1 круглий бабл + обидва прямокутні,
    // щоб на фото були і знижка, і ББ. Круглий — «Я ще ОК», інакше перше промо.
    const round = [];
    if (p.markdown) round.push({ image: DATA.card.markdownBubble });
    (item.badges || []).filter(b => !(discountOnPhoto && b === 'percent'))
      .forEach(b => round.push({ image: DATA.badges[b] }));
    let bubbles, shown;
    if (discountOnPhoto && bb && bbOnPhoto) {
      const rect = [{ discount: p.discount }, { bb }];
      bubbles = [...round, ...rect];
      shown = [...round.slice(0, 1), ...rect];
    } else {
      bubbles = [...round.slice(0, p.markdown ? 1 : 0)];
      if (discountOnPhoto) bubbles.push({ discount: p.discount });
      bubbles.push(...round.slice(p.markdown ? 1 : 0));
      if (bb) bubbles.push(bbOnPhoto ? { bb } : { image: DATA.card.bbBubble });
      else if (bbChipDropped) bubbles.push({ image: DATA.card.bbBubble });
      shown = bubbles.slice(0, this.MAX_BUBBLES);
    }
    // круглі бейджі вимкнені — їх не показуємо взагалі, тож і «не влізло» про них не пишемо
    bubbles.filter(b => !shown.includes(b) && (this.settings.roundBubbles || !this.isRound(b))).forEach(b => hidden.push(this.NAMES.bubble + ' «'
      + (b.image ? b.image.alt : b.discount ? '−' + b.discount + '%' : 'ББ') + '»'));

    return {
      p, bb, sale, bulk, bbOnPhoto, discountOnPhoto, hidden, oldInline, bbLine,
      show: Object.fromEntries(extras.map(k => [k, true])),
      extras: extras.length,
      level: extras.length >= 2 ? 'B' : 'A',
      // порядок на фото: круглі бабли (зокрема «б» ББ) завжди перші, далі знижка, далі бейдж ББ із сумою
      bubbles: shown.sort((a, b) => this.bubbleOrder(a) - this.bubbleOrder(b)),
    };
  },

  /** Знижка на фото кругла, лише коли круглі бейджі ввімкнені; вимкнені — стає прямокутним тегом, а не зникає */
  discountRound() { return this.settings.discountStyle === 'round' && this.settings.roundBubbles; },

  /** Круглий бейдж: усі бабли-картинки, а також знижка й ББ, якщо вони в круглому вигляді */
  isRound(b) {
    if (b.discount) return this.discountRound();
    if (b.bb) return this.settings.bbStyle === 'round';
    return !!b.image;
  },

  /** Порядок на фото: 0 — група круглих (і фіолетовий «б» ББ, хоч він і не круглий), 1 — знижка, 2 — бейдж ББ із сумою */
  bubbleOrder(b) {
    if (b.discount) return 1;
    if (b.bb) return 2;
    return 0;
  },

  /** Варіанти розкладки цін і ББ — від «влазить» до «не влазить» */
  variants() {
    // Попередня ціна «Окремим рядком» — поруч із поточною її не ставимо взагалі.
    // ББ в рядку ніколи не йде на фото: не влазить поруч зі знижкою — переноситься на свій рядок.
    // Перебираємо від найкомпактнішого: стара ціна поруч → ББ окремим рядком → стара ціна вниз → обидва.
    const inline = this.settings.oldPricePlace === 'inline';
    const bbOnPhoto = this.settings.bbMode === 'photo';
    if (bbOnPhoto) return [{ oldInline: inline, bbOnPhoto }, { oldInline: false, bbOnPhoto }];
    return [
      { oldInline: inline, bbOnPhoto, bbLine: false },
      { oldInline: inline, bbOnPhoto, bbLine: true },
      { oldInline: false, bbOnPhoto, bbLine: false },
      { oldInline: false, bbOnPhoto, bbLine: true },
    ];
  },

  /* ---------------- Дрібні елементи ---------------- */
  bbChip(bb, onPhoto) {
    const coin = '<img src="assets/icons/card/vr-coin-14.svg" alt="балів">';
    // на фото круглий: фіолетове коло 32 px із короткою сумою (довга сума — дрібніше, щоб влізла)
    if (onPhoto && this.settings.bbStyle === 'round') {
      const short = this.bbShort(bb);
      return `<span class="pc-bb-round ${short.length > 4 ? 'pc-bb-round--long' : ''}" title="${this.bbText(bb)} балів" aria-label="${this.bbText(bb)} балів">${short}</span>`;
    }
    // на фото — компактний бейдж розміром із тег знижки, сума скорочена (точна — у підказці)
    return onPhoto
      ? `<span class="pc-bb pc-bb--photo" title="${this.bbText(bb)} балів">${coin}${this.bbShort(bb)}</span>`
      : `<span class="pc-bb">${this.bbText(bb)}${coin}</span>`;
  },
  discountTag(p) { return `<span class="discount-tag">−${p.discount}%</span>`; },
  oldPrice(p) { return `<span class="price-old">${this.oldMoney(p.oldPrice)}</span>`; },
  bulkText(bulk) {
    return `<span class="pc-bulk"><b>${this.money(bulk.price)}</b> ${this.fill(DATA.card.bulkText, bulk)}</span>`;
  },
  markdown(p) { return `<span class="pc-term">${this.fill(DATA.card.markdownText, p.markdown)}</span>`; },
  installment(p) {
    return `<span class="pc-installment"><img src="assets/icons/card/installment.svg" alt="">${this.fill(DATA.card.installmentText, this.installmentOf(p))}</span>`;
  },
  /** Nutri-Score: офіційний горизонтальний модуль без змін (графічна хартія, docs/card-rules.md п. 7).
      Велнес-теги в картці лістингу не показуємо (правило — docs/card-rules.md п. 7). */
  meta(p, extraClass = '') {
    const compact = this.settings.rules && this.settings.nutriStyle === 'compact'; // «Як є» — завжди офіційний
    const src = this.fill(compact ? DATA.card.nutriLogoCompact : DATA.card.nutriLogo, { grade: p.nutri.toLowerCase() });
    return `<div class="pc-slot pc-meta ${compact ? 'pc-meta--compact' : ''} ${extraClass}" data-slot="meta">
      <img class="nutri-logo" src="${src}" alt="Nutri-Score ${p.nutri}">
    </div>`;
  },
  bubble(b) {
    if (b.bb) return this.bbChip(b.bb, true);
    if (b.discount) {
      return this.discountRound()
        ? `<span class="pc-discount-round" aria-label="Знижка ${b.discount}%">−${b.discount}<small>%</small></span>`
        : `<span class="discount-tag pc-discount-photo">−${b.discount}%</span>`;
    }
    return `<img src="${b.image.image}" alt="${b.image.alt}">`;
  },
  media(item, p, bubbles) {
    return `
      <div class="pc-media">
        <img class="pc-img" src="${p.image}" alt="${p.name}">
        <div class="pc-bubbles">${bubbles.filter(b => this.settings.roundBubbles || !this.isRound(b)).map(b => this.bubble(b)).join('')}</div>
        ${UI.likeButton(item.liked)}
        ${p.expected ? `<span class="pc-expected">${DATA.card.expected}</span>` : UI.qtyControl(item.id)}
        <span class="pc-debug" hidden></span>
      </div>`;
  },

  /** Налаштування, від яких залежить розмітка: змінились — картку перемальовуємо */
  mode() { return [this.settings.bbStyle, this.settings.discountStyle, this.settings.roundBubbles, this.settings.bbMode, this.settings.oldPricePlace, this.settings.discountPlace, this.settings.nutriPlace, this.settings.nutriStyle].join('/'); },

  /* ---------------- Розмітка ---------------- */
  html(item, variantIndex = 0) {
    const p = DATA.products[item.id];
    const attrs = `class="plp-card ${this.settings.rules ? 'plp-card--rules' : ''} ${p.expected ? 'is-expected' : ''}" data-go="pdp" data-param="${item.id}"
      data-name="${p.name.toLocaleLowerCase('uk-UA')}" data-sale="${p.oldPrice ? 'true' : 'false'}"
      data-tag="${item.tag || p.tag || ''}" data-tags="${(p.tags || []).join(' ')}" data-item='${JSON.stringify(item)}' data-variant="${variantIndex}" data-mode="${this.mode()}"`;
    return this.settings.rules
      ? this.htmlRules(item, p, attrs, this.variants()[variantIndex])
      : this.htmlLegacy(item, p, attrs);
  },

  htmlRules(item, p, attrs, variant) {
    const pl = this.plan(item, variant);
    const main = pl.sale
      ? `${pl.oldInline ? '' : this.oldPrice(p)}${pl.discountOnPhoto ? '' : this.discountTag(p)}`
      : pl.bulk ? this.bulkText(pl.bulk) : '';
    const chip = pl.bb && !pl.bbOnPhoto ? this.bbChip(pl.bb) : '';
    const benefits = pl.bbLine ? main : main + chip;
    const info = pl.show.markdown ? this.markdown(p) : pl.show.installment ? this.installment(p) : '';
    return `
      <article ${attrs} data-level="${pl.level}" data-extras="${pl.extras}" data-hidden="${pl.hidden.join(', ')}">
        ${this.media(item, p, pl.bubbles)}
        <div class="pc-body">
          <div class="pc-price" data-slot="price">
            <span class="pc-price__now">${this.money(p.price)}</span>${pl.oldInline ? this.oldPrice(p) : ''}
          </div>
          ${pl.show.benefits ? `<div class="pc-slot pc-benefits" data-slot="benefits">${benefits}</div>` : ''}
          ${pl.show.bbLine ? `<div class="pc-slot pc-benefits" data-slot="bb">${chip}</div>` : ''}
          ${info ? `<div class="pc-slot pc-info" data-slot="info">${info}</div>` : ''}
          ${pl.show.meta ? this.meta(p) : ''}
          <div class="pc-text">
            <p class="pc-weight">${p.weight}</p>
            <p class="pc-name">${p.name}</p>
          </div>
          ${this.settings.nutriPlace === 'bottom' && p.nutri ? this.meta(p, 'pc-meta--bottom nutri-row') : ''}
        </div>
      </article>`;
  },

  /** Стара картка («Як є»): усе підряд, без ліміту рядків і вирівнювання; ББ — бабл «б» на фото + чип із сумою;
      на фото не більше 2 баблів (ББ → «Я ще ОК» → промо); «довга» картка (2+ рядки під ціною) — назва до 2 рядків.
      Порядок під фото: ціна → знижка → бенефіти (ББ, «від 2 шт») → термін уцінки → розтермінування */
  htmlLegacy(item, p, attrs) {
    const bb = this.bbOf(p);
    const bubbles = [];
    if (bb) bubbles.push({ image: DATA.card.bbBubble });
    if (p.markdown) bubbles.push({ image: DATA.card.markdownBubble });
    (item.badges || []).forEach(b => bubbles.push({ image: DATA.badges[b] }));
    // і в старій картці на фото не більше 2 баблів
    const hidden = bubbles.splice(this.MAX_BUBBLES).filter(() => this.settings.roundBubbles)
      .map(b => this.NAMES.bubble + ' «' + b.image.alt + '»');
    const lines = [
      p.oldPrice && `<div class="pc-slot">${this.oldPrice(p)}${this.discountTag(p)}</div>`,
      bb && `<div class="pc-slot">${this.bbChip(bb)}</div>`,
      p.bulk && `<div class="pc-slot">${this.bulkText(p.bulk)}</div>`,
      p.markdown && `<div class="pc-slot">${this.markdown(p)}</div>`,
      this.installmentOf(p) && `<div class="pc-slot">${this.installment(p)}</div>`,
    ].filter(Boolean);
    return `
      <article ${attrs} data-level="" data-extras="${lines.length}" data-hidden="${hidden.join(', ')}">
        ${this.media(item, p, bubbles)}
        <div class="pc-body">
          <div class="pc-price"><span class="pc-price__now">${this.money(p.price)}</span></div>
          ${lines.join('')}
          <div class="pc-text">
            <p class="pc-weight">${p.weight}</p>
            <p class="pc-name ${lines.length >= 2 ? 'pc-name--short' : ''}">${p.name}</p>
          </div>
          ${p.nutri ? this.meta(p) : ''}
        </div>
      </article>`;
  },

  /* ---------------- Підгонка після рендеру ---------------- */
  /** Перемальовує картку в іншому варіанті, зберігаючи видимість (фільтри лістингу) */
  replace(card, variantIndex) {
    const tpl = document.createElement('template');
    tpl.innerHTML = this.html(JSON.parse(card.dataset.item), variantIndex).trim();
    const next = tpl.content.firstElementChild;
    next.hidden = card.hidden;
    card.replaceWith(next);
    return next;
  },

  overflows(el) { return el.scrollWidth > el.clientWidth + 0.5; },

  /** Режим ББ: «влазить» (стара ціна поруч, ББ чипом) або «не влазить» (стара ціна вниз, ББ на фото) */
  fit(card) {
    const variants = this.variants();
    if (card.dataset.variant !== '0' || card.dataset.mode !== this.mode()) card = this.replace(card, 0);
    for (let i = 1; i < variants.length; i++) {
      const rows = [...card.querySelectorAll('.pc-price, .pc-benefits')];
      if (!rows.some(r => this.overflows(r))) break;
      card = this.replace(card, i);
    }
    return card;
  },

  /** Картки, згруповані в ряди сітки (за вертикальною позицією) */
  rows(cards) {
    const rows = new Map();
    cards.forEach(c => {
      const top = Math.round(c.offsetTop);
      if (!rows.has(top)) rows.set(top, []);
      rows.get(top).push(c);
    });
    return [...rows.values()];
  },

  clampLines(n) { return Math.max(this.NAME_MIN, Math.min(this.NAME_MAX, n)); },

  /** Контейнери, які перерозкладаються при зміні ширини, шрифтів і налаштувань */
  containers: new Map(), // контейнер → { carousel }

  /**
   * Розкладає картки контейнера. carousel: true — карусель, завжди рівень B
   * (висота не стрибає при скролі й довантаженні).
   */
  layout(container, { carousel = false } = {}) {
    if (!container) return;
    if (!this.containers.has(container)) this.watch(container, carousel);
    container.classList.toggle('pc-legacy', !this.settings.rules);
    container.classList.toggle('pc-debug-on', this.settings.debug);
    container.classList.toggle('pc-highlight-hidden', this.settings.highlightHidden);

    let cards = [...container.querySelectorAll('.plp-card')];
    // правила ввімкнули/вимкнули — перемальовуємо в потрібному вигляді
    cards = cards.map(c => (c.classList.contains('plp-card--rules') === this.settings.rules && c.dataset.mode === this.mode()
      ? c : this.replace(c, 0)));
    const visible = cards.filter(c => !c.hidden);

    if (this.settings.rules) {
      visible.forEach((c, i) => { visible[i] = this.fit(c); });
    }
    // скидаємо підгонку назви, щоб ряди склались із «природних» висот
    visible.forEach(c => {
      c.style.minHeight = '';
      const name = c.querySelector('.pc-name');
      name.style.minHeight = '';
      name.style.maxHeight = '';
      name.style.webkitLineClamp = '';
    });

    if (this.settings.rules) {
      const rows = carousel ? [visible] : this.rows(visible);
      rows.forEach(row => {
        const level = carousel || row.some(c => c.dataset.level === 'B') ? 'B' : 'A';
        row.forEach(c => {
          // рядків_назви = база рівня ряду − додаткові рядки картки (у межах 2–3)
          const lines = this.clampLines(this.NAME_BASE[level] - Number(c.dataset.extras));
          const name = c.querySelector('.pc-name');
          name.style.minHeight = lines * this.NAME_LINE + 'px';
          name.style.webkitLineClamp = lines;
          c.dataset.rowLevel = level;
        });
      });
      // Ряд вирівняв висоту карток. Назва не росте понад свою норму (3 рядки, у «довгої» картки з двома
      // додатковими рядками — 2): зайве місце лишається внизу картки. Спершу міряємо всі, потім міняємо.
      const fits = visible.map(c => [c, c.querySelector('.pc-name'), Number(c.querySelector('.pc-name').style.webkitLineClamp), c.offsetHeight]);
      fits.forEach(([card, name, lines, height]) => {
        card.style.minHeight = height + 'px'; // висоту ряду тримає картка, а не запас під назвою
        name.style.minHeight = '';
        // назва — лише своєї висоти: Nutri-Score одразу під нею, порожнеча — внизу картки
        name.style.maxHeight = lines * this.NAME_LINE + 'px'; // Chrome інакше показує шматок наступного рядка
      });
    }
    visible.forEach(c => {
      this.debug(c);
      // підказка при наведенні: що саме не влізло
      c.title = this.settings.highlightHidden && c.dataset.hidden ? 'Не влізло: ' + c.dataset.hidden : '';
    });
    if (typeof Cart !== 'undefined') Cart.render(); // степери «− N шт +» у перемальованих картках
  },

  debug(card) {
    const el = card.querySelector('.pc-debug');
    el.hidden = !this.settings.debug;
    if (!this.settings.debug) return;
    const name = card.querySelector('.pc-name');
    const lines = name.style.webkitLineClamp || 3;
    const hidden = card.dataset.hidden;
    el.innerHTML = this.settings.rules
      ? `<b>${card.dataset.level}</b> · доп ${card.dataset.extras} · назва ${lines}р`
        + (card.dataset.rowLevel !== card.dataset.level ? `<br>ряд ${card.dataset.rowLevel}` : '')
        + (hidden ? `<br>сховано: ${hidden}` : '')
      : `без правил · доп ${card.dataset.extras}`;
  },

  watch(container, carousel) {
    this.containers.set(container, { carousel });
    let width = container.clientWidth;
    new ResizeObserver(() => {
      if (container.clientWidth === width) return; // висота змінюється від самої розкладки
      width = container.clientWidth;
      this.layout(container, { carousel });
    }).observe(container);
  },

  /** Перерозкласти все (змінились налаштування або довантажились шрифти) */
  relayout() {
    this.containers.forEach((opts, container) => {
      if (container.isConnected) this.layout(container, opts);
      else this.containers.delete(container);
    });
  },
};

// ширина цін залежить від шрифту — після його завантаження міряємо ще раз
if (document.fonts) document.fonts.ready.then(() => Card.relayout());
