/* =====================================================================
   APP — навігація між екранами, лічильник кошика, лайки, drag-скрол каруселей.
   ===================================================================== */

/* Колір статус-бару для кожного екрана (лавандовий / білий) */
const STATUSBAR_BG = {
  home: 'var(--bg-lavender)',
  catalog: 'var(--bg-lavender)',
  listing: 'var(--white)',
  pdp: 'var(--white)',
};

/* ---------------- Кошик (спільний для всіх екранів; окремого екрана кошика немає —
   лише степери «− N шт +», лічильник у таб-барі й плашки з сумою) ---------------- */
const Cart = {
  items: new Map(), // id товару → кількість

  add(id, delta = 1) {
    const qty = Math.max(0, (this.items.get(id) || 0) + delta);
    if (qty) this.items.set(id, qty); else this.items.delete(id);
    this.render();
  },
  count() {
    let n = 0; this.items.forEach(q => { n += q; }); return n;
  },
  total() {
    let sum = 0; this.items.forEach((q, id) => { sum += q * DATA.products[id].price; }); return sum;
  },
  /** Оновлює всі лічильники на сторінці */
  render() {
    // «+» → степер «− N шт +»
    document.querySelectorAll('[data-qty]').forEach(el => {
      const qty = this.items.get(el.dataset.qty) || 0;
      el.classList.toggle('has-qty', qty > 0);
      el.querySelector('output').textContent = qty + ' шт';
    });
    const count = this.count();
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.hidden = !count; el.textContent = count; });
    document.querySelectorAll('[data-cart-label]').forEach(el => { el.textContent = count ? UI.money(this.total()) : 'Кошик'; });
    document.querySelectorAll('[data-cart-total]').forEach(el => { el.textContent = UI.money(this.total()); });
    document.querySelectorAll('[data-cart-visible]').forEach(el => { el.hidden = !count; });
  },
};

/* ---------------- Навігація ----------------
   Адреса екрана: #id або #id/параметр — напр. #listing/fruits, #pdp/banana.
   Екрани з параметром (лістинг, картка товару) перемальовуються при його зміні;
   без параметра відкривається те, що було відкрито останнім. */
const App = {
  current: null,
  params: {},      // останній параметр кожного екрана
  rendered: {},    // з яким параметром екран намальований

  /** Історія переходів для «Назад»: [{ id, param }] */
  history: [],

  go(id, param, { record = true } = {}) {
    const next = document.getElementById(id);
    if (!next) return;
    if (record && this.current) {
      const prev = { id: this.current.id, param: this.params[this.current.id] };
      if (prev.id !== id || (param && param !== prev.param)) this.history.push(prev);
    }
    if (param) this.params[id] = param;
    param = this.params[id];
    if (this.rendered[id] !== param) this.renderScreen(next, param);
    if (next !== this.current) {
      if (this.current) this.current.classList.remove('is-active');
      next.classList.add('is-active');
      this.current = next;
    }
    next.scrollTop = 0;
    document.querySelector('.statusbar').style.setProperty('--statusbar-bg', STATUSBAR_BG[id] || 'var(--white)');
    const hash = '#' + id + (param ? '/' + param : '');
    if (location.hash !== hash) history.pushState(null, '', hash);
    Cart.render();
  },

  /** «Назад»: на екран, з якого прийшли */
  back() {
    const prev = this.history.pop();
    if (!prev) return this.go('home', undefined, { record: false });
    this.go(prev.id, prev.param, { record: false });
  },

  renderScreen(el, param) {
    const render = Screens[el.id];
    if (!render) return;
    render(el, param);
    this.rendered[el.id] = param;
    el.querySelectorAll('.hscroll').forEach(enableDragScroll);
  },

  /** «#pdp/banana» → ['pdp', 'banana'] */
  fromHash() {
    const [id, param] = decodeURIComponent(location.hash.slice(1)).split('/');
    return document.getElementById(id) ? [id, param] : [document.querySelector('.screen').id]; // без адреси — перший екран
  },

  init() {
    // статус-бар
    document.querySelector('.statusbar__time').textContent = DATA.statusBar.time;

    // рендер усіх екранів
    document.querySelectorAll('.screen').forEach(el => this.renderScreen(el));

    document.addEventListener('click', onClick);

    // працює «Назад» браузера та відкриття потрібного екрана за адресою
    window.addEventListener('hashchange', () => this.go(...this.fromHash()));
    this.go(...this.fromHash());
  },
};

function onClick(e) {
  // «На початок»: чистий старт з головної — кошик, лайки й фільтри з нуля
  if (e.target.closest('[data-restart]')) {
    history.replaceState(null, '', '#home');
    location.reload();
    return;
  }
  const add = e.target.closest('[data-add]');
  if (add) { e.stopPropagation(); Cart.add(add.dataset.add); return; }
  const remove = e.target.closest('[data-remove]');
  if (remove) { e.stopPropagation(); Cart.add(remove.dataset.remove, -1); return; }

  const like = e.target.closest('[data-like]');
  if (like) {
    e.stopPropagation();
    like.setAttribute('aria-pressed', like.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    return;
  }

  // чипси-перемикачі (вкл/викл)
  const toggle = e.target.closest('[data-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-pressed', toggle.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    return;
  }

  // перехід до секції на тому ж екрані (нижня панель каталогу)
  const jump = e.target.closest('[data-scroll-to]');
  if (jump) {
    jump.parentElement.querySelectorAll('.is-active').forEach(el => el.classList.remove('is-active'));
    jump.classList.add('is-active');
    document.getElementById(jump.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // data-back — «Назад» туди, звідки прийшли (картка товару)
  if (e.target.closest('[data-back]')) { App.back(); return; }

  // data-param — який товар / яку категорію відкрити (#pdp/banana, #listing/fruits)
  const link = e.target.closest('[data-go]');
  if (link) App.go(link.dataset.go, link.dataset.param);
}

/* ---------------- Drag-скрол каруселей мишею ---------------- */
function enableDragScroll(row) {
  let startX = 0, startScroll = 0, dragging = false, moved = false;

  row.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = false;
    startX = e.clientX; startScroll = row.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) { moved = true; row.classList.add('is-dragging'); }
    if (moved) { row.scrollLeft = startScroll - dx; e.preventDefault(); }
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    row.classList.remove('is-dragging');
  });
  // клік після перетягування не повинен відкривати товар
  row.addEventListener('click', e => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);
  row.addEventListener('dragstart', e => e.preventDefault());
  row.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    row.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * row.clientWidth * 0.7, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => App.init());
