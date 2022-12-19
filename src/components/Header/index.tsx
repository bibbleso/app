import React, { useState, useRef, useEffect } from 'react';

import style from './index.module.scss';

import { useStoreContext } from '../../store/context/store';
import { useRouter } from 'next/router';

import {
  Plus,
  MenuDotsVertical,
  AngleSmallRight,
  Arrowright,
  Magnifyingglass,
  Bell,
  Bellsimple,
} from '../Icons';

import DropDownButton from '../Button/dropdown';

import Link from 'next/link';

interface Props {
  routes?: any;
}

const Header = ({ routes }: Props) => {
  const router = useRouter();
  const storeContext = useStoreContext();

  const [theme, setTheme] = useState('');

  const parseRoute = () => {
    let parse = router.pathname.split('/').map((route: string) => {
      if (routes.indexOf(route) > -1) return;
      return route;
    });
    console.log(parse);
  };

  return (
    <>
      <div className={`${style.header}`}>
        <div className={style.headerLeft}>
          <div className={style.logoContainer}>
            <Arrowright size={16} fill={'#6e30d7ff'} />
          </div>
          {router.pathname.split('/').map((path: string, i: number) => {
            if (!path) return;
            return (
              <div className={style.routeContainer} key={i}>
                <div>{path.toUpperCase()}</div>
                {i !== router.pathname.split('/').length - 1 ? (
                  <div className={style.carat}>
                    <AngleSmallRight fill={'#6e30d7ff'} size={12} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={`${style.headerCenter} ${theme ? style[theme] : null}`}>
          {routes
            ? routes.map((cat: any, i: number) => (
                <Link key={i} href={`${router.pathname}${cat.route}`}>
                  <div>{cat.category.toUpperCase()}</div>
                </Link>
              ))
            : null}
        </div>

        <div className={style.headerRight}>
          <div className={style.iconContainer}>
            <Bellsimple
              size={22}
              stroke={'#6e30d7ff'}
              strokeWidth={2.5}
              fill={'#6e30d7ff'}
            />
          </div>
          <div className={style.iconContainer}>
            <Magnifyingglass
              size={22}
              stroke={'#6e30d7ff'}
              strokeWidth={2.75}
              fill={'#6e30d7ff'}
            />
          </div>
          <DropDownButton
            className={style.button}
            type="dropdown"
            theme="light"
            height={28}
            width={100}
            onClick={() => console.log('clicked')}>
            <div className={style.buttonIcon}>
              <Plus fill={'white'} size={10} />
            </div>
            <div className={style.buttonText}>CREATE</div>
          </DropDownButton>
          <div className={style.menuContainer}>
            <MenuDotsVertical size={18} fill={'#6e30d7ff'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
