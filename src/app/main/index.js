import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import useLocale from '../../locale/use-locale';
import MainTool from '../../components/main-tool';

function Main() {
  const store = useStore();
  const { currentLanguage, setLanguage, translate, languagesList } = useLocale();

  const catalog = useSelector(state => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.loadCurrentPageData(catalog.currentPage);
  }, [store, catalog.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    changePage: useCallback(
      page => {
        store.actions.catalog.setCurrentPage(page);
      },
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            productLink={`/product/${item._id}`}
            addLabel={translate('add-label')}
          />
        );
      },
      [callbacks.addToBasket, translate],
    ),
  };

  const basketLabels = {
    inCart: translate('in-cart-label'),
    products: {
      one: translate('one-product-label'),
      few: translate('few-products-label'),
      many: translate('many-products-label'),
    },
    empty: translate('empty-label'),
    go: translate('go-label'),
  };

  const headLabels = {
    russian: translate('russian'),
    english: translate('english'),
  };

  return (
    <PageLayout>
      <Head
        title={translate('main-title')}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        languages={languagesList}
        labels={headLabels}
      />
      <MainTool mainLabel={translate('main-page')}>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={catalog.amount}
          sum={catalog.sum}
          labels={basketLabels}
        />
      </MainTool>
      <List list={catalog.list} renderItem={renders.item} />
      <Pagination
        currentPage={catalog.currentPage}
        totalPages={catalog.totalPages}
        onPageChange={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
