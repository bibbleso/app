//import create from 'zustand/vanilla';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import xAppService from 'src/services/xapp.service'

import { wait } from 'src/lib/helpers/wait';

interface JWTState {
  jwt: string | undefined;
  updateToken: (token: string) => void;
}

interface OttState {
  tokenData: string | undefined;
  wallet: string | undefined;
  fetchTokenData: (ott: string) => Promise<void>;
}


interface TestState {
  color: string | undefined;
  setColor: (color: string) => void;
  reset: () => void;
}

export const useJWT = create<JWTState>()((set) => ({
  jwt: undefined,
  updateToken: (token) => set(() => ({ jwt: token })),
}));

export const useOtt = create<OttState>()((set) => ({
  tokenData: undefined,
  wallet:undefined,
  fetchTokenData: async (ott:any) => {
      let data = new Promise(async (resolve) => {
      let count = 0;
      while (true) {
        try {
          count = ++count;
          if (count > 6) return resolve('');
          let data = await xAppService.getTokenData({ ott: ott });
          console.log(data);
          if (!(data instanceof Error)) {
            set(() => ({ tokenData: data }))
            set(() => ({ wallet: data.account }))
            return resolve('');
          }
          await wait(1500);
        } catch (error) {
          await wait(1500);
        }
      }
    })
}}));

export const useTest = create<TestState>()(
  persist(
  (set) => ({
  color: 'blue',
  setColor:  (color:string) => set(() => ({color:color})),
  reset:  () => set(() => ({color:'blue'})),
  }),
  { name: 'color' }
  )
);

