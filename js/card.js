/* =====================================================================
   КАРТКА ТОВАРУ — лістинг (сітка 3 колонки) і каруселі, ширина 109 px.
   Бриф «Логіка відображення картки товару». Figma: 8602:18153.
   Усі правила словами й журнал рішень — docs/card-rules.md (міняєте правило — оновіть і його).

   Під фото: Ціна (завжди перша) · потік бейджів · Вага · Назва.
   Потік бейджів — один, переноситься як текст, максимум Card.MAX_LINES рядки, порядок Card.FLOW:
     стара ціна → знижка («від 2 шт») → термін уцінки → [Nutri-Score у слоті] → розтермінування → ББ.
   Що не влізло в 2 рядки — ховаємо з кінця. Термін уцінки не ховається ніколи.
   Рівень картки: A — 0–1 рядок потоку, B — 2.
   Nutri-Score — окремим рядком одразу під назвою (settings.nutriPlace = 'bottom'):
   він не рахується в ліміт і не відривається від назви. 'slot' — як у брифі, у слоті «Мета».
   'photo' — на фото в лівому верхньому куті, першим над баблами (варіант): не займає рядків і не рахується в ліміт баблів.
   'weight' — у рядку ваги (варіант): рядок останній, після назви; Nutri-Score ліворуч, вага одразу за ним.
   Висоту ряду вирівнює сітка (stretch); назва — максимум 3 рядки, за потреби 2; під короткою
   вільне місце лишається внизу картки, не між назвою й Nutri-Score.

   Card.html(item)        — розмітка картки (item з DATA: { id, badges, liked })
   Card.layout(container) — після рендеру: режим ББ, рівні рядів, рядки назви
   Card.settings          — перемикачі демо-сторінки (правила, режим ББ, підсвітка)
   ===================================================================== */

