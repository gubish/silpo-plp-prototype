/* =====================================================================
   UI — дрібні HTML-компоненти картки товару: ціна, «+» / степер, «обране».
   Тексти сюди НЕ пишемо — вони в js/data.js.
   ===================================================================== */

/** Реєстр екранів: кожен файл js/screens/*.js додає сюди функцію рендеру */
window.Screens = {};

const UI = {
  /** 7658.92 → «7 658.92 ₴» (формат як у Figma) */
  money(value) {
    const [int, dec] = Number(value).toFixed(2).split('.');
    return int.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0') + '.' + dec + '\u00a0₴'; // ₴ не відривається від числа
  },

  /** «+» у білій рамці, після додавання — синій степер «− N шт +» */
  qtyControl(id) {
    return `
      <div class="qty" data-qty="${id}">
        <button class="qty__add" type="button" data-add="${id}" aria-label="Додати в кошик">
          <img src="assets/icons/plus.svg" alt="">
        </button>
        <div class="qty__stepper" role="group" aria-label="Кількість">
          <button type="button" data-remove="${id}" aria-label="Зменшити">−</button>
          <output aria-live="polite">0 шт</output>
          <button type="button" data-add="${id}" aria-label="Збільшити">+</button>
        </div>
      </div>`;
  },

  likeButton(liked) {
    return `
      <button class="like-btn" type="button" data-like aria-pressed="${liked ? 'true' : 'false'}" aria-label="Улюблене">
        <img class="like-btn__off" src="assets/icons/heart.svg" alt="">
        <img class="like-btn__on" src="assets/icons/heart-filled.svg" alt="">
      </button>`;
  },
};
