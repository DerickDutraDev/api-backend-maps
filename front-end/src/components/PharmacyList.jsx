import React from 'react';

function PharmacyList({ pharmacies, onShowMore }) {
  if (pharmacies.length === 0) {
    return <p>Nenhuma farmácia encontrada.</p>;
  }

  return (
    <ul className="pharmacy-list">
      {pharmacies.map((pharmacy) => (
        <li key={pharmacy.place_id} className="pharmacy-item">
          <h3>{pharmacy.name}</h3>
          <p>{pharmacy.address}</p>
          <p className={`pharmacy-status ${pharmacy.open_now ? 'open' : 'closed'}`}>
            {pharmacy.open_now ? 'Aberto agora' : 'Fechado agora'}
          </p>
          <button 
            className="show-more-btn"
            onClick={() => onShowMore(pharmacy.place_id)}
          >
            Exibir Mais
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PharmacyList;