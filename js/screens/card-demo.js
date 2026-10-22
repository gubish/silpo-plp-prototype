/* =====================================================================
   ДЕМО КАРТКИ ТОВАРУ (index.html). Дані: DATA.cardDemo.
   Лістинг (сітка 3 колонки) і карусель зі сценаріями з брифу,
   панель керування поза телефоном перемикає Card.settings,
   блок «Логіка відображення» справа описує саме те, що зараз увімкнено.
   ===================================================================== */

// Демо відкривається в стані «Як є» (стара картка); лістинг прототипу — з новими правилами
Card.settings.rules = false;

Screens.cardDemo = function renderCardDemo(root) {
  const D = DATA.cardDemo;

  root.innerHTML = `
    <header class="plp-appbar">
      <h1 class="plp-appbar__title">${D.title}</h1>
    </header>

    <h2 class="demo-heading">Лістинг</h2>
    <div class="plp-grid demo-grid">${D.listing.map(i => Card.html(i)).join('')}</div>

    <h2 class="demo-heading">Карусель</h2>
    <div class="demo-carousel">
      <div class="hscroll hscroll--bleed pc-carousel" tabindex="0" aria-label="Карусель товарів">
        ${D.carousel.map(i => Card.html(i)).join('')}
      </div>
    </div>`;

  Card.layout(root.querySelector('.demo-grid'));
  Card.layout(root.querySelector('.pc-carousel'), { carousel: true });
  renderRules();
};

/* ---------- Логіка відображення (справа від телефона) ----------
   Повна версія й журнал рішень — docs/card-rules.md; міняєте правило — оновіть обидва.
   Пункт, що відрізняється від налаштувань за замовчуванням, підсвічується (is-changed). */
const DEMO_DEFAULTS = { rules: false, bbMode: 'row', oldPricePlace: 'row', discountPlace: 'row', nutriPlace: 'bottom', nutriStyle: 'official' };

