import classNames from 'classnames/bind';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { pokemonActions, selectCanScroll } from '~/features/pokemon/pokemon.slice';
import { Header } from '../header/Header';

import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

export interface ILayoutProps {
  children: any;
}

export function Layout({ children }: ILayoutProps) {
  const dispatch = useAppDispatch();
  const canScroll = useAppSelector(selectCanScroll);
  const [isSticky, setIsSticky] = useState(false);
  const onScrollHandler = (e: any) => {
    if (e.target.scrollTop > 80) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
    if (canScroll && e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      dispatch(pokemonActions.setIsScroll(true));
    }
  };

  return (
    <div className={cx('wrapper')} onScroll={onScrollHandler}>
      <Header className={cx(isSticky ? 'sticky' : '')} />
      <div className={cx('container', 'main-content')}>{children}</div>
    </div>
  );
}
