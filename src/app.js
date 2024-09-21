import React, { useCallback, useState } from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import ModalContent from './components/modal-content';
import Item from './components/item';
import ItemModal from './components/item-modal';
import Button from './components/button';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, totalItems, totalPrice } = store.getState();
  const [modal, setModal] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddItemToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),

    onDeleteItemFromCart: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart totalItems={totalItems} totalPrice={totalPrice} setVisible={setModal} />
      <List
        items={list}
        ItemComponent={Item}
        onAction={callbacks.onAddItemToCart}
        actionLabel="Добавить"
        className="List"
        showTotal={false}
      />
      <ModalLayout visible={modal} setVisible={setModal}>
        <ModalContent
          cart={cart}
          onDeleteItemCart={callbacks.onDeleteItemFromCart}
          setVisible={setModal}
          totalPrice={totalPrice}
        />
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