function rulesSections(s) {
  const changed = key => s[key] !== DEMO_DEFAULTS[key];
  const item = (html, key) => ({ html, changed: key ? changed(key) : false });

  // «Як є»: стара поведінка (увесь блок інший — пункти не підсвічуємо, режим видно в підзаголовку)
  if (!s.rules) {
    return [
      { title: 'Порядок під фото', ordered: true, items: [
        item('Ціна — перша'),
        item('Знижка: стара ціна + <code>−30%</code>'),
        item('Бенефіти: ББ, «від 2 шт»'),
        item('Термін уцінки'),
        item('Розтермінування'),
        item('Вага'),
        item('Назва, до 3 рядків (у «довгої» картки — до 2)'),
        item('Nutri-Score'),
      ] },
      { title: 'Ліміт рядків', items: [
        item('Ліміту немає: показуємо все підряд.'),
        item('«Довга» картка — 2 і більше рядків під ціною (знижка, ББ, термін, розтермінування…) → назва до 2 рядків.'),
      ] },
      { title: 'Хто кого витісняє', items: [
        item('Під фото — ніхто нікого: усі рядки показуються, картка росте.'),
        item('На фото — лише бабли, максимум <b>2</b>: ББ → «Я ще ОК» → промо; решта не показується.'),
      ] },
      { title: 'Не показуємо разом', items: [
        item('Нічого не ховаємо: знижка разом із «від 2 шт», термін разом із розтермінуванням.'),
        item('ББ — двічі: баблом «б» на фото і чипом із сумою під ціною.'),
      ] },
      { title: 'Ціна і ББ', items: [
        item('Стара ціна завжди в рядку знижки, під ціною.'),
        item('До 10 000 ₴ — з копійками (<code>170.00 ₴</code>), від 10 000 ₴ — без (<code>157 999 ₴</code>).'),
      ] },
      { title: 'Бабли на фото', items: [
        item('Максимум <b>2</b>: ББ → «Я ще ОК» → промо.'),
      ] },
      { title: 'Nutri-Score', items: [
        item('Офіційний горизонтальний модуль без змін, 26 px заввишки, однаковий у всіх.'),
        item('Останнім у картці, під назвою.'),
      ] },
      { title: 'Велнес-теги', items: [
        item('У лістингу не показуємо — на сторінці товару.'),
      ] },
      { title: 'Висота й вирівнювання', items: [
        item('Кожна картка своєї висоти: ціни й низ карток у ряду не збігаються.'),
        item('Карусель стрибає: висота залежить від видимих карток.'),
      ] },
      { title: '«Очікується»', items: [
        item('Замість «+» — плашка «Очікується»; фото й текст на 60%, Nutri-Score — ні.'),
      ] },
    ];
  }

  const slot = s.nutriPlace === 'slot';
  const discPhoto = s.discountPlace === 'photo';
  const nutriLook = s.nutriStyle === 'compact'
    ? item('<b>Компактний:</b> без напису «NUTRI-SCORE» і білої підкладки, 18 px. <b>Не відповідає хартії</b> (с. 51) — лише для порівняння.', 'nutriStyle')
    : item('Офіційний горизонтальний модуль без змін, 26 px заввишки, однаковий у всіх.');
  const oldPrice = s.oldPricePlace === 'row'
    ? item('<b>Попередня ціна</b> — завжди окремим рядком під поточною (у рядку бенефітів, разом зі знижкою).', 'oldPricePlace')
    : item('<b>Попередня ціна</b> — поруч із поточною, дрібніше й закреслена; не влазить — окремим рядком.', 'oldPricePlace');
  const bbBadge = item('Бейдж ББ на фото — компактний, розміром із тег знижки; сума округлена вниз: <code>+0.5</code>, <code>+12</code>, <code>+1.5к</code>.');
  const bb = s.bbMode === 'photo'
    ? item('<b>ББ на фото</b> — завжди бейджем із сумою; у рядку бенефітів його немає.', 'bbMode')
    : item('<b>ББ в рядку</b> — завжди чипом <code>+12.21</code> у рядку бенефітів, на фото — фіолетовий бабл «б» без суми. Не влазить поруч зі знижкою — окремим рядком під нею; але якщо є термін уцінки чи розтермінування — вони важливіші, а ББ не показуємо зовсім.');

  // Хто кого витісняє, коли місця не вистачає: зліва — сильніший
  const displacement = [
    item('<b>Термін уцінки не зникає ніколи</b> — він найсильніший (юридично обовʼязковий).'),
    item('<b>Рядки під фото</b> (максимум 2), від сильнішого:'
      + ' термін уцінки → бенефіти' + (slot ? ' → Nutri-Score' : '') + ' → розтермінування'
      + (s.bbMode === 'row' ? ' → окремий рядок ББ' : '') + '.', slot ? 'nutriPlace' : (s.bbMode === 'photo' ? 'bbMode' : undefined)),
    item('Термін уцінки витісняє розтермінування (обидва в слоті «Інфо»).'),
    item('<b>Розтермінування</b> (усі товари від 1 000 ₴) витісняють лише термін уцінки' + (slot ? ' і Nutri-Score у слоті' : '')
      + '. Знижка й ББ — ні' + (s.bbMode === 'row' ? ': окремий рядок ББ слабший за розтермінування' : '') + '.'),
    ...(s.bbMode === 'row' ? [
      item('ББ не влазить поруч зі знижкою → окремим рядком; але є термін уцінки чи розтермінування → ББ <b>зникає</b> (на фото не перелітає).'),
    ] : [
      item('ББ на фото — займає місце бабла, рядків під фото не витісняє.', 'bbMode'),
    ]),
    item('Знижка витісняє «від 2 шт».'),
    item(s.oldPricePlace === 'row'
      ? 'Попередня ціна завжди окремим рядком — займає рядок бенефітів разом зі знижкою.'
      : 'Попередня ціна поруч із поточною; не влазить — сама витісняється в рядок бенефітів.', 'oldPricePlace'),
    ...(slot ? [] : [item('Nutri-Score нікого не витісняє: він поза лімітом.')]),
    item('<b>Бабли на фото</b> (максимум 2): «Я ще ОК»'
      + (discPhoto ? ' → знижка <code>−30%</code>' : '') + ' → промо → ББ. «Я ще ОК» не витісняється ніколи; промо можуть витіснити ББ.', discPhoto ? 'discountPlace' : undefined),
    ...(s.bbMode === 'photo' ? [item('На фото вже 2 бабли (напр. «Я ще ОК» і «%») → бейджу ББ із сумою немає місця, ББ у картці не видно.', 'bbMode')]
      : [item('На фото вже 2 бабли (напр. «Я ще ОК» і «%») → фіолетовому «б» немає місця, але сума ББ <code>+12.21</code> однаково видна під ціною.')]),
    ...(discPhoto ? [item('Знижка на фото витісняє бабл «%» — той самий сенс.', 'discountPlace')] : []),
    ...(discPhoto && s.bbMode === 'photo' ? [item('<b>Знижка й ББ обидві на фото</b> → ліміт інший: 1 круглий бабл + 2 прямокутні (знижка й ББ) — на фото є і знижка, і ББ.', 'discountPlace')] : []),
    item('Порядок на фото: спершу круглі бабли (зокрема фіолетовий «б» ББ), далі знижка, далі бейдж ББ із сумою.'),
  ];

  return [
    { title: 'Порядок під фото', ordered: true, items: [
      item('Ціна — завжди перша'),
      discPhoto
        ? item('Бенефіти: попередня ціна (окремим рядком), ББ або «від 2 шт»', 'discountPlace')
        : item('Бенефіти: знижка, ББ або «від 2 шт»'),
      item('Інфо: термін уцінки або розтермінування (усі товари від 1 000 ₴)'),
      ...(slot ? [item('Мета: Nutri-Score', 'nutriPlace')] : []),
      item('Вага'),
      item('Назва, максимум 3 рядки (за потреби 2)'),
      ...(slot ? [] : [item('Nutri-Score — одразу під назвою')]),
    ] },
    { title: 'Ліміт рядків', items: slot ? [
      item('Бенефіти, інфо й мета — додаткові рядки, максимум <b>2</b>.', 'nutriPlace'),
      item('Зайве ховаємо з кінця: термін уцінки → бенефіти → мета → розтермінування (термін — ніколи).', 'nutriPlace'),
      item('«Довга» картка — 2 додаткові рядки → назва 2 рядки (решта — 3).'),
    ] : [
      item('Бенефіти й інфо — додаткові рядки, максимум <b>2</b>.'),
      item('Зайве ховаємо з кінця: термін уцінки → бенефіти → розтермінування (термін — ніколи).'),
      item('Nutri-Score у ліміт не рахується.'),
      item('«Довга» картка — 2 додаткові рядки → назва 2 рядки (решта — 3).'),
    ] },
    { title: 'Хто кого витісняє', items: displacement },
    { title: 'Не показуємо разом', items: [
      item('Є знижка → без «від 2 шт».'),
      item('Є термін уцінки → без розтермінування.'),
      item('Сума ББ — лише в одному місці: чипом у рядку або бейджем на фото.'),
      item('Є «від 2 шт» → ББ на фото.'),
    ] },
    { title: 'Ціна і ББ', items: [
      oldPrice,
      discPhoto
        ? item('<b>Знижка на фото</b> — бейдж <code>−30%</code> на фото замість тегу в рядку.', 'discountPlace')
        : item('<b>Знижка в рядку</b> — тег <code>−30%</code> у рядку бенефітів.'),
      bb,
      bbBadge,
      item('До 10 000 ₴ — з копійками (<code>170.00 ₴</code>), від 10 000 ₴ — без (<code>157 999 ₴</code>).'),
    ] },
    { title: 'Бабли на фото', items: [
      discPhoto
        ? item('Максимум <b>2</b>: «Я ще ОК» → знижка <code>−30%</code> → промо → ББ. Бабл «%» не показуємо — знижка вже на фото.', 'discountPlace')
        : item('Максимум <b>2</b>: «Я ще ОК» → промо → ББ.'),
    ] },
    { title: 'Nutri-Score', items: [
      nutriLook,
      slot
        ? item('У слоті «Мета» між інфо й вагою; рахується в ліміт і може бути схований.', 'nutriPlace')
        : item('Одразу під назвою, не відриваємо: вільне місце — внизу картки.'),
    ] },
    { title: 'Велнес-теги', items: [
      item('У лістингу не показуємо: «Веган», «Без цукру» — чипами на сторінці товару.'),
      item('У лістингу — фільтри цих тегів поруч із «Лише акційні».'),
    ] },
    { title: 'Висота й вирівнювання', items: [
      item('Ціни й низ карток у ряду — на одній лінії.'),
      item('Рівень картки: <b>A</b> — 0–1 доп. рядок, <b>B</b> — 2. Ряд — за найвищим рівнем.'),
      item('Карусель — завжди рівень B, висота не стрибає.'),
      item('Назва: 3 рядки; у «довгої» картки (два додаткові рядки) — завжди 2, навіть якщо в ряду є місце.'),
    ] },
    { title: '«Очікується»', items: [
      item('Замість «+» — плашка «Очікується»; фото й текст на 60%, Nutri-Score — ні.'),
    ] },
  ];
}

