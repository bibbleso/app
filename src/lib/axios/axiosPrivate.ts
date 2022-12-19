import axios from 'axios';
import { memoizedRefreshToken } from './refreshToken';
import { useJWT } from '../../store/zustand';

const axiosPrivate = (store: any, redirect: boolean) => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  axios.defaults.baseURL = origin + '/api';

  axios.interceptors.request.use(
    async (config) => {
      if (store.jwt) {
        useJWT.getState().updateToken(store.jwt);
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${useJWT.getState().jwt}`,
        };
      }

      return config;
    },
    (error) => {
      if (redirect) store.router('/landing');
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      try {
        let config = error.config;

        if (error?.response?.status === 401 && !config.sent) {
          config.sent = true;
          const result = await memoizedRefreshToken(store, redirect);
          delete config.headers.authorization;

          if (result?.accessToken) {
            config.headers = {
              ...config.headers,
              authorization: `Bearer ${result.accessToken}`,
            };
          }

          return axios(config);
        }

        return Promise.reject(error);
      } catch (error: any) {
        return Promise.reject(error);
      }
    }
  );

  return axios;
};

export { axiosPrivate };
