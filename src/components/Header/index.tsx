import React, { useState, useRef, useEffect } from 'react';

import { useStoreContext } from '../../store/context/store';
import { useRouter } from 'next/router';

import { ArrowLeft, Wallet } from '../Icons';

import DropDownButton from '../Button/dropdown';

import Link from 'next/link';

interface Props {
  routes?: any;
  back: boolean;
}

const Header = ({ routes, back }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };
  return (
    <>
      <div
        className={`w-[100%] h-[36px] flex flex-row items-center pt-4 pr-4 pl-4`}>
        <div className={`flex flex-grow`}>
          {back ? (
            <div className={`w-fit h-fit`} onClick={handleBack}>
              <ArrowLeft
                className={`h-6 w-6 flex-no-shrink fill-current stroke-[1.5px]`}
              />
            </div>
          ) : null}
        </div>

        <div>
          <Wallet
            className={`h-6 w-6 flex-no-shrink fill-current stroke-[1.5px]`}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
