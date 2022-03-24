import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se a página contém as informações sobre a Pokédex.', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const title = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(title.textContent).toBe('About Pokédex');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const describe = screen.getAllByText(/pokémons/i);
    expect(describe).toHaveLength(2);
  });

  it('Verifica se a página contém a imagem da Pokédex:', () => {
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
