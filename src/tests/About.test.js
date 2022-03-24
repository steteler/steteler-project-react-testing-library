import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se a página contém as informações sobre a Pokédex.', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const h2 = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(h2).toHaveTextContent('About Pokédex');
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const p = screen.getAllByText(/pokémons/i);
    expect(p).toHaveLength(2);
  });

  it('Verifica se a página contém a imagem da Pokédex:', () => {
    const img = screen.getByAltText(/pokédex/i);
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toBeInTheDocument();
  });
});
