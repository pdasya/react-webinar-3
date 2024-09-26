import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import LanguageProvider from './locale/language-provider';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StoreContext.Provider>,
);
