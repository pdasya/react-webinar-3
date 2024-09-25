import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      totalItems: 0,
    };
  }

  setCurrentPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      `Изменение текущей страницы на ${page}`,
    );

    this.loadCurrentPageData(page);
  }

  setTotalItems(totalItems) {
    const limit = this.getState().limit;
    const totalPages = Math.ceil(totalItems / limit);

    this.setState(
      {
        ...this.getState(),
        totalItems: totalItems,
        totalPages: totalPages,
      },
      'Установка общего количества страниц и элементов',
    );
  }

  async loadCurrentPageData(page) {
    const { limit } = this.getState();
    const skip = (page - 1) * limit;

    try {
      const totalResponse = await fetch(
        `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
      );
      const totalData = await totalResponse.json();

      const totalItems = totalData.result.count;

      this.store.actions.catalog.setList(totalData.result.items);
      this.setTotalItems(totalItems);

      return totalData;
    } catch (error) {
      console.error('Ошибка при загрузке данных страницы:', error);
    }
  }

  setLimit(newLimit) {
    this.setState(
      {
        ...this.getState(),
        limit: newLimit,
      },
      `Изменение лимита на ${newLimit}`,
    );

    this.setCurrentPage(1);
  }
}

export default Pagination;
