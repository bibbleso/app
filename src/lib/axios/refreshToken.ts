import mem from 'mem';
import { useJWT } from '../../store/zustand';

import { axiosPublic } from './axiosPublic';

export const refreshTokenFn = async (store: any, redirect: boolean) => {
  try {
    const response = await axiosPublic.post(
      '/users/refresh-token',
      {},
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.data.jwtToken) {
      if (redirect) store.router('/landing');
      throw 'token not found';
    }

    useJWT.getState().updateToken(response.data.jwtToken);
    store.setJwt(response.data.jwtToken);
    store.setUser(response.data);

    return { accessToken: response.data.jwtToken };
  } catch (error) {
    if (redirect) store.router('/landing');
    throw error;
  }
};

const maxAge = 15000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
