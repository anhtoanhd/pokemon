import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useAppSelector } from '~/app/hooks';
import images from '~/assets/images';
import { selectListOwnPokemons } from '~/features/pokemon/pokemon.slice';
import { Image } from '../image/Image';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

export interface IHeaderProps {
  className: string;
}

export function Header({ className }: IHeaderProps) {
  const listOwnPokemons = useAppSelector(selectListOwnPokemons);
  const classes = cx('wrapper', {
    [className]: className,
  });
  return (
    <div className={classes}>
      <div className={cx('container', 'header-container')}>
        <Link to="/" className={cx('logo')}>
          <Image src={images.header} />
        </Link>
        <Link to="/my-bag" className={cx('badge')}>
          <i className="fa fa-light fa-backpack"></i>
          <span>{listOwnPokemons.length}</span>
        </Link>
      </div>
    </div>
  );
}
