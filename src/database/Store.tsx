import {MMKV} from 'react-native-mmkv';

export const authStore = new MMKV({
  id: 'auth',
});

export const cartStore = new MMKV({
  id: 'cart',
});
