import React, { useState, useRef, useEffect } from 'react';
import style from './index.module.scss';
import { categories } from './categories';
import Link from 'next/link';
import Title from 'src/components/Assets/images/png/checksum/checksum_title_purple.png';
import Logo from 'src/components/Assets/images/png/checksum/logo_purple.png';
import Image from 'next/image';
import LogoGapped from 'src/components/Assets/images/svg/checksum/logo_white_final.svg';
import LogoTitle from 'src/components/Assets/images/svg/checksum/title_white_final.svg';

import { axiosPublic } from '@/lib/axios/axiosPublic';
import { axiosPrivate } from '@/lib/axios/axiosPrivate';

import { useStoreContext } from '../../store/context/store';

interface Props {
  page: any;
}

const Nav = ({ page }: Props) => {
  const hamRef = useRef<HTMLDivElement>(null);
  const storeContext = useStoreContext();
  const [user, setUser] = useState<undefined | string>(undefined);

  const handleCollapse = () =>
    storeContext.collapse[1](!storeContext.collapse[0]);

  const getUser = async () => {
    let response = await axiosPrivate(storeContext, true).get('/users/ping');
    console.log(response);
    setUser(storeContext.user?.username);
  };

  useEffect(() => {
    if (!storeContext.user?.username) getUser();
    setUser(storeContext.user?.username);
  });

  const navItem = (cat: any, i: number) => {
    if (cat.category === 'user') {
      return (
        <div
          key={i}
          className={`${style.item} ${
            `/dashboard${cat.route}` === page ? style.active : null
          }`}>
          <Link href={`/dashboard${cat.route}`}>
            <div className={style.category}>
              <div className={`${style.icon} ${style.thumbnail}`}>
                <cat.icon
                  strokeWidth={cat.iconProps.strokeWidth}
                  height={cat.iconProps.height}
                  width={cat.iconProps.width}
                />
              </div>
              {storeContext.collapse[0] ? null : (
                <div className={style.text}>
                  {user ? user.toUpperCase() : null}
                </div>
              )}
            </div>
          </Link>
        </div>
      );
    }

    if (cat.category === 'collapse') {
      return (
        <div
          key={i}
          className={`${style.item} ${
            `/dashboard${cat.route}` === page ? style.active : null
          }`}>
          <div className={style.category} onClick={handleCollapse}>
            <div
              className={`${style.icon} ${
                storeContext.collapse[0] ? style.rotate : null
              }`}>
              <cat.icon
                strokeWidth={cat.iconProps.strokeWidth}
                height={cat.iconProps.height}
                width={cat.iconProps.width}
              />
            </div>
            {storeContext.collapse[0] ? null : (
              <div className={style.text}>{cat.category.toUpperCase()}</div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div
        key={i}
        className={`${style.item} ${
          `/dashboard${cat.route}` === page ? style.active : null
        }`}>
        <Link href={`/dashboard${cat.route}`}>
          <div className={style.category}>
            <div className={style.icon}>
              <cat.icon
                strokeWidth={cat.iconProps.strokeWidth}
                height={cat.iconProps.height}
                width={cat.iconProps.width}
              />
            </div>
            {storeContext.collapse[0] ? null : (
              <div className={style.text}>{cat.category.toUpperCase()}</div>
            )}
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className={style.header}></div>

      <div className={style.panel}>
        <div className={style.bgHeader}></div>
        <Link href="/dashboard">
          <div className={style.logoHeader}>
            <div className={style.logo}>
              <LogoGapped width={'100%'} height={'100%'} fill={'white'} />
            </div>
            {storeContext.collapse[0] ? null : (
              <div className={style.title}>
                <LogoTitle width={'100%'} height={'100%'} fill={'white'} />
              </div>
            )}
          </div>
        </Link>
        <div className={style.primary}>
          <div className={style.items}>
            {categories.primary.map((cat: any, i: number) => navItem(cat, i))}
          </div>
        </div>

        <div className={style.divider}></div>

        <div className={style.secondary}>
          <div className={style.items}>
            {categories.secondary.map((cat: any, i: number) => navItem(cat, i))}
          </div>
        </div>

        <div className={style.bottom}>
          <div className={style.items}>
            {categories.bottom.map((cat: any, i: number) => navItem(cat, i))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
