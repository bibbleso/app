import React, {
  PropsWithChildren,
  ReactComponentElement,
  useEffect,
  useState,
} from 'react';
import styles from './index.module.scss';

import Title from '../Assets/images/svg/thebettermint/boilerplate.svg';
import LinkLogo from '../Assets/images/png/thebettermint/horizontal.png';

import Image from 'next/image';

import { Discord, Facebook, Twitter, Github, Telegram } from '../Icons';

import { useStoreContext } from '../../store/context/store';

const Footer = (props: PropsWithChildren) => {
  const storeContext = useStoreContext();

  const [theme, setTheme] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(storeContext.theme[0]);
    }
  }, [storeContext.theme[0]]);

  return (
    <div
      className={`shrink-0 scroll-smooth will-change-scroll snap-mandatory snap-x w-[100%] overflow-y-hidden overflow-x-scroll border-solid border-third border-t-[0.062rem] no-scrollbar min-h-[60px]`}>
      {props.children}
    </div>
  );
};

export default Footer;