function renderRules() {
  const el = document.querySelector('.demo-rules');
  if (!el) return;
  const s = Card.settings;
  const mode = !s.rules ? 'Як є'
    : `Нові правила · Знижка: ${s.discountPlace === 'photo' ? 'на фото' : 'в рядку'}`
      + ` · Попередня ціна: ${s.oldPricePlace === 'row' ? 'окремим рядком' : 'із поточною'}`
      + ` · ББ: ${s.bbMode === 'photo' ? 'на фото' : 'в рядку'}`
      + ` · Nutri-Score: ${s.nutriPlace === 'slot' ? 'у слоті «Мета»' : 'під назвою'}`
      + (s.nutriStyle === 'compact' ? ', компактний' : '');
  el.innerHTML = `
    <h2 class="demo-rules__title">Логіка відображення</h2>
    <p class="demo-rules__mode">${mode}</p>
    ${rulesSections(s).map(sec => `
      <section>
        <h3>${sec.title}</h3>
        <${sec.ordered ? 'ol class="demo-rules__flow"' : 'ul'}>
          ${sec.items.map(i => `<li${i.changed ? ' class="is-changed"' : ''}>${i.html}</li>`).join('')}
        </${sec.ordered ? 'ol' : 'ul'}>
      </section>`).join('')}`;
}

