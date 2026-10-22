/* =====================================================================
   DATA — УСІ ТЕКСТИ, ЦІНИ Й КАРТИНКИ ПРОТОТИПУ.
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
    hellmanns: {
      name: 'Майонез Hellmann’s Original 73% с/б',
      price: 159.00, oldPrice: 199.00, discount: 15, weight: '250 г',
      image: 'assets/images/products/mayonnaise-hellmanns.png',
    },
    pistachios: {
      name: 'Фісташки смажені солоні',
      price: 144.00, oldPrice: 179.00, discount: 15, weight: '250 г',
      image: 'assets/images/products/pistachios.png',
    },
    oliveOil: {
      name: 'Олія оливкова «Премія»® Pure суміш',
      price: 199.00, oldPrice: 249.00, discount: 10, weight: '250 г',
      image: 'assets/images/products/olive-oil-premia.png',
    },
    marshmallow: {
      name: 'Маршмелоу асорті',
      price: 44.99, oldPrice: 59.99, discount: 15, weight: '250 г',
      image: 'assets/images/products/marshmallow.png',
    },
    bakoma: {
      name: 'Десерт Bakoma Ave Vege на рослинній основі зі смаком солоної карамелі',
      price: 35.99, oldPrice: 39.99, discount: 10, weight: '150 г',
      image: 'assets/images/products/deal-of-day.png',
    },
    water075: {
      name: 'Вода мінеральна «Моршинська» негазована',
      price: 24.99, bonus: '+5', weight: '0,75 л',
      image: 'assets/images/products/water-morshynska-075.png',
    },
    water15: {
      name: 'Вода мінеральна «Моршинська» негазована',
      price: 30.99, bonus: '+6.2', weight: '1,5 л',
      image: 'assets/images/products/water-morshynska-15.png',
    },
    water15light: {
      name: 'Вода мінеральна «Моршинська» слабогазована',
      price: 30.99, bonus: '+6.2', weight: '1,5 л',
      image: 'assets/images/products/water-morshynska-15-light.png',
    },
    /* --- Лістинг «Фрукти, овочі» --- */
    pineapple: {
      name: 'Ананас', price: 422.90, oldPrice: 798.25, discount: 30, weight: '100 г', nutri: 'A', tags: ['vegan'],
      image: 'assets/images/products/pineapple.jpg', tag: 'Фрукти',
    },
    applesGreen: {
      name: 'Яблука зелені', price: 422.90, oldPrice: 798.25, discount: 30, weight: '100 г', nutri: 'A',
      image: 'assets/images/products/apples-green.png', tag: 'Фрукти',
    },
    pears: {
      name: 'Груші', price: 422.90, weight: '100 г', nutri: 'A',
      image: 'assets/images/products/pears.png', tag: 'Фрукти',
    },
    tomatoes: {
      name: 'Помідори', price: 422.90, oldPrice: 798.25, discount: 30, weight: '100 г', nutri: 'A',
      image: 'assets/images/products/tomatoes.png', tag: 'Салат',
    },
    cabbage: {
      name: 'Капуста рання', price: 422.90, weight: '100 г', nutri: 'A',
      image: 'assets/images/products/cabbage.png', tag: 'Салат',
    },
    grapes: {
      name: 'Виноград фіолетовий', price: 422.90, oldPrice: 798.25, discount: 30, weight: '100 г', nutri: 'A',
      image: 'assets/images/products/grapes-purple.png', tag: 'Фрукти',
    },
    /* --- Лістинг «Фрукти» (Figma: Велнес → Category, node 5725:2791) --- */
    appleGolden: {
      name: 'Яблуко Голден', price: 190.00, weight: '85 г', nutri: 'A', tags: ['vegan'], rating: '4.8',
      image: 'assets/images/products/apple-golden.png',
    },
    banana: {
      name: 'Банан', price: 170.00, weight: '100 г', nutri: 'A', tags: ['vegan'], rating: '4.8',
      image: 'assets/images/products/banana.png',
    },
    peach: {
      name: 'Персик', price: 138.00, oldPrice: 200.90, discount: 20, weight: '280 г', nutri: 'A', rating: '4.8',
      image: 'assets/images/products/peach.png',
    },
    watermelon: {
      name: 'Кавун Вогник', price: 244.00, weight: '100 г', nutri: 'A', rating: '4.8',
      image: 'assets/images/products/watermelon.png',
    },
    melon: {
      name: 'Диня Валенсія', price: 190.00, oldPrice: 220.90, discount: 20, weight: '85 г', nutri: 'A', rating: '4.8',
      image: 'assets/images/products/melon.png',
    },
    lime: {
      name: 'Лайм', price: 170.00, weight: '100 г', nutri: 'A', tags: ['vegan'], rating: '4.8',
      image: 'assets/images/products/lime.png',
    },
    grapesRed: {
      name: 'Виноград РедГлоб', price: 138.00, weight: '280 г', nutri: 'A', rating: '4.8',
      image: 'assets/images/products/grapes-red-globe.png',
    },
    mango: {
      name: 'Манго Еліт', price: 264.00, weight: '100 г', nutri: 'A', tags: ['vegan'], rating: '4.8',
      image: 'assets/images/products/mango.png',
    },
    persimmon: {
      name: 'Хурма Азербайджан', price: 194.00, weight: '100 г', nutri: 'A', rating: '4.8',
      image: 'assets/images/products/persimmon.png',
    },
    cherimoya: {
      name: 'Черімоя', price: 244.00, oldPrice: 340.90, discount: 20, weight: '100 г', nutri: 'A', rating: '4.8',
      image: 'assets/images/products/cherimoya.png',
    },
    /* --- Картка товару (PDP) і «Схожі товари» --- */
    wineLail: {
      name: 'Вино Lail Vineyards Napa Valley Cabernet Sauvignon Cuvee 2013, 15,9%, 0,75 л',
      shortName: 'Вино Lail Vineyards Napa Valley Cabernet Sauvignon Cuvee 2013',
      chatName: 'вина Lail Vineyards', // як Машрум називає товар у реченні
      price: 18767, weight: '0.75 л',
      image: 'assets/images/products/wine-lail-vineyards.png',
    },
    winePascal: {
      name: 'Вино Pascal Bouchard Chablis Le Classique',
      price: 949.60, oldPrice: 1490.00, discount: 25, weight: '0.75 л', rating: '4.8',
      image: 'assets/images/products/wine-pascal-bouchard.png',
    },
    punchRauschgold: {
      name: 'Вино плодове Rauschgold Engel Gluhpunsch Heidelbeere Пунш з чорницею',
      price: 199.90, oldPrice: 220.90, discount: 15, weight: '0.75 л', rating: '5.0',
      image: 'assets/images/products/punch-rauschgold.png',
    },
    wineCasa: {
      name: 'Вино Casa de Vilacetinho Vihno Verde Gr Eschola 2017',
      price: 437.50, weight: '0.75 л', rating: '4.9',
      image: 'assets/images/products/wine-casa-vilacetinho.png',
    },

    /* --- Демо картки товару (demo-card.html): сценарії з брифу ---
       Поля картки (усі необовʼязкові):
       • bb — бали «Власного Рахунку» (ББ), число: 12.21. Старе поле bonus ('+5') теж читається.
       • bulk — «від 2 шт»: { price: 87.80, from: '2 шт' }.
       • markdown — уцінка «Я ще ОК»: { until: '29.08.26' } (бабл на фото + «Вжити до …»).
       • installment — кількість платежів розтермінування: { payments: 24 }. Саме розтермінування
         показується в усіх товарів від DATA.card.installment.from ₴ (без поля — типова кількість платежів).
       • nutri — Nutri-Score: 'A' … 'E'.
       • tags — велнес-теги з DATA.card.tags: ['vegan', 'sugarFree']. У лістингу не показуються:
         чипи на сторінці товару + фільтри лістингу.
       • expected — товар очікується (оверлей замість «+»).
       Nutri-Score — майже в усіх (щоб порівняти «у слоті» й «знизу»);
       без нього лише iPhone, біле вино «тільки ББ» і фісташки (теги без Nutri-Score). */
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
      nutri: 'B', tags: ['vegan', 'sugarFree'],
      image: 'assets/images/products/olive-oil-premia.png',
    },
    dApplesSale: {
      name: 'Яблука червоні Ред Делішес', price: 42.77, oldPrice: 61.10, discount: 30, weight: '1 кг',
      nutri: 'A', tags: ['vegan', 'sugarFree'],
      image: 'assets/images/products/card/apples-red.png',
    },
    dWineRed: {
      name: 'Вино Mas de Daumas Gassac червоне сухе', price: 422.77, oldPrice: 526.90, discount: 20, weight: '0,75 л',
      bb: 12.21, markdown: { until: '01.09.26' }, nutri: 'C', tags: ['vegan'],
      image: 'assets/images/products/card/wine-red.png',
    },
    dIphoneSale: {
      name: 'Мобільний телефон Apple iPhone 18 Pro 2TB Burgundy', price: 157999, oldPrice: 179999, discount: 12, weight: '1 шт',
      bb: 1580, // TBD: округлення великих сум ББ (+1 580 б чи +1.5к б)
      installment: { payments: 24 },
      image: 'assets/images/products/card/iphone.png',
    },
    dIphone: {
      name: 'Мобільний телефон Apple iPhone 18 Pro 1TB Burgundy', price: 149999, weight: '1 шт',
      installment: { payments: 24 },
      image: 'assets/images/products/card/iphone.png',
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
      tags: ['vegan', 'sugarFree'],
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
    // велнес-теги: чипи на сторінці товару (js/screens/pdp.js) і фільтри лістингу (js/screens/listing.js)
    tags: {
      vegan:     { label: 'Веган' },
      sugarFree: { label: 'Без цукру' },
    },
  },

  /* Демо-сторінка картки (demo-card.html): які товари в лістингу й каруселі */
  cardDemo: {
    title: 'Картка товару',
    listing: [
      { id: 'dMarshmallow' },
      { id: 'dCucumbers',  badges: ['percent'] },
      { id: 'dWineSale' },
      { id: 'dBananas' },
      { id: 'dIphoneSale', badges: ['percent'] },
      { id: 'dOliveOil' },
      { id: 'dMilk' },
      { id: 'dCoffee',     badges: ['bulk'] },
      { id: 'dPineapple',  badges: ['cinotyzhyky'] },
      { id: 'dWineRed',    badges: ['percent', 'klatsni'] },
      { id: 'dWineWhite' },
      { id: 'dIphone' },
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
      { id: 'dIphoneSale' },
    ],
  },

  /* ---------------- Нижній таб-бар ---------------- */
  tabbar: [
    // icon — сіра іконка; iconActive — синя, для активної вкладки
    { id: 'home',      label: 'Головна',    icon: 'assets/icons/tab-home.svg', iconActive: 'assets/icons/tab-home-active.svg', go: 'home' },
    { id: 'delivery',  label: 'Доставка',   icon: 'assets/icons/tab-delivery.svg', iconActive: 'assets/icons/tab-delivery-active.svg', go: 'catalog' },
    { id: 'cart',      label: 'Кошик',      icon: 'assets/icons/tab-cart.svg' },
    { id: 'store',     label: 'В магазині', icon: 'assets/icons/tab-store.svg' },
    { id: 'purchases', label: 'Покупки',    icon: 'assets/icons/tab-purchases.svg' },
  ],

  /* =================================================================
     ГОЛОВНА
     ================================================================= */
  home: {
    delivery: {
      type: 'Доставка',
      slot: 'з <b>12:00</b> до 13:30',
      address: 'Вул. Рея Бредбері, 5/15. Київ',
      bonus: '123.00',
      notifications: 3,
    },

    ecosystem: [
      { label: 'Власний Рахунок',    icon: 'assets/icons/eco-vr.svg' },
      { label: 'Мої пропозиції',     icon: 'assets/icons/eco-offers.svg', badge: '45' },
      { label: 'Колесо фортуни',     icon: 'assets/icons/eco-fortune.svg' },
      { label: 'Підписка «Плюхс»',   icon: 'assets/icons/eco-pluhs.svg' },
    ],

    promo: {
      title: 'Оберіть 5 із 10 пропозицій',
      subtitle: 'Спеціальна добірка для вас',
      sticker: '-10%',
      image: 'assets/images/home/promo-5-of-10.png',
      footer: 'Оновлення щосереди',
    },

    searchPlaceholder: 'Пошук в «Сільпо»',

    services: [
      { title: 'З «Сільпо» поруч',       badge: '7 000 товарів',  image: 'assets/images/home/service-delivery.png' },
      { title: 'З найбільшого «Сільпо»', badge: '50 000 товарів', image: 'assets/images/home/service-darkhub.png' },
      { title: '«Сільпо» самовивіз',                              image: 'assets/images/home/service-pickup.png' },
    ],
    quickServices: [
      { title: 'Доставка за 30 хв',     image: 'assets/images/home/service-loko.svg',        size: 40 },
      { title: 'Доставка з ресторанів', image: 'assets/images/home/service-restaurants.png', size: 48 },
    ],

    categories: {
      title: 'Популярні категорії',
      promo: { label: 'Акційні пропозиції', image: 'assets/images/categories/promo-offers.png' },
      items: [
        { label: 'Фрукти, овочі',               icon: 'assets/images/categories/fruits-vegetables.svg' },
        { label: 'М’ясо',                       icon: 'assets/images/categories/meat.svg' },
        { label: 'Молочні продукти та яйця',    icon: 'assets/images/categories/dairy-eggs.svg' },
        { label: 'Хліб та випічка',             icon: 'assets/images/categories/bread.svg' },
        { label: 'Ковбаси і м’ясні делікатеси', icon: 'assets/images/categories/sausages.svg' },
        { label: 'Заморожена продукція',        icon: 'assets/images/categories/frozen.svg' },
      ],
      more: 'Дивитись всі',
    },

    dealOfDay: { title: 'Товар дня', date: 'Ср 27 лист.', product: 'bakoma' },

    cinotyzhyky: {
      title: 'Цінотижики',
      subtitle: 'Вони з’являються щотижня у четвер',
      icon: 'assets/icons/section-cinotyzhyky.svg',
      items: [
        { id: 'hellmanns' },
        { id: 'pistachios', liked: true },
        { id: 'oliveOil' },
        { id: 'marshmallow' },
      ],
    },

    onlineOnly: {
      title: 'Тільки онлайн',
      subtitle: 'Вони з’являються щотижня у четвер',
      icon: 'assets/icons/section-online.svg',
      items: [
        { id: 'hellmanns' },
        { id: 'pistachios', liked: true },
        { id: 'oliveOil' },
        { id: 'marshmallow' },
      ],
    },

    banner: {
      image: 'assets/images/banners/delivery-or-pickup.png',
      alt: 'Спробуйте доставку або самовивіз — Власний Рахунок',
      slides: 4,
    },

    reorder: {
      title: 'Замов знову',
      icon: 'assets/icons/section-reorder.svg',
      items: [
        { id: 'hellmanns',   badge: 'cinotyzhyky' },
        { id: 'pistachios',  badge: 'klatsni', liked: true },
        { id: 'oliveOil',    badge: 'cinotyzhyky' },
        { id: 'marshmallow', badge: 'klatsni' },
      ],
    },

    myOffers: {
      title: 'Мої пропозиції',
      icon: 'assets/icons/section-my-offers.svg',
      coupons: [
        { percent: '20%', caption: 'повертаємо балобонусами', title: 'Свіжі банани з Еквадору', expires: 'Діє 7 днів', bg: '#e1888f', image: 'assets/images/banners/coupon-avocado.png' },
        { percent: '20%', caption: 'повертаємо балобонусами', title: 'Свіжі банани з Еквадору', expires: 'Діє 7 днів', bg: '#e1d6ba', image: 'assets/images/banners/coupon-eggs.png' },
        { percent: '20%', caption: 'повертаємо балобонусами', title: 'Свіжі банани з Еквадору', expires: 'Діє 7 днів', bg: '#f6e9cf', image: 'assets/images/banners/coupon-ezoo.jpg', dark: true },
      ],
    },

    buyBetter: {
      title: 'Купуйте вигідніше',
      subtitle: 'Товари, на які діють ваші пропозиції',
      items: [
        { id: 'water075',     badge: 'myOffer' },
        { id: 'water15',      badge: 'myOffer' },
        { id: 'water15light', badge: 'myOffer' },
      ],
    },

    games: {
      title: 'Ігри з нагородами',
      subtitle: 'Грайте та більше вигоди вигравайте!',
      items: [
        { image: 'assets/images/banners/game-polyubichcha.png', alt: 'Полюбичча — Зазирнути' },
        { image: 'assets/images/banners/game-paket.png',        alt: 'Пакет' },
      ],
    },

    lastOrder: {
      emoji: '🤗',
      title: 'Попереднє замовлення – топчик!',
      type: 'Доставка',
      date: '17 жовтня 2024, 19:35',
      address: 'Вул. Рея Бредбері, 5/15',
      total: '946.00 ₴',
      action: 'Додати в кошик знову',
      thumbs: [
        'assets/images/products/thumb-baguette.png',
        'assets/images/products/thumb-wine.png',
        'assets/images/products/thumb-bananas.png',
      ],
    },

    favorites: {
      title: 'Улюблене',
      icon: 'assets/icons/section-favorites.svg',
      items: [
        { id: 'hellmanns',   badge: 'cinotyzhyky' },
        { id: 'pistachios',  badge: 'klatsni', liked: true },
        { id: 'oliveOil',    badge: 'cinotyzhyky' },
        { id: 'marshmallow', badge: 'klatsni' },
      ],
    },
  },

  /* =================================================================
     КАТАЛОГ
     • У назвах плиток «\n» = перенесення рядка (кожен рядок — окрема біла плашка).
     ================================================================= */
  catalog: {
    address: 'вул Миколи Миклухи, 1Г',
    city: 'Київ',
    timeslot: { day: 'Сьогодні', time: '00:00 – 00:00' },
    express: 'Прискорити доставку за ХХ ₴. Привеземо <em>до YY хв</em>.',
    searchPlaceholder: 'Пошук в «Сільпо»',
    promo: { title: 'Акційні пропозиції', badges: 'assets/images/catalog/promo-badges.png' },
    chips: ['Тільки онлайн', 'Піца, бургери та суші', 'Святку з Jacobs'],

    sections: [
      {
        id: 'fruits', title: 'Фрукти, овочі, соління', color: '#ebf6d8',
        tiles: [
          { label: 'Фрукти',                        image: 'assets/images/catalog/fruits.png', go: 'listing' },
          { label: 'Овочі',                         image: 'assets/images/catalog/vegetables.png', go: 'listing' },
          { label: 'Соління\nмариновані\nстрави',   image: 'assets/images/catalog/pickles.png', go: 'listing' },
          { label: 'Салати',                        image: 'assets/images/catalog/vegetables.png', go: 'listing' },
          { label: 'Зелень',                        image: 'assets/images/catalog/greens.png', go: 'listing' },
          { label: 'Горіхи, гриби,\nсушені фрукти', image: 'assets/images/catalog/nuts-mushrooms-dried.png', go: 'listing' },
          { label: 'Фруктові\nделікатеси',          image: 'assets/images/catalog/fruit-delicacies.png', go: 'listing' },
          { label: 'Свіжі гриби',                   image: 'assets/images/catalog/fresh-mushrooms.png', go: 'listing' },
        ],
      },
      {
        id: 'meat', title: 'М‘ясо, риба, птиця', color: '#fcdada',
        tiles: [
          { label: 'Заморожена риба,\nморепродукти і\nмолюски',  image: 'assets/images/catalog/frozen-fish.png', go: 'listing' },
          { label: 'Приготовлена риба\nта морепродукти',        image: 'assets/images/catalog/cooked-fish.png', go: 'listing' },
          { label: 'Жива та охолоджена\nриба та\nморепродукти', image: 'assets/images/catalog/chilled-fish.png', go: 'listing' },
          { label: 'Свіже м’ясо',                               image: 'assets/images/catalog/fresh-meat.png', go: 'listing' },
        ],
      },
      {
        id: 'cheese', title: 'Сири', color: '#fff4c3',
        tiles: [
          { label: 'Сири м’які',     image: 'assets/images/catalog/soft-cheese.png', go: 'listing' },
          { label: 'Сири плавлені',  image: 'assets/images/catalog/processed-cheese.png', go: 'listing' },
          { label: 'Сири розсільні', image: 'assets/images/catalog/brine-cheese.png', go: 'listing' },
          { label: 'Сири плавлені',  image: 'assets/images/catalog/hard-cheese.png', go: 'listing' },
        ],
      },
    ],

    /* Нижня панель: швидкий перехід між категоріями */
    bottomCategories: [
      { label: 'Фрукти, овочі',         icon: 'assets/images/categories/fruits-vegetables.svg', section: 'fruits' },
      { label: 'М’ясо, риба, птиця',    icon: 'assets/images/categories/meat.svg',              section: 'meat' },
      { label: 'М’ясо-ковбасні вироби', icon: 'assets/images/categories/sausages.svg' },
      { label: 'Сири',                  icon: 'assets/images/categories/dairy-eggs.svg',        section: 'cheese' },
      { label: 'Хліб та випічка',       icon: 'assets/images/categories/bread.svg' },
      { label: 'Молочні продукти',      icon: 'assets/images/categories/dairy-eggs.svg' },
    ],
    deliveryHint: 'Хочеш доставку за 1 ₴? За деталями сюди 👉',
  },

  /* =================================================================
     ЛІСТИНГ (PLP)
     • pages — сторінки лістингу. Для прототипу є лише «Фрукти»: усе з каталогу
       веде на defaultPage. Нова сторінка = новий ключ у pages + category у плитці каталогу.
     • tabs — чипси-фільтри; «tag» товару має збігатися з назвою чипса.
       tag можна задати прямо в items (має пріоритет) або в products.
     • Адреса сторінки: index.html#listing/fruits
     ================================================================= */
  listing: {
    defaultPage: 'fruits', // сюди веде весь каталог
    pages: {
      fruits: {
        title: 'Фрукти',
        chatTitle: 'фруктів', // як Машрум називає категорію в реченні: «серед фруктів»
        back: 'catalog',
        tabs: ['Всі', 'Екзотичні', 'Яблука, груші', 'Баштанні', 'Кісточкові', 'Виноград', 'Цитрусові'],
        items: [
          { id: 'banana',      tag: 'Екзотичні' },
          { id: 'appleGolden', tag: 'Яблука, груші', liked: true },
          { id: 'peach',       tag: 'Кісточкові', badges: ['percent'] },
          { id: 'watermelon',  tag: 'Баштанні' },
          { id: 'melon',       tag: 'Баштанні', badges: ['percent'] },
          { id: 'lime',        tag: 'Цитрусові' },
          { id: 'grapesRed',   tag: 'Виноград', badges: ['cinotyzhyky'] },
          { id: 'mango',       tag: 'Екзотичні' },
          { id: 'persimmon',   tag: 'Екзотичні', liked: true },
          { id: 'cherimoya',   tag: 'Екзотичні', badges: ['percent'] },
          { id: 'pineapple',   tag: 'Екзотичні', badges: ['cinotyzhyky', 'percent'] },
          { id: 'pears',       tag: 'Яблука, груші' },
        ],
      },
    },
    searchPlaceholder: 'Пошук в «Сільпо»',
    saleOnlyLabel: 'Лише акційні товари',
    empty: 'Нічого не знайдено. Спробуйте інший запит.',
    basket: { label: 'Кошик', delivery: 'Доставимо за XX ₴' },
  },

  /* =================================================================
     КАРТКА ТОВАРУ (PDP)
     • Картка відкривається для будь-якого товару: index.html#pdp/banana
     • products — вміст картки для кожного товару (ключ = id з products вище).
       Будь-який блок можна пропустити — він просто не показується.
         description — абзац «Опис»
         composition — { text, allergens: { label, value } } — блок «Склад»
         details     — рядки «Загальна інформація»
         nutrition   — { kcal, protein, fat, carbs, sugar, satFat } на 100 г
         warning     — плашка 18+ (для алкоголю)
         similar     — «Схожі товари»; якщо не задано — товари з того ж лістингу
     ================================================================= */
  pdp: {
    defaultProduct: 'wineLail',
    stock: 'Лишилось: 1000 шт',
    gallery: 5, // кількість крапок під фото
    titles: {
      description: 'Опис',
      composition: 'Склад',
      details: 'Загальна інформація',
      nutrition: 'Харчова цінність на 100 г',
      similar: 'Схожі товари',
    },
    nutritionLabels: { kcal: 'Калорійність', protein: 'Білки', fat: 'Жири', carbs: 'Вуглеводи', sugar: 'з них цукри', satFat: 'з них насичені' },
    more: 'Дивитись всі',
    addToCart: 'У кошик',

    products: {
      wineLail: {
        composition: {
          text: 'Вино Lail Vineyards (Лейл Віньярдс) Napa Valley Cabernet Sauvignon Cuve 2013 виготовлено з добірних сортів винограду: Каберне Совіньйон',
          allergens: { label: 'Алергени:', value: 'діоксид сірки' },
        },
        details: [
          { label: 'Торгова марка',           value: 'Chateau Tertre' },
          { label: 'Країна походження',       value: 'Франція' },
          { label: 'Колір вина',              value: 'Червоне' },
          { label: 'Смак вина',               value: 'Сухе' },
          { label: 'Сорт винограду',          value: 'Каберне Совіньйон, Мерло, Каберне Фран' },
          { label: 'Тон букета',              value: 'Фруктові, ягідні, пряні' },
          { label: 'Регіон походження вина',  value: 'Bordeaux' },
          { label: 'Кислотність',             value: 'Помірна' },
          { label: '% спирту',                value: '13' },
          { label: 'Гастрономічні поєднання', value: 'м\'ясо, м\'ясні закуски, тверді сири' },
        ],
        nutrition: { kcal: '87', protein: '9.5 г', fat: '15.5 г', satFat: '4.8 г', carbs: '4.1 г', sugar: '2.2 г' },
        warning: { badge: '18+', text: 'Придбати алкогольні напої можуть особи, які досягли 18 років. Надмірне споживання алкоголю шкідливе для вашого здоров\'я.' },
        similar: [
          { id: 'winePascal',      badges: ['cinotyzhyky'] },
          { id: 'punchRauschgold', badges: ['cinotyzhyky'] },
          { id: 'wineCasa' },
        ],
      },

      winePascal: {
        description: 'Класичне шаблі з Бургундії: свіже, мінеральне, з нотами цитрусових і зеленого яблука. До устриць, риби й мʼяких сирів.',
        composition: {
          text: 'Вино біле сухе, виготовлене з винограду сорту Шардоне.',
          allergens: { label: 'Алергени:', value: 'діоксид сірки' },
        },
        details: [
          { label: 'Торгова марка',           value: 'Pascal Bouchard' },
          { label: 'Країна походження',       value: 'Франція' },
          { label: 'Колір вина',              value: 'Біле' },
          { label: 'Смак вина',               value: 'Сухе' },
          { label: 'Сорт винограду',          value: 'Шардоне' },
          { label: 'Тон букета',              value: 'Цитрусові, мінеральні, квіткові' },
          { label: 'Регіон походження вина',  value: 'Chablis, Burgundy' },
          { label: 'Кислотність',             value: 'Висока' },
          { label: '% спирту',                value: '12.5' },
          { label: 'Гастрономічні поєднання', value: 'риба, морепродукти, мʼякі сири' },
        ],
        nutrition: { kcal: '82', protein: '0.1 г', fat: '0 г', carbs: '2.6 г', sugar: '0.9 г' },
        warning: { badge: '18+', text: 'Придбати алкогольні напої можуть особи, які досягли 18 років. Надмірне споживання алкоголю шкідливе для вашого здоров\'я.' },
        similar: [
          { id: 'wineCasa' },
          { id: 'wineLail' },
          { id: 'punchRauschgold', badges: ['cinotyzhyky'] },
        ],
      },
      punchRauschgold: {
        description: 'Зимовий пунш на основі плодового вина з чорницею та прянощами. Підігрійте до 70 °C — і глінтвейн готовий.',
        composition: {
          text: 'Вино плодове з чорниці, цукор, натуральні ароматизатори (кориця, гвоздика, цитрусові), регулятор кислотності: лимонна кислота.',
          allergens: { label: 'Алергени:', value: 'діоксид сірки' },
        },
        details: [
          { label: 'Торгова марка',           value: 'Rauschgold Engel' },
          { label: 'Країна походження',       value: 'Німеччина' },
          { label: 'Колір вина',              value: 'Червоне' },
          { label: 'Смак вина',               value: 'Солодке' },
          { label: 'Основа',                  value: 'Плодове вино з чорниці' },
          { label: 'Тон букета',              value: 'Ягідні, пряні' },
          { label: '% спирту',                value: '8' },
          { label: 'Як подавати',             value: 'Гарячим, 60–70 °C' },
          { label: 'Гастрономічні поєднання', value: 'випічка, пряники, горіхи' },
        ],
        nutrition: { kcal: '140', protein: '0 г', fat: '0 г', carbs: '18 г', sugar: '17 г' },
        warning: { badge: '18+', text: 'Придбати алкогольні напої можуть особи, які досягли 18 років. Надмірне споживання алкоголю шкідливе для вашого здоров\'я.' },
        similar: [
          { id: 'wineCasa' },
          { id: 'winePascal', badges: ['cinotyzhyky'] },
          { id: 'wineLail' },
        ],
      },
      wineCasa: {
        description: 'Легке португальське віно верде з ледь відчутною бульбашкою, зеленим яблуком і лаймом у смаку. Добре охолодженим — у спеку.',
        composition: {
          text: 'Вино біле сухе, виготовлене з винограду сортів Лоурейру, Трайжадура та Алваріньйо.',
          allergens: { label: 'Алергени:', value: 'діоксид сірки' },
        },
        details: [
          { label: 'Торгова марка',           value: 'Casa de Vilacetinho' },
          { label: 'Країна походження',       value: 'Португалія' },
          { label: 'Колір вина',              value: 'Біле' },
          { label: 'Смак вина',               value: 'Сухе' },
          { label: 'Сорт винограду',          value: 'Лоурейру, Трайжадура, Алваріньйо' },
          { label: 'Тон букета',              value: 'Фруктові, цитрусові' },
          { label: 'Регіон походження вина',  value: 'Vinho Verde' },
          { label: 'Кислотність',             value: 'Висока' },
          { label: '% спирту',                value: '11' },
          { label: 'Гастрономічні поєднання', value: 'салати, риба, морепродукти' },
        ],
        nutrition: { kcal: '70', protein: '0.1 г', fat: '0 г', carbs: '2.4 г', sugar: '1.5 г' },
        warning: { badge: '18+', text: 'Придбати алкогольні напої можуть особи, які досягли 18 років. Надмірне споживання алкоголю шкідливе для вашого здоров\'я.' },
        similar: [
          { id: 'winePascal', badges: ['cinotyzhyky'] },
          { id: 'punchRauschgold', badges: ['cinotyzhyky'] },
          { id: 'wineLail' },
        ],
      },

      /* --- Фрукти --- */
      banana: {
        description: 'Стиглі банани з Еквадору з ніжною солодкою мʼякоттю. Смачні самі по собі, у смузі, вівсянці чи випічці.',
        details: [
          { label: 'Країна походження', value: 'Еквадор' },
          { label: 'Сорт', value: 'Кавендіш' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від +13 до +16 °C' },
        ],
        nutrition: { kcal: '89', protein: '1.1 г', fat: '0.3 г', carbs: '22.8 г', sugar: '12.2 г' },
      },
      appleGolden: {
        description: 'Хрусткі жовті яблука з медово-солодким смаком і легким ароматом. Підходять для перекусу, салатів і запікання.',
        details: [
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Сорт', value: 'Голден Делішес' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від 0 до +4 °C' },
        ],
        nutrition: { kcal: '52', protein: '0.3 г', fat: '0.2 г', carbs: '13.8 г', sugar: '10.4 г' },
      },
      peach: {
        description: 'Соковиті персики з оксамитовою шкіркою та насиченим ароматом. Найсмачніші, коли мʼякоть ледь піддається натиску.',
        details: [
          { label: 'Країна походження', value: 'Іспанія' },
          { label: 'Сорт', value: 'Жовтий персик' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від 0 до +4 °C' },
        ],
        nutrition: { kcal: '39', protein: '0.9 г', fat: '0.3 г', carbs: '9.5 г', sugar: '8.4 г' },
      },
      watermelon: {
        description: 'Кавун сорту Вогник із соковитою червоною мʼякоттю та дрібним насінням. Освіжає в спеку.',
        details: [
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Сорт', value: 'Вогник' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'До +20 °C, розрізаний — у холодильнику' },
        ],
        nutrition: { kcal: '30', protein: '0.6 г', fat: '0.2 г', carbs: '7.6 г', sugar: '6.2 г' },
      },
      melon: {
        description: 'Жовта диня Валенсія з кремовою соковитою мʼякоттю та медовим ароматом. Смакує з прошуто чи в десертах.',
        details: [
          { label: 'Країна походження', value: 'Іспанія' },
          { label: 'Сорт', value: 'Валенсія' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від +7 до +10 °C' },
        ],
        nutrition: { kcal: '34', protein: '0.8 г', fat: '0.2 г', carbs: '8.2 г', sugar: '7.9 г' },
      },
      lime: {
        description: 'Ароматний лайм із тонкою шкіркою та кислуватим соком. Для лимонадів, коктейлів, соусів і азійських страв.',
        details: [
          { label: 'Країна походження', value: 'Мексика' },
          { label: 'Сорт', value: 'Перський лайм' },
          { label: 'Смак', value: 'Кислий' },
          { label: 'Умови зберігання', value: 'Від +8 до +10 °C' },
        ],
        nutrition: { kcal: '30', protein: '0.7 г', fat: '0.2 г', carbs: '10.5 г', sugar: '1.7 г' },
      },
      grapesRed: {
        description: 'Великий рожево-червоний виноград РедГлоб із хрусткою мʼякоттю. Прикрасить сирну тарілку та фруктовий салат.',
        details: [
          { label: 'Країна походження', value: 'Італія' },
          { label: 'Сорт', value: 'Ред Глоб' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від 0 до +2 °C' },
        ],
        nutrition: { kcal: '69', protein: '0.7 г', fat: '0.2 г', carbs: '18.1 г', sugar: '15.5 г' },
      },
      mango: {
        description: 'Стигле манго з яскравою соковитою мʼякоттю без волокон. Ідеальне для смузі, салатів і сальси.',
        details: [
          { label: 'Країна походження', value: 'Перу' },
          { label: 'Сорт', value: 'Кент' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від +10 до +13 °C' },
        ],
        nutrition: { kcal: '60', protein: '0.8 г', fat: '0.4 г', carbs: '15.0 г', sugar: '13.7 г' },
      },
      persimmon: {
        description: 'Азербайджанська хурма з мʼякою желейною мʼякоттю. Солодка, без терпкості — достатньо дозріти при кімнатній температурі.',
        details: [
          { label: 'Країна походження', value: 'Азербайджан' },
          { label: 'Сорт', value: 'Королек' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від 0 до +2 °C' },
        ],
        nutrition: { kcal: '70', protein: '0.6 г', fat: '0.2 г', carbs: '18.6 г', sugar: '12.5 г' },
      },
      cherimoya: {
        description: 'Екзотична черімоя з кремовою мʼякоттю — на смак нагадує поєднання банана, ананаса та полуниці. Їжте ложкою, насіння не вживайте.',
        details: [
          { label: 'Країна походження', value: 'Іспанія' },
          { label: 'Сорт', value: 'Фіно де Жете' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від +8 до +12 °C' },
        ],
        nutrition: { kcal: '75', protein: '1.6 г', fat: '0.7 г', carbs: '17.7 г', sugar: '12.9 г' },
      },
      pineapple: {
        description: 'Солодкий ананас із соковитою золотистою мʼякоттю та яскравим тропічним ароматом.',
        details: [
          { label: 'Країна походження', value: 'Коста-Рика' },
          { label: 'Сорт', value: 'Голден Світ (MD2)' },
          { label: 'Смак', value: 'Кисло-солодкий' },
          { label: 'Умови зберігання', value: 'Від +7 до +10 °C' },
        ],
        nutrition: { kcal: '50', protein: '0.5 г', fat: '0.1 г', carbs: '13.1 г', sugar: '9.9 г' },
      },
      pears: {
        description: 'Соковиті груші з ніжною маслянистою мʼякоттю. Смачні свіжими, із сиром або запеченими з медом.',
        details: [
          { label: 'Країна походження', value: 'Бельгія' },
          { label: 'Сорт', value: 'Конференс' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від 0 до +4 °C' },
        ],
        nutrition: { kcal: '57', protein: '0.4 г', fat: '0.1 г', carbs: '15.2 г', sugar: '9.8 г' },
      },
      applesGreen: {
        description: 'Хрусткі зелені яблука з освіжаючою кислинкою. Для перекусу, салатів, шарлотки й дитячого пюре.',
        details: [
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Сорт', value: 'Гренні Сміт' },
          { label: 'Смак', value: 'Кисло-солодкий' },
          { label: 'Умови зберігання', value: 'Від 0 до +4 °C' },
        ],
        nutrition: { kcal: '48', protein: '0.4 г', fat: '0.2 г', carbs: '11.4 г', sugar: '9.6 г' },
        similar: [{ id: 'appleGolden', liked: true }, { id: 'pears' }, { id: 'peach', badges: ['percent'] }, { id: 'banana' }],
      },
      grapes: {
        description: 'Фіолетовий виноград із тонкою шкіркою та насиченим ягідним смаком. До сиру, у фруктовий салат або просто так.',
        details: [
          { label: 'Країна походження', value: 'Молдова' },
          { label: 'Сорт', value: 'Молдова' },
          { label: 'Смак', value: 'Солодкий' },
          { label: 'Умови зберігання', value: 'Від 0 до +2 °C' },
        ],
        nutrition: { kcal: '67', protein: '0.6 г', fat: '0.2 г', carbs: '17.2 г', sugar: '16.0 г' },
        similar: [{ id: 'grapesRed', badges: ['cinotyzhyky'] }, { id: 'persimmon', liked: true }, { id: 'cherimoya', badges: ['percent'] }, { id: 'mango' }],
      },

      /* --- Овочі --- */
      tomatoes: {
        description: 'Мʼясисті червоні помідори з насиченим смаком і ароматом. Для салатів, бутербродів, соусів і запікання.',
        details: [
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Сорт', value: 'Рожевий гігант' },
          { label: 'Смак', value: 'Солодкуватий' },
          { label: 'Умови зберігання', value: 'Від +10 до +15 °C, не в холодильнику' },
        ],
        nutrition: { kcal: '20', protein: '0.9 г', fat: '0.2 г', carbs: '3.9 г', sugar: '2.6 г' },
        similar: [{ id: 'cabbage' }, { id: 'oliveOil', badges: ['cinotyzhyky'] }, { id: 'hellmanns' }],
      },
      cabbage: {
        description: 'Молода капуста з ніжним хрустким листям без гіркоти. Для салату з огірком і кропом, тушкування та борщу.',
        details: [
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Сорт', value: 'Рання білоголова' },
          { label: 'Смак', value: 'Соковитий, солодкуватий' },
          { label: 'Умови зберігання', value: 'Від 0 до +4 °C' },
        ],
        nutrition: { kcal: '27', protein: '1.8 г', fat: '0.1 г', carbs: '4.7 г', sugar: '4.0 г' },
        similar: [{ id: 'tomatoes', badges: ['cinotyzhyky', 'percent'] }, { id: 'oliveOil', badges: ['cinotyzhyky'] }, { id: 'hellmanns' }],
      },

      /* --- Товари з головної --- */
      hellmanns: {
        description: 'Класичний майонез із насиченим вершковим смаком. Для салатів, соусів, бутербродів і запікання.',
        composition: {
          text: 'Олія соняшникова рафінована дезодорована, вода, жовток яєчний, оцет спиртовий, цукор, сіль, сік лимонний концентрований, антиоксидант ЕДТА кальцію-динатрію, ароматизатори натуральні, екстракт паприки.',
          allergens: { label: 'Алергени:', value: 'яйця, може містити гірчицю' },
        },
        details: [
          { label: 'Торгова марка', value: 'Hellmann’s' },
          { label: 'Країна походження', value: 'Польща' },
          { label: 'Жирність', value: '73%' },
          { label: 'Тип упаковки', value: 'Скляна банка' },
          { label: 'Умови зберігання', value: 'Від 0 до +25 °C, після відкриття — у холодильнику до 3 міс.' },
        ],
        nutrition: { kcal: '667', protein: '1.1 г', fat: '73 г', satFat: '5.6 г', carbs: '1.3 г', sugar: '1.2 г' },
        similar: [{ id: 'oliveOil', badges: ['cinotyzhyky'] }, { id: 'tomatoes', badges: ['cinotyzhyky', 'percent'] }, { id: 'cabbage' }, { id: 'pistachios', badges: ['klatsni'] }],
      },
      pistachios: {
        description: 'Великі обсмажені фісташки з легкою солоністю. До пива, у салат, пасту чи просто на перекус.',
        composition: {
          text: 'Фісташки обсмажені, сіль кухонна.',
          allergens: { label: 'Алергени:', value: 'горіхи; може містити сліди арахісу та кунжуту' },
        },
        details: [
          { label: 'Торгова марка', value: 'Сільпо' },
          { label: 'Країна походження', value: 'США' },
          { label: 'Обробка', value: 'Смажені, солоні' },
          { label: 'Тип упаковки', value: 'Дой-пак' },
          { label: 'Умови зберігання', value: 'У сухому місці, до +25 °C' },
        ],
        nutrition: { kcal: '594', protein: '21 г', fat: '48.5 г', satFat: '5.9 г', carbs: '14.5 г', sugar: '7.7 г' },
        similar: [{ id: 'marshmallow', badges: ['klatsni'] }, { id: 'bakoma' }, { id: 'hellmanns', badges: ['cinotyzhyky'] }, { id: 'water075', badges: ['myOffer'] }],
      },
      oliveOil: {
        description: 'Оливкова олія Pure — суміш рафінованої та олії першого віджиму. Мʼякий смак, підходить для смаження, запікання й салатів.',
        composition: {
          text: 'Олія оливкова рафінована, олія оливкова першого холодного віджиму Extra Virgin.',
        },
        details: [
          { label: 'Торгова марка', value: '«Премія»®' },
          { label: 'Країна походження', value: 'Іспанія' },
          { label: 'Тип олії', value: 'Pure (суміш)' },
          { label: 'Тип упаковки', value: 'Скляна пляшка' },
          { label: 'Умови зберігання', value: 'У темному місці, від +5 до +25 °C' },
        ],
        nutrition: { kcal: '899', protein: '0 г', fat: '99.9 г', satFat: '14 г', carbs: '0 г', sugar: '0 г' },
        similar: [{ id: 'hellmanns', badges: ['cinotyzhyky'] }, { id: 'tomatoes', badges: ['cinotyzhyky', 'percent'] }, { id: 'cabbage' }, { id: 'pistachios', badges: ['klatsni'] }],
      },
      marshmallow: {
        description: 'Легкі повітряні маршмелоу чотирьох кольорів. До какао й кави, на гриль або для прикрашання десертів.',
        composition: {
          text: 'Цукор, сироп глюкозний, вода, желатин, декстроза, ароматизатори, барвники: кармін, куркумін, мідні комплекси хлорофілів.',
          allergens: { label: 'Алергени:', value: 'не містить' },
        },
        details: [
          { label: 'Торгова марка', value: 'Сільпо' },
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Смак', value: 'Асорті: ваніль, полуниця, лимон, яблуко' },
          { label: 'Тип упаковки', value: 'Пакет' },
          { label: 'Умови зберігання', value: 'У сухому місці, від +15 до +21 °C' },
        ],
        nutrition: { kcal: '322', protein: '3.5 г', fat: '0.1 г', satFat: '0 г', carbs: '77 г', sugar: '58 г' },
        similar: [{ id: 'bakoma' }, { id: 'pistachios', badges: ['klatsni'] }, { id: 'cherimoya', badges: ['percent'] }, { id: 'water075', badges: ['myOffer'] }],
      },
      bakoma: {
        description: 'Рослинний десерт на кокосовій основі зі смаком солоної карамелі. Без молока й лактози — підійде веганам.',
        composition: {
          text: 'Вода, крохмаль модифікований, цукор, кокосова олія, карамель (цукор, сіль), загусник: карагінан, ароматизатор, сіль, кальцію фосфат, вітаміни B12 і D.',
          allergens: { label: 'Алергени:', value: 'не містить молока; може містити сліди сої' },
        },
        details: [
          { label: 'Торгова марка', value: 'Bakoma Ave Vege' },
          { label: 'Країна походження', value: 'Польща' },
          { label: 'Смак', value: 'Солона карамель' },
          { label: 'Особливості', value: 'Веганський, без лактози' },
          { label: 'Умови зберігання', value: 'Від +2 до +6 °C' },
        ],
        nutrition: { kcal: '121', protein: '0.3 г', fat: '4.2 г', satFat: '3.9 г', carbs: '20.2 г', sugar: '12.8 г' },
        similar: [{ id: 'marshmallow', badges: ['klatsni'] }, { id: 'pistachios', badges: ['klatsni'] }, { id: 'banana' }, { id: 'mango' }],
      },
      water075: {
        description: 'Лікувально-столова мінеральна вода з Карпат із низькою мінералізацією. Мʼякий смак, щодня й для всієї родини.',
        composition: {
          text: 'Вода мінеральна природна лікувально-столова маломінералізована сульфатно-хлоридна кальцієво-натрієво-магнієва. Мінералізація 0,1–0,3 г/дм³.',
        },
        details: [
          { label: 'Торгова марка', value: '«Моршинська»' },
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Газованість', value: 'Негазована' },
          { label: 'Тип упаковки', value: 'ПЕТ-пляшка' },
          { label: 'Умови зберігання', value: 'У темному місці, від +5 до +20 °C' },
        ],
        nutrition: { kcal: '0', protein: '0 г', fat: '0 г', carbs: '0 г' },
        similar: [{ id: 'water15', badges: ['myOffer'] }, { id: 'water15light', badges: ['myOffer'] }, { id: 'lime' }],
      },
      water15: {
        description: 'Лікувально-столова мінеральна вода з Карпат із низькою мінералізацією. Велика пляшка — для дому й родини.',
        composition: {
          text: 'Вода мінеральна природна лікувально-столова маломінералізована сульфатно-хлоридна кальцієво-натрієво-магнієва. Мінералізація 0,1–0,3 г/дм³.',
        },
        details: [
          { label: 'Торгова марка', value: '«Моршинська»' },
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Газованість', value: 'Негазована' },
          { label: 'Тип упаковки', value: 'ПЕТ-пляшка' },
          { label: 'Умови зберігання', value: 'У темному місці, від +5 до +20 °C' },
        ],
        nutrition: { kcal: '0', protein: '0 г', fat: '0 г', carbs: '0 г' },
        similar: [{ id: 'water075', badges: ['myOffer'] }, { id: 'water15light', badges: ['myOffer'] }, { id: 'lime' }],
      },
      water15light: {
        description: 'Мінеральна вода з Карпат із легкими бульбашками. Освіжає, але не «колеться» — компроміс між газованою й негазованою.',
        composition: {
          text: 'Вода мінеральна природна лікувально-столова маломінералізована сульфатно-хлоридна кальцієво-натрієво-магнієва, діоксид вуглецю. Мінералізація 0,1–0,3 г/дм³.',
        },
        details: [
          { label: 'Торгова марка', value: '«Моршинська»' },
          { label: 'Країна походження', value: 'Україна' },
          { label: 'Газованість', value: 'Слабогазована' },
          { label: 'Тип упаковки', value: 'ПЕТ-пляшка' },
          { label: 'Умови зберігання', value: 'У темному місці, від +5 до +20 °C' },
        ],
        nutrition: { kcal: '0', protein: '0 г', fat: '0 г', carbs: '0 г' },
        similar: [{ id: 'water15', badges: ['myOffer'] }, { id: 'water075', badges: ['myOffer'] }, { id: 'lime' }],
      },
    },
  },

};
