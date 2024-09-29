import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import ItemDetails from '../../components/item-details';
import MainTool from '../../components/main-tool';
import useLocale from '../../locale/use-locale';

function Product() {
  const store = useStore();
  const { id } = useParams();
  const { currentLanguage, setLanguage, translate, languagesList } = useLocale();

  useEffect(() => {
    store.actions.product.load(id);
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
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

  const detailsLabels = {
    vendor: translate('vendor-label'),
    category: translate('category-label'),
    year: translate('year-label'),
    price: translate('price-label'),
    add: translate('add-label'),
  };

  return (
    <PageLayout>
      <Head
        title={select.product.title}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        languages={languagesList}
        labels={headLabels}
      />
      <MainTool mainLabel={translate('main-label')}>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          labels={basketLabels}
        />
      </MainTool>
      <ItemDetails {...select.product} onAdd={callbacks.addToBasket} labels={detailsLabels} />
    </PageLayout>
  );
}

export default memo(Product);
