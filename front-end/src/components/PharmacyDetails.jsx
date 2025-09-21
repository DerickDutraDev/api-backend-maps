import React from 'react';

function PharmacyDetails({ details, onClose }) {
  if (!details) {
    return null;
  }

  return (
    <div className="pharmacy-details-container">
      <div className="pharmacy-details-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h3>{details.name}</h3>
        <p><strong>Endereço:</strong> {details.formatted_address}</p>
        {details.formatted_phone_number && (
          <p><strong>Telefone:</strong> {details.formatted_phone_number}</p>
        )}
        {details.website && (
          <p><strong>Website:</strong> <a href={details.website} target="_blank" rel="noopener noreferrer">{details.website}</a></p>
        )}
        {details.opening_hours && (
          <div>
            <strong>Horário de Funcionamento:</strong>
            <ul>
              {details.opening_hours.weekday_text.map((day, index) => (
                <li key={index}>{day}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PharmacyDetails;