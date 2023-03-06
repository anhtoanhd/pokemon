import { Layout } from '~/components';
import { PokemonBag, PokemonDetail, PokemonList } from '~/features/pokemon/pages';
import { Route } from '~/models';

export const routes = {
  home: '/',
  pokemonList: '/pokemon',
  pokemonDetail: '/pokemon/:name',
  pokemonBag: '/my-bag',
};

// Public routes
export const publicRoutes: Route[] = [
  { path: routes.home, redirectTo: routes.pokemonList },
  { path: routes.pokemonList, title: 'TEXT.LIST_POKEMONS', component: PokemonList, layout: Layout },
  { path: routes.pokemonDetail, title: 'TEXT.DETAIL_POKEMON', component: PokemonDetail, layout: Layout },
  { path: routes.pokemonBag, title: 'TEXT.MY_BAG', component: PokemonBag, layout: Layout },
];
