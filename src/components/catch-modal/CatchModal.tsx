import classNames from 'classnames/bind';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { create, InstanceProps } from 'react-modal-promise';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { pokemonActions, selectListOwnPokemons } from '~/features/pokemon/pokemon.slice';
import { Pokemon } from '~/models';
import { Button } from '../button/Button';
import { Image } from '../image/Image';
import styles from './CatchModal.module.scss';

interface ICatchModalProps extends InstanceProps<void, void> {
  isOpen: boolean;
  onResolve: (args: any) => void;
  onReject: (args: any) => void;
  isSuccess: boolean;
  pokemon: Pokemon;
}

const cx = classNames.bind(styles);

const CatchModal = ({ isOpen, onResolve, onReject, isSuccess, pokemon }: ICatchModalProps) => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const listOwnPokemon = useAppSelector(selectListOwnPokemons);
  const onSaveClickHandler = () => {
    const newPokemon: Pokemon = { id: pokemon.id, image: pokemon.sprites?.other['official-artwork']?.front_default, new_name: name };
    const newListOwnPokemon: Pokemon[] = [...listOwnPokemon, newPokemon];
    dispatch(pokemonActions.setListOwnPokemons(newListOwnPokemon));
    onResolve(true);
  };
  return (
    <Modal dialogClassName={cx('modal')} show={isOpen} backdrop={'static'} centered>
      <Modal.Body>
        <h1 className={cx(isSuccess ? 'success' : 'warning')}>{isSuccess ? 'Congratulations' : 'Good luck next time'}</h1>
        <div className={cx('detail')}>
          <div className={cx('image')}>
            <Image src={pokemon.sprites?.other['official-artwork']?.front_default} />
          </div>
          <div className={cx('body')}>
            <div className={cx('top')}>
              <h2 className={cx('name')}>{pokemon.name}</h2>
              <p>
                {pokemon.types?.map((type) => (
                  <span key={type.type?.name} className={cx('type', type.type?.name)}>
                    {type.type.name}
                  </span>
                ))}
              </p>
            </div>
            <div className={cx('bottom')}>
              {isSuccess && <input type="text" placeholder="Enter new name" value={name} onChange={(e) => setName(e.target.value)} />}
              <div className={cx('action')}>
                <Button btnType="outline-secondary" onClick={() => onResolve(false)}>
                  Cancel
                </Button>
                <Button btnType="primary" onClick={onSaveClickHandler} disabled={!(isSuccess && name)}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const catchModal = create(CatchModal);
