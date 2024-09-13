const propNames = new Set(['id', 'className', 'textContent', 'onclick']);
const pluralRules = new Intl.PluralRules('ru');

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function getTimesClickedText(timesClicked) {
  const pluralCategory = pluralRules.select(timesClicked);

  switch (pluralCategory) {
    case 'one':
      return `Выделяли ${timesClicked} раз`;
    case 'few':
      return `Выделяли ${timesClicked} раза`;
    default:
      return `Выделяли ${timesClicked} раз`;
  }
}

