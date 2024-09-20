import api from './Service';
import {authStore} from '../database/Store';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (loginRequest: LoginRequest) => {
  try {
    const {data} = await api.post<LoginResponse>('/auth/login', loginRequest);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    authStore.set('token', data.token);
  } catch (error) {
    authStore.delete('token');
    throw error;
  }
};

export const logout = async () => {
  try {
    authStore.delete('token');
  } catch (error) {
    throw error;
  }
};