const Card = {
  settings: {
    rules: true,        // true — «Нові правила»; false — «Як є» (стара картка), для порівняння
    bbMode: 'row',      // 'row' — чипом у рядку бенефітів (не влазить — бейджем на фото) | 'photo' — завжди бейджем на фото
    nutriPlace: 'bottom', // 'bottom' — окремим рядком одразу під назвою | 'slot' — у слоті «Мета» (рахується в ліміт рядків) | 'photo' — на фото, першим у лівому верхньому куті | 'weight' — у рядку ваги після назви
    discountPlace: 'row',
    discountStyle: 'tag',
    installmentPlace: 'row', // 'row' — чипом «x24 платежі» у слоті «Інфо» | 'photo' — компактним бейджем «x24» на фото
    installmentShort: false, // true — розтермінування в рядку «Інфо» коротко: «іконка x24» на тій самій плашці
    installmentStyle: 'tag', // розтермінування на фото: 'tag' — прямокутний | 'round' — круглий 32 px (іконка над «x24»)
    bbStyle: 'tag',       // ББ на фото: 'tag' — компактний прямокутний «ⓑ +12» | 'round' — круглий із сумою, у кольорах прямокутного // знижка на фото: 'tag' — прямокутний тег −30% | 'round' — круглий бейдж як «%», але з величиною // 'row' — тег −30% у рядку бенефітів | 'photo' — лише бейджем −30% на фото (без дубля)
    nutriStyle: 'official', // 'official' — модуль без змін | 'compact' — без напису й білої підкладки | 'minimal' — підпис «Nutri-Score» + літера в квадратику (обидва НЕ за хартією, лише для порівняння)
    highlightHidden: false, // підсвітити картки, де щось не влізло (data-hidden не порожній)
    roundBubbles: true, // false — круглі бейджі на фото не показуємо: «Я ще ОК», промо, «б» ББ, а також знижку й ББ у круглому вигляді
  },

  MAX_LINES: 2,
  MAX_BUBBLES: 2,
  /** Порядок потоку бейджів під ціною: що в кінці — ховається першим, коли не влазить у 2 рядки.
      Термін уцінки юридично обовʼязковий — не ховається ні за яких умов. Nutri-Score у слоті займає цілий рядок. */
  FLOW: ['old', 'discount', 'bulk', 'markdown', 'meta', 'installment', 'bb'],
  NAMES: {
    old: 'попередня ціна', discount: 'знижка', markdown: 'Термін', meta: 'Nutri-Score', installment: 'Розтермінування',
    bulk: '«від 2 шт»', bubble: 'бабл', bb: 'сума ББ',
  },
  // рядків назви = база − додаткові рядки картки, у межах 2–3: 0–1 доп. → 3 рядки, 2 доп. → 2
  NAME_BASE: { A: 4, B: 4 },
  NAME_MIN: 2,
  NAME_MAX: 3,             // назва — не більше 3 рядків; за потреби (2 додаткові рядки) — 2
  NAME_LINE: 14,             // line-height назви, px (як у проді)

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
     cut — скільки елементів потоку показати (решта не влізла в 2 рядки; міряє Card.fit) */
  plan(item, cut = Infinity) {
    const p = DATA.products[item.id];
    let bb = this.bbOf(p);
    const sale = !!p.oldPrice;
    const hidden = [];
    const installment = this.installmentOf(p);

    // «Від 2 шт» — окремий тип цінової деталі; зі знижкою показуємо знижку (TBD)
    const bulk = p.bulk && !sale ? p.bulk : null;
    if (p.bulk && sale) hidden.push(this.NAMES.bulk);
    // Сума ББ — лише в одному місці: чипом у потоці або бейджем на фото (режим ББ).
    const bbOnPhoto = !!bb && this.settings.bbMode === 'photo';
    // Знижка на фото: тег −30% переїжджає на фото, у потоці лишається стара ціна
    const discountOnPhoto = sale && this.settings.discountPlace === 'photo';
    // Термін уцінки й розтермінування разом не показуємо — термін важливіший (і коли розтермінування на фото)
    if (p.markdown && installment) hidden.push(this.NAMES.installment);
    const installmentOn = !!installment && !p.markdown;
    // Розтермінування на фото — компактний бейдж «x24», у потоці його немає
    const installmentOnPhoto = installmentOn && this.settings.installmentPlace === 'photo';

    // Потік бейджів під ціною, у порядку Card.FLOW
    const has = {
      old: sale,
      discount: sale && !discountOnPhoto,
      bulk: !!bulk,
      markdown: !!p.markdown,
      meta: this.settings.nutriPlace === 'slot' && !!p.nutri, // Nutri-Score у слоті — цілим рядком
      installment: installmentOn && !installmentOnPhoto,
      bb: !!bb && !bbOnPhoto,
    };
    const flow = this.FLOW.filter(k => has[k]);
    const flowShown = flow.filter((k, i) => i < cut || k === 'markdown'); // термін не ховається ніколи
    flow.filter(k => !flowShown.includes(k)).forEach(k => hidden.push(this.NAMES[k]));
    // сума ББ не влізла в потік — не показуємо її, а фіолетовий бабл «б» лишається кандидатом на фото (найслабший серед баблів)
    const bbChipDropped = has.bb && !flowShown.includes('bb');
    if (bbChipDropped) bb = 0;

    // Бабли на фото: «Я ще ОК» (найсильніший) → знижка (коли вона на фото) → промо → ББ, максимум 2.
    // Промо можуть витіснити ББ. ББ на фото — бейдж із сумою; ББ чипом у рядку — на фото фіолетовий бабл «б»
    // без суми (сума лишається в рядку). Знижка на фото замінює загальний бабл «%» — інакше той самий сенс двічі.
    // Знижка й розтермінування на фото — сильні прямокутні бейджі (одразу після «Я ще ОК»). Кожен наступний прямокутний
    // додає місце: знижка + розтермінування → до 3 бейджів. Сильний прямокутний разом із ББ на фото → інший ліміт:
    // 1 круглий бабл + усі прямокутні, щоб на фото були і знижка / розтермінування, і ББ. Круглий — «Я ще ОК», інакше перше промо.
    const round = [];
    if (p.markdown) round.push({ image: DATA.card.markdownBubble });
    (item.badges || []).filter(b => !(discountOnPhoto && b === 'percent'))
      .forEach(b => round.push({ image: DATA.badges[b] }));
    const strong = [];
    if (discountOnPhoto) strong.push({ discount: p.discount });
    if (installmentOnPhoto) strong.push({ installment: installment.payments });
    let bubbles, shown;
    if (strong.length && bb && bbOnPhoto) {
      const rect = [...strong, { bb }];
      bubbles = [...round, ...rect];
      shown = [...round.slice(0, 1), ...rect];
    } else {
      bubbles = [...round.slice(0, p.markdown ? 1 : 0), ...strong, ...round.slice(p.markdown ? 1 : 0)];
      if (bb) bubbles.push(bbOnPhoto ? { bb } : { image: DATA.card.bbBubble });
      else if (bbChipDropped) bubbles.push({ image: DATA.card.bbBubble });
      shown = bubbles.slice(0, this.MAX_BUBBLES + Math.max(0, strong.length - 1));
    }
    // круглих на фото — не більше 2 (зокрема знижка й ББ у круглому вигляді): третій круглий ховаємо, найслабший — ББ
    let roundCount = 0;
    shown = shown.filter(b => !this.isRound(b) || ++roundCount <= this.MAX_BUBBLES);
    // круглі бейджі вимкнені — їх не показуємо взагалі, тож і «не влізло» про них не пишемо
    bubbles.filter(b => !shown.includes(b) && (this.settings.roundBubbles || !this.isRound(b))).forEach(b => hidden.push(this.NAMES.bubble + ' «'
      + (b.image ? b.image.alt : b.discount ? '−' + b.discount + '%' : b.installment ? 'x' + b.installment : 'ББ') + '»'));

    return {
      p, bb, bulk, hidden, flow: flowShown,
      // порядок на фото: круглі бабли (зокрема «б» ББ) завжди перші, далі знижка, розтермінування, бейдж ББ із сумою
      bubbles: shown.sort((a, b) => this.bubbleOrder(a) - this.bubbleOrder(b)),
    };
  },

  /** Знижка на фото кругла, лише коли круглі бейджі ввімкнені; вимкнені — стає прямокутним тегом, а не зникає */
  discountRound() { return this.settings.discountStyle === 'round' && this.settings.roundBubbles; },
  /** Так само ББ із сумою: вимкнені круглі бейджі — стає прямокутним, а не зникає */
  bbRound() { return this.settings.bbStyle === 'round' && this.settings.roundBubbles; },
  /** І розтермінування на фото */
  installmentRound() { return this.settings.installmentStyle === 'round' && this.settings.roundBubbles; },

  /** Круглий бейдж: усі бабли-картинки, а також знижка, розтермінування й ББ, якщо вони в круглому вигляді */
  isRound(b) {
    if (b.discount) return this.discountRound();
    if (b.installment) return this.installmentRound();
    if (b.bb) return this.bbRound();
    return !!b.image;
  },

  /** Порядок на фото: 0 — група круглих (і фіолетовий «б» ББ, хоч він і не круглий), 1 — знижка, 2 — розтермінування,
      3 — бейдж ББ із сумою */
  bubbleOrder(b) {
    if (b.discount) return 1;
    if (b.installment) return 2;
    if (b.bb) return 3;
    return 0;
  },

  /* ---------------- Дрібні елементи ---------------- */
  bbChip(bb, onPhoto) {
    const coin = '<img src="assets/icons/card/vr-coin-14.svg" alt="балів">';
    // на фото круглий: коло 32 px у кольорах прямокутного бейджа, монетка над короткою сумою (довга сума — дрібніше, щоб влізла)
    if (onPhoto && this.bbRound()) {
      const short = this.bbShort(bb);
      return `<span class="pc-bb-round ${short.length > 4 ? 'pc-bb-round--long' : ''}" title="${this.bbText(bb)} балів" aria-label="${this.bbText(bb)} балів">${coin}${short}</span>`;
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
  /** Коротко — іконка й «x24» на тій самій плашці (повний текст — у підказці), у рядку «Інфо» */
  installmentShort(p) {
    const I = this.installmentOf(p);
    return `<span class="pc-installment pc-installment--short" title="${this.fill(DATA.card.installmentText, I)}"><img src="assets/icons/card/installment.svg" alt="">x${I.payments}</span>`;
  },
  /** Nutri-Score: офіційний горизонтальний модуль без змін (графічна хартія, docs/card-rules.md п. 7).
      Велнес-теги в картці лістингу не показуємо (правило — docs/card-rules.md п. 7). */
  meta(p, extraClass = '') {
    const style = this.settings.rules ? this.settings.nutriStyle : 'official'; // «Як є» — завжди офіційний
    const grade = p.nutri.toLowerCase();
    // мінімалістичний (Figma 8638:2887): підпис «Nutri-Score» і літера оцінки в кольоровому квадратику
    const body = style === 'minimal'
      ? `<span class="nutri-mini" aria-label="Nutri-Score ${p.nutri}">Nutri-Score<b class="nutri-mini__grade nutri-mini__grade--${grade}">${p.nutri}</b></span>`
      : `<img class="nutri-logo" src="${this.fill(style === 'compact' ? DATA.card.nutriLogoCompact : DATA.card.nutriLogo, { grade })}" alt="Nutri-Score ${p.nutri}">`;
    return `<div class="pc-slot pc-meta ${style !== 'official' ? 'pc-meta--' + style : ''} ${extraClass}" data-slot="meta">
      ${body}
    </div>`;
  },
  bubble(b) {
    if (b.bb) return this.bbChip(b.bb, true);
    // розтермінування на фото — компактно: іконка й «x24» (повний текст — у підказці); кругле — іконка над «x24»
    if (b.installment) {
      return `<span class="pc-installment ${this.installmentRound() ? 'pc-installment-round' : 'pc-installment--photo'}" title="${this.fill(DATA.card.installmentText, { payments: b.installment })}"><img src="assets/icons/card/installment.svg" alt="">x${b.installment}</span>`;
    }
    if (b.discount) {
      return this.discountRound()
        ? `<span class="pc-discount-round" aria-label="Знижка ${b.discount}%">−${b.discount}<small>%</small></span>`
        : `<span class="discount-tag pc-discount-photo">−${b.discount}%</span>`;
    }
    return `<img src="${b.image.image}" alt="${b.image.alt}">`;
  },
  /** nutri — Nutri-Score на фото (nutriPlace = 'photo'): першим у стовпчику баблів */
  media(item, p, bubbles, nutri = '') {
    return `
      <div class="pc-media">
        <img class="pc-img" src="${p.image}" alt="${p.name}">
        <div class="pc-bubbles">${nutri}${bubbles.filter(b => this.settings.roundBubbles || !this.isRound(b)).map(b => this.bubble(b)).join('')}</div>
        ${UI.likeButton(item.liked)}
        ${p.expected ? `<span class="pc-expected">${DATA.card.expected}</span>` : UI.qtyControl(item.id)}
      </div>`;
  },

  /** Налаштування, від яких залежить розмітка: змінились — картку перемальовуємо */
  mode() { return [this.settings.bbStyle, this.settings.discountStyle, this.settings.roundBubbles, this.settings.bbMode, this.settings.discountPlace, this.settings.installmentPlace, this.settings.installmentShort, this.settings.installmentStyle, this.settings.nutriPlace, this.settings.nutriStyle].join('/'); },

  /* ---------------- Розмітка ---------------- */
  html(item, cut = Infinity) {
    const p = DATA.products[item.id];
    const attrs = `class="plp-card ${this.settings.rules ? 'plp-card--rules' : ''} ${p.expected ? 'is-expected' : ''}" data-go="pdp" data-param="${item.id}"
      data-name="${p.name.toLocaleLowerCase('uk-UA')}" data-sale="${p.oldPrice ? 'true' : 'false'}"
      data-tag="${item.tag || p.tag || ''}" data-tags="${(p.tags || []).join(' ')}" data-item='${JSON.stringify(item)}' data-cut="${cut}" data-mode="${this.mode()}"`;
    return this.settings.rules
      ? this.htmlRules(item, p, attrs, cut)
      : this.htmlLegacy(item, p, attrs);
  },

  htmlRules(item, p, attrs, cut) {
    const pl = this.plan(item, cut);
    // Nutri-Score «біля ваги»: рядок ваги — останній, після назви (у всіх карток, щоб вага стояла однаково)
    const weightRow = this.settings.nutriPlace === 'weight';
    // Nutri-Score у слоті «Мета»: назва перед вагою
    const nameFirst = this.settings.nutriPlace === 'slot';
    const el = {
      old: () => this.oldPrice(p),
      discount: () => this.discountTag(p),
      bulk: () => this.bulkText(pl.bulk),
      markdown: () => this.markdown(p),
      meta: () => this.meta(p, 'pc-meta--flow'),
      installment: () => (this.settings.installmentShort ? this.installmentShort(p) : this.installment(p)),
      bb: () => this.bbChip(pl.bb),
    };
    return `
      <article ${attrs} data-level="A" data-extras="0" data-hidden="${pl.hidden.join(', ')}">
        ${this.media(item, p, pl.bubbles, this.settings.nutriPlace === 'photo' && p.nutri ? this.meta(p, 'pc-meta--photo') : '')}
        <div class="pc-body">
          <div class="pc-price" data-slot="price">
            <span class="pc-price__now">${this.money(p.price)}</span>
          </div>
          ${pl.flow.length ? `<div class="pc-flow" data-slot="flow">${pl.flow.map(k => el[k]()).join('')}</div>` : ''}
          <div class="pc-text">
            ${weightRow || nameFirst ? '' : `<p class="pc-weight">${p.weight}</p>`}
            <p class="pc-name">${p.name}</p>
            ${nameFirst ? `<p class="pc-weight">${p.weight}</p>` : ''}
          </div>
          ${weightRow ? `<div class="pc-weight-row">${p.nutri ? this.meta(p, 'pc-meta--weight') : ''}<p class="pc-weight">${p.weight}</p></div>` : ''}
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
  /** Перемальовує картку з іншим обрізанням потоку, зберігаючи видимість (фільтри лістингу) */
  replace(card, cut = Infinity) {
    const tpl = document.createElement('template');
    tpl.innerHTML = this.html(JSON.parse(card.dataset.item), cut).trim();
    const next = tpl.content.firstElementChild;
    next.hidden = card.hidden;
    card.replaceWith(next);
    return next;
  },

  /** Потік бейджів: малюємо все, міряємо рядки; що опинилося в 3-му рядку й далі — ховаємо (з кінця потоку).
      Кількість рядків потоку — додаткові рядки картки (рівень A / B) */
  fit(card) {
    if (card.dataset.cut !== 'Infinity' || card.dataset.mode !== this.mode()) card = this.replace(card);
    let lines = this.flowLines(card);
    const cut = lines.findIndex(line => line >= this.MAX_LINES);
    if (cut >= 0) {
      card = this.replace(card, cut);
      lines = this.flowLines(card);
    }
    const count = lines.length ? Math.max(...lines) + 1 : 0;
    card.dataset.extras = count;
    card.dataset.level = count >= 2 ? 'B' : 'A';
    return card;
  },

  /** Номер рядка (з 0) для кожного елемента потоку: новий рядок — коли елемент нижче за попередній рядок */
  flowLines(card) {
    const flow = card.querySelector('.pc-flow');
    if (!flow) return [];
    let line = -1;
    let bottom = -Infinity;
    return [...flow.children].map(el => {
      const top = el.offsetTop;
      if (top >= bottom - 0.5) { line++; bottom = top + el.offsetHeight; }
      else bottom = Math.max(bottom, top + el.offsetHeight);
      return line;
    });
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
    container.classList.toggle('pc-highlight-hidden', this.settings.highlightHidden);

    let cards = [...container.querySelectorAll('.plp-card')];
    // правила ввімкнули/вимкнули — перемальовуємо в потрібному вигляді
    cards = cards.map(c => (c.classList.contains('plp-card--rules') === this.settings.rules && c.dataset.mode === this.mode()
      ? c : this.replace(c)));
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
      // підказка при наведенні: що саме не влізло
      c.title = this.settings.highlightHidden && c.dataset.hidden ? 'Не влізло: ' + c.dataset.hidden : '';
    });
    if (typeof Cart !== 'undefined') Cart.render(); // степери «− N шт +» у перемальованих картках
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
