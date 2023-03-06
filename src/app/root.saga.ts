import { all } from 'redux-saga/effects';
import pokemonSaga from '~/features/pokemon/pokemon.saga';

export default function* rootSaga() {
  yield all([pokemonSaga()]);
}
