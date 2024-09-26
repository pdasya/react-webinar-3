import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      _id: null,
      title: null,
      description: null,
      price: null,
      vendor: null,
      year: null,
      category: null,
    };
  }

  /**
   * Загрузка отдельного товара
   * @param productId {string} id товара
   */
  async load(productId) {
    const response = await fetch(
      `/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    const {
      _id,
      title,
      description,
      price,
      madeIn: { title: vendor },
      edition: year,
      category: { title: category },
    } = json.result;

    const product = {
      _id,
      title,
      description,
      price,
      vendor,
      year,
      category,
    };

    this.setState(product, 'Загружен товар из АПИ');
  }
}

export default Product;
