import store from '../render/store';

declare global {
  interface Window {
    hello: () => void;
    $store: typeof store;
  }
}

export default global;
