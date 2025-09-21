// src/App.jsx
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import PharmacyList from './components/PharmacyList';
import PharmacyDetails from './components/PharmacyDetails'; 
import './App.css';

function App() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPharmacyDetails, setSelectedPharmacyDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setPharmacies([]);
    setSelectedPharmacyDetails(null); 

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(`/api/pharmacies?lat=${latitude}&lng=${longitude}`);
            if (!response.ok) throw new Error('Erro na resposta do servidor.');
            const data = await response.json();
            setPharmacies(data);
            setLoading(false);
          } catch (apiError) {
            console.error('Erro na requisição da API:', apiError);
            setLoading(false);
            setError('Ocorreu um erro ao buscar as farmácias. Tente novamente.');
          }
        },
        (geoError) => {
          console.error('Erro na geolocalização:', geoError);
          setLoading(false);
          setError('Não foi possível obter sua localização. Por favor, habilite a geolocalização.');
        }
      );
    } else {
      setLoading(false);
      setError('Seu navegador não suporta geolocalização.');
    }
  };


  const handleShowMore = async (placeId) => {
    setDetailsLoading(true);
    setSelectedPharmacyDetails(null);

    try {
      const response = await fetch(`/api/pharmacy-details?placeId=${placeId}`);
      if (!response.ok) throw new Error('Erro ao buscar detalhes da farmácia.');
      const data = await response.json();
      setSelectedPharmacyDetails(data);
      setDetailsLoading(false);
    } catch (apiError) {
      console.error('Erro ao buscar detalhes:', apiError);
      setDetailsLoading(false);
      setError('Erro ao carregar os detalhes da farmácia.');
    }
  };

  return (
    <div className="app-container">
      <h1>Encontre Farmácias Próximas</h1>
      <SearchBar isLoading={loading || detailsLoading} onSearch={handleSearch} />
      <div className="results-container">
        {(loading || detailsLoading) && <p>Buscando...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && pharmacies.length > 0 && (
          <PharmacyList pharmacies={pharmacies} onShowMore={handleShowMore} />
        )}
        {!loading && !error && pharmacies.length === 0 && (
          <p>Nenhuma farmácia encontrada. Clique em "Buscar Farmácias Próximas".</p>
        )}
      </div>

      <PharmacyDetails
        details={selectedPharmacyDetails}
        onClose={() => setSelectedPharmacyDetails(null)}
      />
    </div>
  );
}

export default App;