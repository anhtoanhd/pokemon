export interface ListResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface PokemonResponse {
  id?: number;
  name?: string;
  weight?: number;
  height?: number;
  abilities?: any[];
  moves?: any[];
  types?: any[];
  [key: string]: any;
}

export interface CommonResponse {
  [key: string]: any;
}