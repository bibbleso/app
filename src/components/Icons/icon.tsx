import React, { LegacyRef } from 'react';
import iconMap from './svg/icon-map';

interface Props {
  ref?: LegacyRef<SVGSVGElement>;
  name: string;
  size?: string | number;
  style?: any;
  color?: string;
  height?: string;
  width?: string;
  hoverColor?: string;
  className?: string;
}

const Icon = ({
  ref,
  name,
  size,
  style,
  color,
  height,
  width,
  hoverColor,
  className,
  ...rest
}: Props) => {
  const Icon = iconMap[name];

  return (
    <Icon
      ref={ref}
      className={`fill-first stroke-first ${className}`}
      {...rest}
    />
  );
};

Icon.defaultProps = {
  size: '5em',
  color: 'black',
};

export default Icon;
