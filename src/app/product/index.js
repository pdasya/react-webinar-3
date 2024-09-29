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
import { getHeadLabels, getBasketLabels, getDetailsLabels, getMainToolLabel } from '../../utils';

function Product() {
  const store = useStore();
  const { id } = useParams();
  const { currentLanguage, setLanguage, translate, languagesList } = useLocale();

  useEffect(() => {
    store.actions.product.load(id);
  }, [id, store]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const basketLabels = getBasketLabels(translate);
  const headLabels = getHeadLabels(translate);
  const detailsLabels = getDetailsLabels(translate);
  const mainLabel = getMainToolLabel(translate);

  return (
    <PageLayout>
      <Head
        title={select.product.title}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        languages={languagesList}
        labels={headLabels}
      />
      <MainTool mainLabel={mainLabel}>
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
