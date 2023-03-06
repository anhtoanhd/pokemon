import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { alertModal, Image } from '~/components';
import { pokemonActions, selectListOwnPokemons } from '~/features/pokemon/pokemon.slice';
import { ModalOptions, Pokemon } from '~/models';
import styles from './PokemonCard.module.scss';

const cx = classNames.bind(styles);

export interface IPokemonCardProps {
  pokemon: Pokemon;
  is_bag?: boolean;
}

export function PokemonCard({ pokemon, is_bag }: IPokemonCardProps) {
  const dispatch = useAppDispatch();
  const listOwnPokemons = useAppSelector(selectListOwnPokemons);
  let Comp: any = '';
  if (is_bag) {
    Comp = 'div';
  } else {
    Comp = Link;
  }
  const onReleaseClickHandler = () => {
    const options: ModalOptions = {
      type: 'warning',
      title: 'Warning',
      content: 'Are you sure to release this pokémon?',
    };
    alertModal({ options }).then((result) => {
      if (result) {
        const newList = listOwnPokemons.filter((poke) => poke.id !== pokemon.id);
        dispatch(pokemonActions.setListOwnPokemons(newList));
      }
    });
  };
  return (
    <Comp to={'/pokemon/' + pokemon.name} className={cx('wrapper')}>
      <div className={cx('image')}>
        <Image src={pokemon.image} />
      </div>
      <p className={cx('name')}>{is_bag ? pokemon.new_name : pokemon.name}</p>
      {is_bag && (
        <span className={cx('release')} onClick={onReleaseClickHandler}>
          Release
        </span>
      )}
    </Comp>
  );
}