/* ---------- Панель керування ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-setting]');
  if (!btn) return;
  const { setting, value } = btn.dataset;
  Card.settings[setting] = setting === 'rules' ? value === 'true' : value;
  document.querySelectorAll(`[data-setting="${setting}"]`)
    .forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  // режим ББ і місце Nutri-Score мають сенс лише з правилами
  document.querySelectorAll('.demo-panel__rules-only').forEach(el => el.classList.toggle('is-disabled', !Card.settings.rules));
  Card.relayout();
  renderRules();
  renderHiddenCount();
});

document.addEventListener('change', e => {
  if (e.target.matches('[data-round-bubbles]')) {
    Card.settings.roundBubbles = e.target.checked;
    Card.relayout();
    renderHiddenCount();
  }
  if (e.target.matches('[data-debug]')) {
    Card.settings.debug = e.target.checked;
    Card.relayout();
  }
  if (e.target.matches('[data-highlight-hidden]')) {
    Card.settings.highlightHidden = e.target.checked;
    Card.relayout();
    renderHiddenCount();
  }
});

/** Скільки карток із підсвіченим «не влізло» — під тумблером */
function renderHiddenCount() {
  const el = document.querySelector('[data-hidden-count]');
  if (!el) return;
  el.hidden = !Card.settings.highlightHidden;
  const cards = [...document.querySelectorAll('#cardDemo .plp-card')].filter(c => c.dataset.hidden);
  const names = new Set(cards.map(c => c.dataset.param));
  el.textContent = cards.length
    ? `Щось не влізло в ${names.size} ${names.size === 1 ? 'товарі' : 'товарах'} (лістинг і карусель).`
    : 'У цій комбінації все влазить.';
}
