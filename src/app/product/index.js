import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import ItemDetails from '../../components/item-details';

function Product() {
  const store = useStore();
  const { id } = useParams();

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

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ItemDetails {...select.product} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);
