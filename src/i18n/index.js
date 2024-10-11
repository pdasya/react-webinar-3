import { EventEmitter } from 'events';
import * as translations from './translations';

export class I18nService extends EventEmitter {
  constructor(services, config) {
    super();
    this.services = services;
    this.currentLang = config.defaultLang || 'ru';

    // Установка начального языка в API сервис
    this.services.api.setHeader('Accept-Language', this.currentLang);
  }

  /**
   * Получить текущий язык
   */
  getLang() {
    return this.currentLang;
  }

  /**
   * Установить язык
   */
  setLang(lang) {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      // Уведомляем подписчиков об изменении языка
      this.emit('langChange', lang);
      // Обновляем заголовок в API сервисе
      this.services.api.setHeader('Accept-Language', lang);
    }
  }

  /**
   * Перевод текста
   */
  translate(text, plural, lang) {
    const targetLang = lang || this.currentLang;
    let result = translations[targetLang]?.[text] || text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(targetLang).select(plural);
      if (typeof result === 'object' && key in result) {
        result = result[key];
      }
    }

    return result;
  }
}
