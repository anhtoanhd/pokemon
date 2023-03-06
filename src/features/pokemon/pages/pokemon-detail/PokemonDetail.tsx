/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import images from '~/assets/images';
import { Button, Image } from '~/components';
import { catchModal } from '~/components/catch-modal/CatchModal';
import { routes } from '~/configs';
import { Pokemon } from '~/models';
import { pokemonActions, selectIsLoading, selectSelectedPokemon } from '../../pokemon.slice';
import styles from './PokemonDetail.module.scss';

const cx = classNames.bind(styles);

export function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedPokemon = useAppSelector(selectSelectedPokemon) as Pokemon;
  const isLoading = useAppSelector(selectIsLoading);

  const onBackClickHandler = () => {
    navigate(-1);
  }

  const onCatchClickHandler = () => {
    if (Math.random() < 0.5) {
      catchModal({ isSuccess: true, pokemon: selectedPokemon }).then((result) => {
        if (result) {
          navigate(routes.home);
        }
      });
    } else {
      catchModal({ isSuccess: false, pokemon: selectedPokemon }).then();
    }
  };

  useEffect(() => {
    dispatch(pokemonActions.getDetailPokemon(String(name)));
    return () => {
      dispatch(pokemonActions.setSelectedPokemon(undefined));
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      {isLoading ? (
        <div className={cx('loading')}>
          <Image src={images.loading} />
        </div>
      ) : (
        <>
          <h1 className={cx('page-title')}>{selectedPokemon?.name}</h1>
          <Image className="back" src={images.back} onClick={onBackClickHandler}/>
          <div className={cx('body')}>
            <div className={cx('image')}>
              <Image src={selectedPokemon?.sprites.other['official-artwork'].front_default} />
            </div>
            <div className={cx('detail')}>
              <h2>Detail</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Height</td>
                    <td>{selectedPokemon?.height}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{selectedPokemon?.weight}</td>
                  </tr>
                  <tr>
                    <td>Types</td>
                    <td>
                      {selectedPokemon?.types?.map((type) => (
                        <span key={type.type.name} className={cx('type', type.type.name)}>
                          {type.type.name}
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button btnType="primary" onClick={onCatchClickHandler}>
                Catch
              </Button>
            </div>
          </div>

          <div className={cx('other')}>
            <h2>Abilities</h2>
            <table>
              <thead>
                <tr>
                  <th className={cx('name')}>Name</th>
                  <th className={cx('short_effect')}>Short effect</th>
                  <th className={cx('effect')}>Effect</th>
                </tr>
              </thead>
              <tbody>
                {selectedPokemon?.abilities?.map((ability) => (
                  <tr key={ability.ability.id}>
                    <td className={cx('name')}>{ability.ability.name}</td>
                    <td className={cx('short_effect')}>{ability.ability.short_effect}</td>
                    <td className={cx('effect')}>{ability.ability.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={cx('other')}>
            <h2>Moves</h2>
            <table>
              <thead>
                <tr>
                  <th className={cx('name')}>Name</th>
                  <th className={cx('short_effect')}>Short effect</th>
                  <th className={cx('effect')}>Effect</th>
                </tr>
              </thead>
              <tbody>
                {selectedPokemon?.moves?.map((move) => (
                  <tr key={move.move.id}>
                    <td className={cx('name')}>{move.move.name}</td>
                    <td className={cx('short_effect')}>{move.move.short_effect}</td>
                    <td className={cx('effect')}>{move.move.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
