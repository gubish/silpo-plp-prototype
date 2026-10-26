/* =====================================================================
   DATA — ТОВАРИ, ТЕКСТИ Й КАРТИНКИ ДЕМО КАРТКИ ТОВАРУ.
   Правте тут: назви, ціни, підписи, шляхи до картинок.
   • Ціни — числа в гривнях (напр. 159 або 44.99); формат «159.00 ₴» додається автоматично.
   • Картинки — шлях від index.html; щоб замінити, просто покладіть новий
     файл з тією ж назвою в assets/… або змініть шлях тут.
   • id товару (ключ у products) використовується в секціях і кошику.
   ===================================================================== */

window.DATA = {

  /* ---------------- Статус-бар ---------------- */
  statusBar: { time: '9:41' },

  /* ---------------- Товари ---------------- */
  products: {
    /* --- Демо картки товару: сценарії з брифу ---
       Поля картки (усі необовʼязкові):
       • bb — бали «Власного Рахунку» (ББ), число: 12.21. Старе поле bonus ('+5') теж читається.
       • bulk — «від 2 шт»: { price: 87.80, from: '2 шт' }.
       • markdown — уцінка «Я ще ОК»: { until: '29.08.26' } (бабл на фото + «Вжити до …»).
       • installment — кількість платежів розтермінування: { payments: 24 }. Саме розтермінування
         показується в усіх товарів від DATA.card.installment.from ₴ (без поля — типова кількість платежів).
       • nutri — Nutri-Score: 'A' … 'E'.
       • expected — товар очікується (оверлей замість «+»).
       Nutri-Score — майже в усіх (щоб порівняти «у слоті» й «знизу»);
       без нього лише чайник і кавоварка Smeg, біле вино «тільки ББ» і фісташки (теги без Nutri-Score). */
    dMarshmallow: {
      name: 'Зефір «Біло-рожевий» з ванільним смаком у святковій подарунковій коробці',
      price: 89.90, weight: '250 г',
      nutri: 'E',
      image: 'assets/images/products/marshmallow.png',
    },
    dBananas: {
      name: 'Банани', price: 69.90, weight: '1 кг',
      nutri: 'A',
      image: 'assets/images/products/banana.png',
    },
    dCucumbers: {
      name: 'Огірки короткоплідні гладкі', price: 422.77, oldPrice: 526.90, discount: 30, weight: '100 г',
      nutri: 'A',
      image: 'assets/images/products/card/cucumbers.png',
    },
    dCoffee: {
      name: 'Кава мелена Rugo Arabica El Salvador', price: 122.77, weight: '250 г',
      bulk: { price: 87.80, from: '2 шт' },
      nutri: 'B',
      image: 'assets/images/products/card/coffee.png',
    },
    dWineWhite: {
      name: 'Вино Domaine Laroche Chablis Saint Martin біле сухе', price: 422.77, weight: '0,75 л',
      bb: 12.21,
      image: 'assets/images/products/card/wine-white.png',
    },
    dWineSale: {
      name: 'Вино Domaine Laroche Chablis Saint Martin біле сухе', price: 422.77, oldPrice: 526.90, discount: 30, weight: '0,75 л',
      bb: 12.21,
      nutri: 'D',
      image: 'assets/images/products/card/wine-white.png',
    },
    dMilk: {
      name: 'Молоко «Бурьонка» ультрапастеризоване 2,5%', price: 26.45, oldPrice: 52.90, discount: 50, weight: '1 л',
      markdown: { until: '29.08.26' },
      nutri: 'B',
      image: 'assets/images/products/card/milk.png',
    },
    dMilkBb: {
      name: 'Молоко «Бурьонка» ультрапастеризоване 3,2%', price: 28.45, oldPrice: 56.90, discount: 50, weight: '1 л',
      bb: 0.57, markdown: { until: '30.08.26' }, // TBD: чи нараховуються ББ на уцінені товари
      nutri: 'B',
      image: 'assets/images/products/card/milk.png',
    },
    dOliveOil: {
      name: 'Олія оливкова Premia Extra Virgin', price: 264.90, weight: '0,5 л',
      nutri: 'B',
      image: 'assets/images/products/olive-oil-premia.png',
    },
    dApplesSale: {
      name: 'Яблука червоні Ред Делішес', price: 42.77, oldPrice: 61.10, discount: 30, weight: '1 кг',
      nutri: 'A',
      image: 'assets/images/products/card/apples-red.png',
    },
    dWineRed: {
      name: 'Вино Mas de Daumas Gassac червоне сухе', price: 422.77, oldPrice: 526.90, discount: 20, weight: '0,75 л',
      bb: 12.21, markdown: { until: '01.09.26' }, nutri: 'C',
      image: 'assets/images/products/card/wine-red.png',
    },
    dKettleSale: {
      name: 'Електрочайник Smeg кремовий 1,7 л KLF04CREU', price: 10899, oldPrice: 12399, discount: 12, weight: '1 шт',
      bb: 1580, // велика сума ББ навмисно — сценарій «+1 580» / «+1.5к». TBD: округлення великих сум ББ
      installment: { payments: 24 },
      image: 'assets/images/products/card/kettle-smeg.webp',
    },
    dCoffeeMaker: {
      name: 'Кавоварка Smeg крапельна чорна DCF02BLEU', price: 10349, weight: '1 шт',
      installment: { payments: 24 },
      image: 'assets/images/products/card/coffee-maker-smeg.webp',
    },
    dPineapple: {
      name: 'Ананас Голден Світ', price: 422.77, oldPrice: 526.90, discount: 30, weight: '1 шт',
      expected: true,
      nutri: 'A',
      image: 'assets/images/products/card/pineapple.png',
    },
    dWineLail: {
      name: 'Вино Lail Vineyards Cabernet Sauvignon червоне сухе', price: 1249.90, oldPrice: 1549.90, discount: 19, weight: '0,75 л',
      bb: 12.5,
      image: 'assets/images/products/wine-lail-vineyards.png',
    },
    dPistachios: {
      name: 'Фісташки смажені солоні', price: 189.90, weight: '150 г',
      image: 'assets/images/products/pistachios.png',
    },
  },

  /* Бейджі в лівому верхньому куті фото товару */
  badges: {
    cinotyzhyky: { image: 'assets/icons/badge-cinotyzhyky.svg', alt: 'Цінотижики' },
    klatsni:     { image: 'assets/icons/badge-klatsni.svg',     alt: 'Клацні знижки' },
    myOffer:     { image: 'assets/icons/section-my-offers.svg', alt: 'Моя пропозиція' },
    percent:     { image: 'assets/icons/badge-percent.svg',     alt: 'Знижка' },
    bulk:        { image: 'assets/icons/card/bubble-bulk.svg',     alt: 'Гуртом дешевше' },
    madeInUa:    { image: 'assets/icons/card/bubble-made-in-ua.svg', alt: 'Зроблено в Україні' },
  },

  /* =================================================================
     КАРТКА ТОВАРУ В ЛІСТИНГУ Й КАРУСЕЛІ (js/card.js)
     Тексти й іконки елементів картки. Правила — у js/card.js.
     ================================================================= */
  card: {
    bbBubble: { image: 'assets/icons/card/bubble-bb.svg', alt: 'Бали Власного Рахунку' },
    markdownBubble: { image: 'assets/icons/card/bubble-markdown.svg', alt: 'Я ще ОК' },
    markdownText: 'Вжити до {until}',
    installmentText: 'x{payments} платежі',
    // розтермінування — для всіх товарів від цієї ціни; payments — типова кількість платежів (TBD: уточнити в банку-партнера)
    installment: { from: 1000, payments: 4 },
    bulkText: 'від {from}',
    expected: 'Очікується',
    // офіційні горизонтальні модулі A–E, вирізані з графічної хартії (с. 3) без змін
    nutriLogo: 'assets/icons/card/nutri-score/nutri-score-{grade}.svg',
    // компактний варіант для порівняння: той самий вектор без напису «NUTRI-SCORE» і білої підкладки.
    // Це зміна логотипа — хартія її забороняє (с. 51); основним лишається nutriLogo.
    nutriLogoCompact: 'assets/icons/card/nutri-score/nutri-score-{grade}-compact.svg',
  },

  /* Демо-сторінка картки: які товари в лістингу й каруселі */
  cardDemo: {
    title: 'Продукти',
    listing: [
      { id: 'dMarshmallow' },
      { id: 'dCucumbers',  badges: ['percent'] },
      { id: 'dWineSale' },
      { id: 'dBananas' },
      { id: 'dKettleSale', badges: ['percent'] },
      { id: 'dOliveOil' },
      { id: 'dMilk' },
      { id: 'dCoffee',     badges: ['bulk'] },
      { id: 'dPineapple',  badges: ['cinotyzhyky'] },
      { id: 'dWineRed',    badges: ['percent', 'klatsni'] },
      { id: 'dWineWhite' },
      { id: 'dCoffeeMaker' },
      { id: 'dApplesSale', badges: ['madeInUa'] },
      { id: 'dMilkBb' },
      { id: 'dPistachios', liked: true },
      { id: 'dWineLail' },
    ],
    carousel: [
      { id: 'dBananas' },
      { id: 'dCucumbers',  badges: ['percent'] },
      { id: 'dWineWhite' },
      { id: 'dOliveOil' },
      { id: 'dMilk' }, // уцінка — 5-та, за краєм екрана
      { id: 'dMarshmallow' },
      { id: 'dCoffee',     badges: ['bulk'] },
      { id: 'dKettleSale' },
    ],
  },

};
