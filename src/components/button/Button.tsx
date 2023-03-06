import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface ButtonProps {
  children: any;
  to?: string;
  type?: any;
  btnType: string;
  large: boolean;
  rounded: boolean;
  disabled: boolean;
  className: string;
  onClick: () => void;
  [key: string]: any;
}

const cx = classNames.bind(styles);

export const Button = forwardRef((props: ButtonProps, ref) => {
  const {
    children,
    to,
    type,
    btnType,
    large,
    rounded,
    disabled,
    className,
    onClick,
    ...optionalProps
  } = props;
  let Comp: any = 'button';

  const bProps: any = {
    onClick,
    ...optionalProps,
  };

  if (disabled) {
    Object.keys(bProps).forEach((key) => {
      if (key.startsWith('on') && typeof bProps[key] === 'function') {
        delete bProps[key];
      }
    });
  }

  if (to) {
    bProps.to = to;
    Comp = Link;
  } else {
    bProps.type = type;
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary: btnType === 'primary',
    secondary: btnType === 'secondary',
    'outline-secondary': btnType === 'outline-secondary',
    large,
    rounded,
    disabled,
  });

  return (
    <Comp className={classes} {...bProps} ref={ref}>
      <span className={cx('title')}>{children}</span>
    </Comp>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'button']),
  btnType: PropTypes.oneOf(['primary', 'secondary', 'outline-secondary']),
};

