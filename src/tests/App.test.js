import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica se o primeiro link contem o texto Home', () => {
  const { history } = renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: /home/i });
  expect(home).toBeInTheDocument();
  userEvent.click(home);
  expect(history.location.pathname).toBe('/');
});

test('Verifica se o segundo link contem o texto About', () => {
  const { history } = renderWithRouter(<App />);
  const about = screen.getByRole('link', { name: /about/i });
  expect(about).toBeInTheDocument();
  userEvent.click(about);
  expect(history.location.pathname).toBe('/about');
});

test('Verifica se o terceiro link contem o texto Favorite Pokémons', () => {
  const { history } = renderWithRouter(<App />);
  const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(favorites).toBeInTheDocument();
  userEvent.click(favorites);
  expect(history.location.pathname).toBe('/favorites');
});

test('Verifica se ao entrar em uma url desconhecida aparece a página Not Found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/url-desconhecida');
  const notFound = screen.getByRole('heading', {
    level: 2, name: /page requested not found/i,
  });
  expect(notFound).toBeInTheDocument();
});
