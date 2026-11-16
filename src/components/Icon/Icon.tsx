import * as React from 'react';
import { IconProps } from './types';

export const Icon = (props: IconProps) => {
  const { icon, className, ...rest } = props;
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  const IconComponent = typeof icon === 'object' && icon !== null && 'default' in icon ? (icon as any).default : icon;
  if (typeof IconComponent === 'function' || (typeof IconComponent === 'object' && IconComponent !== null && ('$$typeof' in IconComponent || 'render' in IconComponent))) {
    return React.createElement(IconComponent as any, { className, ...rest });
  }
  return null;
};
