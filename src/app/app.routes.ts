import { Routes } from '@angular/router';
import { Pokemon } from './pokemon/pokemon';
import { JobDashboard } from './job-dashboard/job-dashboard';
import { PokemonBoard } from './pokemon/pokemon-board';
import { PokemonRandom } from './pokemon/pokemon-random';
import { PokemonContainer } from './pokemon/pokemon-container';

export const routes: Routes = [
  {
    path: 'job',
    component: JobDashboard,
    title: 'Hacker News Jobs Board',
  },
  {
    path: 'pokemon',
    component: PokemonContainer,
    title: 'Pokémon',
    children: [
      {
        path: 'random',
        component: PokemonRandom,
      },
      {
        path: ':nameOrId',
        component: Pokemon,
      },
      {
        path: '**',
        component: PokemonBoard,
      },
    ],
  },
];
