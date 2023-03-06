import { CommonResponse } from './../../models/response.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { pokemonApi } from '~/api';
import { ListResponse, QueryParams, Pokemon, BaseModel, PokemonResponse } from '~/models';
import { pokemonActions } from './pokemon.slice';
import { getIdFromUrl } from '~/services';
import { constants } from '~/constant';

function* watchGetListPokemons(action: PayloadAction<QueryParams>) {
  try {
    const response: ListResponse<BaseModel> = yield call(pokemonApi.getListPokemons, action.payload);
    const arr: Pokemon[] = [];
    response.results.forEach((pokemon) => {
      const poke: Pokemon = { ...pokemon };
      poke.id = Number(getIdFromUrl(pokemon.url));
      poke.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`;
      arr.push(poke);
    });
    yield put(pokemonActions.setTotalPokemons(response.count));
    yield put(pokemonActions.getListPokemonsSuccess(arr));
  } catch (error) {
    console.log('Get list pokemons failed', error);
    yield put(pokemonActions.apiFailure('Lỗi hệ thống!'));
  }
}

function* watchGetDetailPokemon(action: PayloadAction<string>) {
  try {
    const response: PokemonResponse = yield call(pokemonApi.fetchData, `${constants.apiEndPoint.pokemon}/${action.payload}`);
    if (response.abilities) {
      for (let ability of response.abilities) {
        const res: CommonResponse = yield call(pokemonApi.fetchData, ability.ability.url);
        const name = res.names.find((n: any) => n.language.name === 'en')?.name;
        const effect = res.effect_entries.find((n: any) => n.language.name === 'en');
        ability.ability.id = res.id;
        ability.ability.name = name;
        ability.ability.effect = effect?.effect;
        ability.ability.short_effect = effect?.short_effect;
      }
    }
    if (response.moves) {
      for (let move of response.moves) {
        const res: CommonResponse = yield call(pokemonApi.fetchData, move.move.url);
        const name = res.names.find((n: any) => n.language.name === 'en')?.name;
        const effect = res.effect_entries.find((n: any) => n.language.name === 'en');

        move.move.id = res.id;
        move.move.name = name;
        move.move.effect = effect?.effect;
        move.move.short_effect = effect?.short_effect;
      }
    }
    yield put(pokemonActions.getDetailPokemonSuccess(response));
  } catch (error) {
    console.log('Get detail pokemon failed', error);
    yield put(pokemonActions.apiFailure('Lỗi hệ thống!'));
  }
}

export default function* pokemonSaga() {
  yield takeLatest(pokemonActions.getListPokemons.type, watchGetListPokemons);
  yield takeLatest(pokemonActions.getDetailPokemon.type, watchGetDetailPokemon);
}
