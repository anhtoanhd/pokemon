import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import { Pokemon, QueryParams } from '~/models';
import { decryptData, encryptData } from '~/services';
import { constants } from '~/constant';

export interface PokemonState {
  isLoading: boolean;
  listPokemons: Pokemon[];
  listOwnPokemons: Pokemon[];
  totalPokemons: number;
  selectedPokemon: Pokemon | undefined;
  message: string;
  canScroll: boolean;
  isScroll: boolean;
}

const initialState: PokemonState = {
  isLoading: false,
  listPokemons: [],
  listOwnPokemons: localStorage.getItem(constants.storageKey) ? JSON.parse(decryptData(localStorage.getItem(constants.storageKey) as string)) : [],
  totalPokemons: 0,
  selectedPokemon: undefined,
  message: '',
  canScroll: false,
  isScroll: false,
};

export const slice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    getListPokemons: (state: PokemonState, action: PayloadAction<QueryParams>) => {
      state.isLoading = true;
    },
    getListPokemonsSuccess: (state: PokemonState, action: PayloadAction<Pokemon[]>) => {
      state.isLoading = false;
      if (state.canScroll) {
        state.listPokemons = [...state.listPokemons, ...action.payload];
      } else {
        state.listPokemons = [...action.payload];
      }
    },
    getDetailPokemon: (state: PokemonState, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    getDetailPokemonSuccess: (state: PokemonState, action: PayloadAction<Pokemon>) => {
      state.isLoading = false;
      state.selectedPokemon = action.payload ? { ...action.payload } : undefined;
    },
    apiFailure: (state: PokemonState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    setTotalPokemons: (state: PokemonState, action: PayloadAction<number>) => {
      state.totalPokemons = action.payload;
    },
    setCanScroll: (state: PokemonState, action: PayloadAction<boolean>) => {
      state.canScroll = action.payload;
    },
    setIsScroll: (state: PokemonState, action: PayloadAction<boolean>) => {
      state.isScroll = action.payload;
    },
    setSelectedPokemon: (state: PokemonState, action: PayloadAction<Pokemon | undefined>) => {
      state.selectedPokemon = action.payload ? { ...action.payload } : undefined;
    },
    setListOwnPokemons: (state: PokemonState, action: PayloadAction<Pokemon[]>) => {
      state.listOwnPokemons = [...action.payload];
      localStorage.setItem(constants.storageKey, encryptData(JSON.stringify(state.listOwnPokemons)));
    },
  },
});

const pokemonReducer = slice.reducer;
export default pokemonReducer;

export const pokemonActions = slice.actions;
export const selectListPokemons = (state: RootState) => state.pokemon.listPokemons;
export const selectListOwnPokemons = (state: RootState) => state.pokemon.listOwnPokemons;
export const selectSelectedPokemon = (state: RootState) => state.pokemon.selectedPokemon;
export const selectPokemonLoading = (state: RootState) => state.pokemon.isLoading;
export const selectTotalPokemons = (state: RootState) => state.pokemon.totalPokemons;
export const selectMessage = (state: RootState) => state.pokemon.message;
export const selectIsLoading = (state: RootState) => state.pokemon.isLoading;
export const selectCanScroll = (state: RootState) => state.pokemon.canScroll;
export const selectIsScroll = (state: RootState) => state.pokemon.isScroll;
