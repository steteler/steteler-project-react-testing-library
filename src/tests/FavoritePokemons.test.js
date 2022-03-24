import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

test('Verifica se aparece No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);

  const noFavorite = screen.getByText(/No favorite pokemon found/i);
  expect(noFavorite.textContent).toBe('No favorite pokemon found');
  expect(noFavorite).toBeInTheDocument();
});

test('Verifica se é exibido todos os cards de pokémons favoritados', () => {
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: { value: '8.5', measurementUnit: 'kg' },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    },
  ];
  renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const favoritePokemons = screen.getAllByTestId('pokemon-name');
  expect(favoritePokemons).toHaveLength(2);
});
