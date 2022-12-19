import React, { useEffect, useState, useRef } from 'react';

import { Sun } from '../Icons';
import { useStoreContext } from '../../store/context/store';
import style from './index.module.scss';
import themes from './scripts/themes.json';

const ThemeSlider = () => {
  const storeContext = useStoreContext();
  const sliderRef = useRef<any>();
  const [index, setIndex] = useState(themes.indexOf(storeContext.theme[0]));

  const handleThemeChange = (theme: string) => {
    storeContext.theme[1](theme);
    setIndex(themes.indexOf(theme));
  };

  useEffect(() => {
    console.log(index);
    sliderRef.current.scrollLeft = 80 * index;
  }, [index]);

  const slider = () => {
    return themes.map((theme) => (
      <div
        className={`snap-center w-fit h-fit rounded-full outline outline-1 outline-third outline-offset-2`}>
        <div
          onClick={() => handleThemeChange(theme)}
          className={`theme-${theme} bg-first rounded-full ${
            theme === storeContext.theme[0] ? 'w-10 h-10' : 'w-[32px] h-[32px]'
          }`}></div>
      </div>
    ));
  };
  return (
    <div
      ref={sliderRef}
      className={`scroll-smooth will-change-scroll snap-mandatory snap-x w-[100%] overflow-y-hidden overflow-x-scroll border-solid border-t-[0.05em]`}>
      <div
        className={`pl-[50%] flex flex-row justify-start items-center w-[1000px] h-[60px] space-x-[50px]`}>
        {slider()}
      </div>
    </div>
  );
};

export default ThemeSlider;
