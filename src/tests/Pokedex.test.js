import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

test('Verifica se página contém um h2 com o texto Encountered pokémons', () => {
  const h2 = screen.getByRole('heading', { level: 2, name: /encountered pokémons/i });
  expect(h2).toHaveTextContent('Encountered pokémons');
  expect(h2).toBeInTheDocument();
});

test('O botão deve conter o texto Próximo pokémon', () => {
  const nextButton = screen.getByTestId('next-pokemon');
  expect(nextButton).toHaveTextContent('Próximo pokémon');
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const pokemon = screen.getAllByTestId('pokemon-name');
  expect(pokemon).toHaveLength(1);
});

test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
  const types = 7;
  const buttonType = screen.getAllByTestId('pokemon-type-button');
  expect(buttonType).toHaveLength(types);
});

test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
  const buttonType = screen.getByRole('button', { name: /electric/i });
  const pType = screen.getByTestId('pokemon-type');
  expect(buttonType).toHaveTextContent('Electric');
  expect(pType).toHaveTextContent('Electric');
});

test('O botão All precisa estar sempre visível.', () => {
  const buttonAll = screen.getByRole('button', { name: /all/i });
  expect(buttonAll).toBeVisible();
});

test('O texto do botão deve ser All', () => {
  const buttonAll = screen.getByRole('button', { name: /all/i });
  expect(buttonAll).toBeInTheDocument();
  userEvent.click(buttonAll);
});

test('A Pokedéx deverá mostrar os Pokémons sem filtros ao clicar no botão All.', () => {
  const buttonType = screen.getByRole('button', { name: /all/i });
  const pokemon = screen.getByTestId('pokemon-type');
  expect(pokemon).toHaveTextContent('Electric');
  expect(buttonType).toHaveTextContent('All');
});

test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
  const buttonAll = screen.getByRole('button', { name: /all/i });
  const nextButton = screen.getByTestId('next-pokemon');
  const pokemon = screen.getByTestId('pokemon-name');
  expect(buttonAll).toHaveTextContent('All');
  expect(pokemon).toHaveTextContent('Pikachu');
  userEvent.click(nextButton);
  expect(pokemon).toHaveTextContent('Charmander');
});
