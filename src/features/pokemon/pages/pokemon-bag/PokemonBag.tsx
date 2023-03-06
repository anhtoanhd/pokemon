import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/app/hooks';
import images from '~/assets/images';
import { Image, PokemonCard } from '~/components';
import { selectListOwnPokemons } from '../../pokemon.slice';
import styles from './PokemonBag.module.scss';

const cx = classNames.bind(styles);

export interface IPokemonBagProps {}

export function PokemonBag(props: IPokemonBagProps) {
  const navigate = useNavigate();
  const listOwnPokemons = useAppSelector(selectListOwnPokemons);
  const onBackClickHandler = () => {
    navigate(-1);
  }
  return (
    <div className={cx('wrapper')}>
      <Image className="back" src={images.back} onClick={onBackClickHandler}/>
      <h1 className={cx('page-title')}>My bag</h1>
      <div className={cx('description')}>
        <p>
          There {listOwnPokemons.length <=1 ? 'is' : 'are'} <strong>{listOwnPokemons.length}</strong> pokémon in bag.
        </p>
      </div>
      <div className={cx('grid')}>
        {listOwnPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} is_bag />
        ))}
      </div>
    </div>
  );
}
