import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica se é renderizado um card com informações de determinado pokémon', () => {
  renderWithRouter(<App />);
  const pokemon = screen.getByTestId('pokemon-name');
  const type = screen.getByTestId('pokemon-type');
  const weight = screen.getByTestId('pokemon-weight');
  const img = screen.getByAltText('Pikachu sprite');
  expect(pokemon).toHaveTextContent('Pikachu');
  expect(type).toHaveTextContent('Electric');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Verifica se o card do Pokémon indicado na Pokédex contém um link', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  expect(link).toHaveAttribute('href', '/pokemons/25');
});

test('Verifica se ao clicar no link de navegação do Pokémon', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
  const favorite = screen.getByRole('checkbox');
  userEvent.click(favorite);
});

test('Verifica também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  const { history } = renderWithRouter(<App />);
  const button = screen.getByRole('link', { name: /more details/i });
  userEvent.click(button);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('link', { name: /more details/i });
  userEvent.click(button);
  const checkbox = screen.getByRole('checkbox');
  userEvent.dblClick(checkbox);
  expect(checkbox).toBeChecked();

  const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(star).toBeInTheDocument();
  expect(star).toHaveAttribute('src', '/star-icon.svg');
});
