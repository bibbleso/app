import React, { useEffect, useState } from 'react';

import { Sun } from '../Icons';
import { useStoreContext } from '../../store/context/store';
import style from './index.module.scss';

const ThemeToggle = () => {
  const storeContext = useStoreContext();

  const [theme, setTheme] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(storeContext.theme[0]);
    }
  }, [storeContext.theme[0]]);

  const handleThemeChange = () => {
    if (storeContext.theme[0] == 'default') storeContext.theme[1]('red');
    if (storeContext.theme[0] == 'red') storeContext.theme[1]('default');
  };

  return (
    <div onClick={handleThemeChange} className={style.toggle}>
      <Sun size={18} />
    </div>
  );
};

export default ThemeToggle;
