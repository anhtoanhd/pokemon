import { constants } from '~/constant';
import { QueryParams } from '../models';
import { axiosClient } from './axios.client';

export const pokemonApi = {
  getListPokemons(params: QueryParams) {
    return axiosClient.get(constants.apiEndPoint.pokemon, { params });
  },
  fetchData(url: string) {
    return axiosClient.get(url);
  },
};
