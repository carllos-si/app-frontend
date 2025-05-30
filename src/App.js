import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Usa a variável de ambiente
const API_URL = process.env.REACT_APP_API_URL || 'https://app-backend-zj8i.onrender.com';

export default function App() {
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      const res = await axios.get(`${API_URL}/api/ofertas`);
      setOffers(res.data);
    } catch (error) {
      alert('Erro ao carregar ofertas');
    }
  }

  async function createOffer(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/ofertas`, { title, description, price });
      setTitle('');
      setDescription('');
      setPrice('');
      fetchOffers();
    } catch (error) {
      alert('Erro ao criar oferta');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Ofertas</h1>
      <form onSubmit={createOffer}>
        <input
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br />
        <input
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        /><br />
        <input
          placeholder="Preço"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        /><br />
        <button type="submit">Cadastrar Oferta</button>
      </form>

      <hr />

      <ul>
        {offers.map(offer => (
          <li key={offer._id}>
            <strong>{offer.title}</strong> - {offer.description} - R$ {offer.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
