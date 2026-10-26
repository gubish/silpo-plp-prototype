/* =====================================================================
   ДЕМО КАРТКИ ТОВАРУ (index.html). Дані: DATA.cardDemo.
   Лістинг (сітка 3 колонки) і карусель зі сценаріями з брифу,
   панель керування поза телефоном перемикає Card.settings,
   блок «Логіка відображення» справа описує саме те, що зараз увімкнено.
   ===================================================================== */

// Демо відкривається в стані «Як є» (стара картка); лістинг прототипу — з новими правилами
Card.settings.rules = false;

/* ---------- Налаштування в адресі ----------
   Обрані перемикачі — у query-рядку (?rules=1&discount=photo…), лише ті, що відрізняються від стартових.
   Посилання відкриває саме цю комбінацію. Ключ у Card.settings → назва параметра в адресі */
const URL_KEYS = {
  rules: 'rules', discountPlace: 'discount', discountStyle: 'discountStyle',
  installmentPlace: 'installment', installmentShort: 'installmentShort', installmentStyle: 'installmentStyle',
  bbMode: 'bb', bbStyle: 'bbStyle', nutriPlace: 'nutri', nutriStyle: 'nutriStyle',
  roundBubbles: 'round', highlightHidden: 'highlight',
};
const START = Object.fromEntries(Object.keys(URL_KEYS).map(k => [k, Card.settings[k]]));
const ROUND_STYLES = ['tag', 'round'];

/** Значення з адреси → Card.settings (невідомі значення пропускаємо) */
function readUrl() {
  const q = new URLSearchParams(location.search);
  Object.entries(URL_KEYS).forEach(([key, name]) => {
    if (!q.has(name)) return;
    const v = q.get(name);
    if (typeof START[key] === 'boolean') { Card.settings[key] = v === '1'; return; }
    const allowed = key.endsWith('Style') && key !== 'nutriStyle'
      ? ROUND_STYLES.includes(v)
      : !!document.querySelector(`[data-setting="${key}"][data-value="${CSS.escape(v)}"]`);
    if (allowed) Card.settings[key] = v;
  });
}

/** Card.settings → адреса (без нового запису в історії) */
function saveUrl() {
  const q = new URLSearchParams();
  Object.entries(URL_KEYS).forEach(([key, name]) => {
    const v = Card.settings[key];
    if (v !== START[key]) q.set(name, typeof v === 'boolean' ? (v ? '1' : '0') : v);
  });
  const search = q.toString();
  history.replaceState(null, '', location.pathname + (search ? '?' + search : '') + location.hash);
}

/** Панель показує поточні Card.settings (після читання адреси) */
function syncPanel() {
  const s = Card.settings;
  document.querySelectorAll('[data-setting]').forEach(b =>
    b.setAttribute('aria-pressed', String(String(s[b.dataset.setting]) === b.dataset.value)));
  [['[data-discount-round]', s.discountStyle === 'round'], ['[data-bb-round]', s.bbStyle === 'round'],
   ['[data-installment-round]', s.installmentStyle === 'round'], ['[data-installment-short]', s.installmentShort],
   ['[data-round-bubbles]', s.roundBubbles], ['[data-highlight-hidden]', s.highlightHidden]].forEach(([sel, on]) => {
    const input = document.querySelector(sel);
    if (input) input.checked = on;
  });
  document.querySelectorAll('.demo-panel__rules-only').forEach(el => el.classList.toggle('is-disabled', !s.rules));
  syncDiscountRound();
}

