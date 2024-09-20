import React, { useCallback, useState } from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
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
      item => {
        store.addItemToCart(item);
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
      <Cart cart={cart} setVisible={setModal} />
      <List
        items={list}
        actionLabel="Добавить"
        onAction={callbacks.onAddItemToCart}
        className="List"
        showCount={false}
        emptyMessage="Нет доступных товаров"
        showTotal={false}
      />
      <Modal
        cart={cart}
        visible={modal}
        setVisible={setModal}
        onDeleteItemCart={callbacks.onDeleteItemFromCart}
      />
    </PageLayout>
  );
}

export default App;
