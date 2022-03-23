import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica se o primeiro link contem o texto Home', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const linkHome = getByRole('link', { name: /home/i });
  expect(linkHome).toBeInTheDocument();
  userEvent.click(linkHome);
  expect(history.location.pathname).toBe('/');
});

test('Verifica se o segundo link contem o texto About', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const linkAbout = getByRole('link', { name: /About/i });
  expect(linkAbout).toBeInTheDocument();
  userEvent.click(linkAbout);
  expect(history.location.pathname).toBe('/about');
});

test('Verifica se o terceiro link contem o texto Favorite Pokémons', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const linkFavorites = getByRole('link', { name: /Favorite Pokémons/i });
  expect(linkFavorites).toBeInTheDocument();
  userEvent.click(linkFavorites);
  expect(history.location.pathname).toBe('/favorites');
});

test('Verifica se ao entrar em uma url desconhecida aparece a página Not Found', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/url-desconhecida');
  const notFound = getByRole('heading', { level: 2, name: /Page requested not found/i });
  expect(notFound).toBeInTheDocument();
});
