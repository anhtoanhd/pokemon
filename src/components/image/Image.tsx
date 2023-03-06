import React, { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import images from '~/assets/images';

interface ImageProps {
  src?: string;
  alt?: string;
  className?: string;
  [key: string]: any;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>((props: ImageProps, ref: React.ForwardedRef<HTMLImageElement>) => {
  const { src, alt = '', className, ...extraProps } = props;
  const [fallback, setFallback] = useState('');

  useEffect(() => {
    let placeholder: any = null;
    if (!src || src === 'null') {
      placeholder = images.noImage;
    }
    setFallback(placeholder);
  }, [src]);

  return <img ref={ref} className={classNames(styles.wrapper, className)} src={fallback || src} alt={alt} {...extraProps} />;
});