Screens.cardDemo = function renderCardDemo(root) {
  const D = DATA.cardDemo;

  root.innerHTML = `
    <header class="plp-appbar">
      <h1 class="plp-appbar__title">${D.title}</h1>
    </header>

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
const DEMO_DEFAULTS = { rules: false, bbStyle: 'tag', discountStyle: 'tag', bbMode: 'row', discountPlace: 'row', installmentPlace: 'row', installmentShort: false, installmentStyle: 'tag', nutriPlace: 'bottom', nutriStyle: 'official' };

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
        item('Замість «+» — плашка «Очікується»; фото, текст і Nutri-Score на 60%.'),
      ] },
    ];
  }

  const slot = s.nutriPlace === 'slot';
  const nutriPhoto = s.nutriPlace === 'photo';
  const nutriWeight = s.nutriPlace === 'weight';
  const discPhoto = s.discountPlace === 'photo';
  const instPhoto = s.installmentPlace === 'photo';
  const instShort = !instPhoto && s.installmentShort;
  const nutriLook = s.nutriStyle === 'minimal'
    ? item('<b>Мінімалістичний:</b> підпис «Nutri-Score» 10 px і літера оцінки в кольоровому квадратику, 16 px. <b>Не відповідає хартії</b> — лише для порівняння.', 'nutriStyle')
    : s.nutriStyle === 'compact'
    ? item('<b>Компактний:</b> без напису «NUTRI-SCORE» і білої підкладки, 18 px. <b>Не відповідає хартії</b> (с. 51) — лише для порівняння.', 'nutriStyle')
    : item('Офіційний горизонтальний модуль без змін, 26 px заввишки, однаковий у всіх.');
  // Потік бейджів під ціною: що є в потоці за поточних перемикачів, у порядку Card.FLOW
  const flowOrder = ['стара ціна', ...(discPhoto ? [] : ['знижка']), 'термін уцінки', ...(slot ? ['Nutri-Score (цілим рядком)'] : []),
    ...(instPhoto ? [] : ['розтермінування']), ...(s.bbMode === 'row' ? ['ББ'] : [])].join(' → ');
  const flowChanged = slot ? 'nutriPlace' : discPhoto ? 'discountPlace' : instPhoto ? 'installmentPlace' : s.bbMode === 'photo' ? 'bbMode' : undefined;
  const oldPrice = item('<b>Попередня ціна</b> — перша в потоці під поточною ціною, поруч — тег знижки.');
  const bbBadge = Card.bbRound()
    ? item('Бейдж ББ на фото — <b>круглий</b> 32 px у кольорах прямокутного (світле тло, фіолетовий текст), монетка над сумою, округленою вниз: <code>+0.5</code>, <code>+12</code>, <code>+1.5к</code>.', 'bbStyle')
    : item('Бейдж ББ на фото — компактний, розміром із тег знижки; сума округлена вниз: <code>+0.5</code>, <code>+12</code>, <code>+1.5к</code>.');
  const bb = s.bbMode === 'photo'
    ? item('<b>ББ на фото</b> — завжди бейджем із сумою; у потоці під ціною його немає.', 'bbMode')
    : item('<b>ББ в рядку</b> — чипом <code>+12.21</code>, останнім у потоці під ціною; на фото — фіолетовий бабл «б» без суми. Не влізло в 2 рядки — суму не показуємо, бабл «б» лишається на фото, якщо там є місце.');

  // Хто кого витісняє, коли місця не вистачає
  const displacement = [
    item('<b>Термін уцінки не зникає ніколи</b> (юридично обовʼязковий).'),
    item('<b>Потік під ціною</b> переноситься як текст, максимум 2 рядки; що не влізло — ховаємо з кінця: ' + flowOrder + '.', flowChanged),
    item('Термін уцінки витісняє розтермінування — разом не показуємо.'),
    ...(s.bbMode === 'row' ? [
      item('ББ — останній: не влазить у 2 рядки → сума ББ <b>зникає</b> (на фото не перелітає), бабл «б» лишається, якщо на фото є місце.'),
    ] : [
      item('ББ на фото — займає місце бабла, потоку під ціною не витісняє.', 'bbMode'),
    ]),
    ...(instShort ? [item('Коротке розтермінування (<code>x24</code>) частіше лишає місце для ББ у другому рядку.', 'installmentShort')] : []),
    item('Знижка витісняє «від 2 шт».'),
    ...(slot ? [] : [item('Nutri-Score нікого не витісняє: він поза потоком.')]),
    item('<b>Бабли на фото</b> (максимум 2): «Я ще ОК»'
      + (discPhoto ? ' → знижка <code>−30%</code>' : '') + ' → промо → ББ. «Я ще ОК» не витісняється ніколи; промо можуть витіснити ББ.', discPhoto ? 'discountPlace' : undefined),
    ...(s.bbMode === 'photo' ? [item('На фото вже 2 бабли (напр. «Я ще ОК» і «%») → бейджу ББ із сумою немає місця, ББ у картці не видно.', 'bbMode')]
      : [item('На фото вже 2 бабли (напр. «Я ще ОК» і «%») → фіолетовому «б» немає місця, але сума ББ <code>+12.21</code> однаково видна під ціною.')]),
    ...(discPhoto ? [item('Знижка на фото витісняє бабл «%» — той самий сенс.', 'discountPlace')] : []),
    ...(instPhoto ? [item('<b>Розтермінування на фото</b> — потоку не займає; кожен прямокутний бейдж понад перший (знижка + розтермінування) додає місце на фото. З ББ на фото — 1 круглий + усі прямокутні.', 'installmentPlace')] : []),
    ...(discPhoto && s.bbMode === 'photo' ? [item('<b>Знижка й ББ обидві на фото</b> → ліміт інший: 1 круглий бабл + 2 прямокутні (знижка й ББ) — на фото є і знижка, і ББ. Якщо знижка й ББ теж круглі — круглих однаково не більше 2: ББ ховаємо.', 'discountPlace')] : []),
    item('Порядок на фото: спершу круглі бабли (зокрема фіолетовий «б» ББ), далі знижка, далі бейдж ББ із сумою.'),
  ];

  return [
    { title: 'Порядок під фото', ordered: true, items: [
      item('Ціна — завжди перша'),
      item('Потік бейджів: ' + flowOrder + ' (замість старої ціни й знижки може бути «від 2 шт»)', flowChanged),
      ...(nutriWeight || slot ? [] : [item('Вага')]),
      item('Назва, максимум 3 рядки (за потреби 2)'),
      ...(slot ? [item('Вага — під назвою', 'nutriPlace')] : []),
      ...(nutriWeight ? [item('Останній рядок: Nutri-Score і одразу за ним вага', 'nutriPlace')] : []),
      ...(slot || nutriPhoto || nutriWeight ? [] : [item('Nutri-Score — одразу під назвою')]),
    ] },
    { title: 'Ліміт рядків', items: [
      item('Під ціною — один потік бейджів, переноситься як текст, максимум <b>2</b> рядки.'),
      item('Що не влізло — ховаємо з кінця потоку (термін уцінки — ніколи).'),
      slot ? item('Nutri-Score у слоті — цілим рядком потоку.', 'nutriPlace') : item('Nutri-Score у ліміт не рахується.'),
      item('«Довга» картка — потік у 2 рядки → назва 2 рядки (решта — 3).'),
    ] },
    { title: 'Хто кого витісняє', items: displacement },
    { title: 'Не показуємо разом', items: [
      item('Є знижка → без «від 2 шт».'),
      item('Є термін уцінки → без розтермінування.'),
      item('Сума ББ — лише в одному місці: чипом у потоці або бейджем на фото.'),
    ] },
    { title: 'Ціна і ББ', items: [
      oldPrice,
      discPhoto
        ? item('<b>Знижка на фото</b> — ' + (Card.discountRound()
            ? 'круглим бейджем, як «%», але з величиною <code>−30%</code>' : 'тегом <code>−30%</code>') + ' замість тегу в рядку.', 'discountPlace')
        : item('<b>Знижка в рядку</b> — тег <code>−30%</code> у потоці, одразу після старої ціни.'),
      instPhoto
        ? item('<b>Розтермінування на фото</b> — ' + (Card.installmentRound() ? 'круглий бейдж 32 px, іконка над <code>x24</code>' : 'компактний прямокутний бейдж <code>x24</code> з іконкою') + ', після знижки й перед ББ. Круглих на фото — не більше 2. Термін уцінки однаково його витісняє.', 'installmentPlace')
        : instShort
          ? item('<b>Розтермінування коротко</b> — <code>x24</code> з іконкою на тій самій плашці, у потоці після терміну, перед ББ.', 'installmentShort')
          : item('<b>Розтермінування в рядку</b> — чип <code>x24 платежі</code> у потоці після терміну, перед ББ.'),
      bb,
      bbBadge,
      item('До 10 000 ₴ — з копійками (<code>170.00 ₴</code>), від 10 000 ₴ — без (<code>157 999 ₴</code>).'),
    ] },
    { title: 'Бабли на фото', items: [
      discPhoto
        ? item('Максимум <b>2</b>: «Я ще ОК» → знижка <code>−30%</code> → промо → ББ. Бабл «%» не показуємо — знижка вже на фото.', 'discountPlace')
        : item('Максимум <b>2</b>: «Я ще ОК» → промо → ББ.'),
      ...(instPhoto ? [item('Розтермінування <code>x24</code> — прямокутним бейджем одразу після знижки, перед ББ; сильніше за промо.', 'installmentPlace')] : []),
    ] },
    { title: 'Nutri-Score', items: [
      nutriLook,
      slot
        ? item('У слоті — цілим рядком у потоці під ціною, після терміну уцінки; рахується в ліміт і може бути схований.', 'nutriPlace')
        : nutriWeight
          ? item('<b>Біля ваги</b> — останнім рядком після назви (4 px від неї): модуль ліворуч, вага одразу за ним через інтерпункт «·». Рядок 26 px; у ліміт не рахується, ніколи не ховається; довга вага обрізається «…», модуль — ні.', 'nutriPlace')
        : nutriPhoto
          ? item('<b>На фото</b> — першим у лівому верхньому куті, над баблами. Не займає рядків під фото й місця бабла, ніколи не ховається. Розміщення поверх фото перевірити за хартією.', 'nutriPlace')
          : item('Одразу під назвою, не відриваємо: вільне місце — внизу картки.'),
    ] },
    { title: 'Велнес-теги', items: [
      item('У лістингу не показуємо: «Веган», «Без цукру» — чипами на сторінці товару.'),
      item('У лістингу — фільтри цих тегів поруч із «Лише акційні».'),
    ] },
    { title: 'Висота й вирівнювання', items: [
      item('Ціни й низ карток у ряду — на одній лінії.'),
      item('Рівень картки: <b>A</b> — потік у 0–1 рядок, <b>B</b> — у 2. Ряд — за найвищим рівнем.'),
      item('Карусель — завжди рівень B, висота не стрибає.'),
      item('Назва: 3 рядки; у «довгої» картки (потік у 2 рядки) — завжди 2, навіть якщо в ряду є місце.'),
    ] },
    { title: '«Очікується»', items: [
      item('Замість «+» — плашка «Очікується»; фото, текст і Nutri-Score на 60%.'),
    ] },
  ];
}

function renderRules() {
  const el = document.querySelector('.demo-rules');
  if (!el) return;
  const s = Card.settings;
  const mode = !s.rules ? 'Як є'
    : `Нові правила · Знижка: ${s.discountPlace === 'photo' ? 'на фото' + (Card.discountRound() ? ', кругла' : '') : 'в рядку'}`
      + ` · Розтермінування: ${s.installmentPlace === 'photo' ? 'на фото' + (Card.installmentRound() ? ', кругле' : '') : 'в рядку' + (s.installmentShort ? ', коротке' : '')}`
      + ` · ББ: ${s.bbMode === 'photo' ? 'на фото' + (Card.bbRound() ? ', круглий' : '') : 'в рядку'}`
      + ` · Nutri-Score: ${{ slot: 'у слоті «Мета»', photo: 'на фото', weight: 'біля ваги', bottom: 'під назвою' }[s.nutriPlace]}`
      + ({ compact: ', компактний', minimal: ', мінімалістичний' }[s.nutriStyle] || '');
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
  syncDiscountRound();
  Card.relayout();
  renderRules();
  renderHiddenCount();
  saveUrl();
});

document.addEventListener('change', e => {
  if (e.target.matches('[data-bb-round]')) {
    Card.settings.bbStyle = e.target.checked ? 'round' : 'tag';
    Card.relayout();
    renderRules();
  }
  if (e.target.matches('[data-discount-round]')) {
    Card.settings.discountStyle = e.target.checked ? 'round' : 'tag';
    Card.relayout();
    renderRules();
  }
  if (e.target.matches('[data-round-bubbles]')) {
    Card.settings.roundBubbles = e.target.checked;
    Card.relayout();
    renderRules();
    renderHiddenCount();
  }
  if (e.target.matches('[data-installment-short]')) {
    Card.settings.installmentShort = e.target.checked;
    Card.relayout();
    renderRules();
    renderHiddenCount();
  }
  if (e.target.matches('[data-installment-round]')) {
    Card.settings.installmentStyle = e.target.checked ? 'round' : 'tag';
    Card.relayout();
    renderRules();
    renderHiddenCount();
  }
  if (e.target.matches('[data-highlight-hidden]')) {
    Card.settings.highlightHidden = e.target.checked;
    Card.relayout();
    renderHiddenCount();
  }
  saveUrl();
});


/* «Підсвітити, де щось не влізло»: підказка «Не влізло: …» не лише при наведенні (title), а й по кліку на картку —
   на телефоні наведення немає. Клік по картці в цьому режимі не відкриває товар; «+» і «обране» працюють як завжди.
   Слухач стоїть раніше за app.js, тож може зупинити перехід. */
document.addEventListener('click', e => {
  const open = document.querySelector('.pc-hidden-tip');
  const card = e.target.closest('#cardDemo .plp-card');
  if (!Card.settings.highlightHidden || !card || !card.dataset.hidden || e.target.closest('[data-add], [data-remove], [data-like]')) {
    if (open && !e.target.closest('.pc-hidden-tip')) open.remove();
    return;
  }
  e.stopImmediatePropagation();
  const same = open && open.parentElement === card;
  if (open) open.remove();
  if (same) return; // повторний клік ховає підказку
  const tip = document.createElement('div');
  tip.className = 'pc-hidden-tip';
  tip.setAttribute('role', 'status');
  tip.textContent = 'Не влізло: ' + card.dataset.hidden;
  card.appendChild(tip);
});

/** Тумблери «Круглий» мають сенс лише коли знижка / розтермінування / ББ «На фото», «Коротке» — лише з розтермінуванням «В рядку» */
function syncDiscountRound() {
  [['[data-discount-round]', Card.settings.discountPlace === 'photo'],
   ['[data-bb-round]', Card.settings.bbMode === 'photo'],
   ['[data-installment-round]', Card.settings.installmentPlace === 'photo'],
   ['[data-installment-short]', Card.settings.installmentPlace === 'row']].forEach(([sel, active]) => {
    const input = document.querySelector(sel);
    if (!input) return;
    input.disabled = !active;
    input.closest('label').classList.toggle('is-disabled', !active);
  });
}

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

// стан із посилання — до першого рендеру (app.js малює екран після завантаження скриптів)
readUrl();
syncPanel();
renderHiddenCount();
