/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import images from '~/assets/images';
import { Image, PokemonCard } from '~/components';
import {
  pokemonActions,
  selectCanScroll,
  selectIsLoading,
  selectIsScroll,
  selectListPokemons,
  selectTotalPokemons,
} from '../../pokemon.slice';
import styles from './PokemonList.module.scss';

const cx = classNames.bind(styles);

export function PokemonList() {
  const [filter, setFilter] = useState({ offset: 0, limit: 24 });
  const dispatch = useAppDispatch();
  const listPokemons = useAppSelector(selectListPokemons);
  const totalPokemons = useAppSelector(selectTotalPokemons);
  const isLoading = useAppSelector(selectIsLoading);
  const isScroll = useAppSelector(selectIsScroll);
  const canScroll = useAppSelector(selectCanScroll);

  const onLoadMoreClickHandler = () => {
    dispatch(pokemonActions.setCanScroll(true));
  };

  useEffect(() => {
    return () => {
      dispatch(pokemonActions.setCanScroll(false));
    };
  }, []);

  useEffect(() => {
    dispatch(pokemonActions.getListPokemons(filter));
  }, [filter]);

  useEffect(() => {
    if (isScroll) {
      if (totalPokemons > filter.limit && totalPokemons > listPokemons.length) {
        setFilter((prev) => {
          return { ...prev, offset: (prev.offset += 24) };
        });
      }
      dispatch(pokemonActions.setIsScroll(false));
    }
  }, [isScroll]);

  return (
    <div className={cx('wrapper')}>
      <Image className={cx('banner')} src={images.banner} />
      <div className={cx('description')}>
        <p>
          This is the complete list of{' '}
          <strong>
            {listPokemons.length}/{totalPokemons}
          </strong>{' '}
          pokémon.
        </p>
        <p>Click a Pokémon to see its detailed.</p>
      </div>
      <div className={cx('grid')}>
        {listPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {!canScroll && (
        <button className={cx('load-more')} type="button" onClick={onLoadMoreClickHandler}>
          Load more pokémon
        </button>
      )}
      {isLoading && <Image className={cx('loading')} src={images.loading} />}
    </div>
  );
}
