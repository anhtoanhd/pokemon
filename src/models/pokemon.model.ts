
export interface Pokemon {
  id?: number;
  name?: string;
  new_name?: string;
  url?: string;
  image?: string;
  number_owned?: number;
  weight?: number;
  height?: number;
  abilities?: any[];
  moves?: any[];
  types?: any[];
  [key: string]: any;
}
