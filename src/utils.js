/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const getHeadLabels = translate => ({
  russian: translate('russian'),
  english: translate('english'),
});

export const getBasketLabels = translate => ({
  inCart: translate('in-cart-label'),
  products: {
    one: translate('one-product-label'),
    few: translate('few-products-label'),
    many: translate('many-products-label'),
  },
  empty: translate('empty-label'),
  go: translate('go-label'),
});

export const getDetailsLabels = translate => ({
  vendor: translate('vendor-label'),
  category: translate('category-label'),
  year: translate('year-label'),
  price: translate('price-label'),
  add: translate('add-label'),
});

export const getMainToolLabel = translate => translate('main-page');

export const getMainLabel = translate => translate('main-label');
