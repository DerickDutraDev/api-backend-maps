const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

/**
 * Buscar farmácias próximas
 */
app.get('/api/pharmacies', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude e longitude são obrigatórios.' });
  }

  try {
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=pharmacy&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    const response = await axios.get(googleApiUrl);
    const pharmacies = response.data.results || [];

    const simplifiedPharmacies = pharmacies.map(place => ({
      place_id: place.place_id,
      name: place.name,
      address: place.vicinity,
      location: place.geometry?.location || null,
      rating: place.rating || null,
      open_now: place.opening_hours ? place.opening_hours.open_now : null,
    }));

    res.json(simplifiedPharmacies);

  } catch (error) {
    console.error('Erro ao buscar farmácias:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar farmácias.' });
  }
});

/**
 * Buscar detalhes de uma farmácia
 */
app.get('/api/pharmacy-details', async (req, res) => {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: 'ID do local é obrigatório.' });
  }

  try {
    const detailsApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    const response = await axios.get(detailsApiUrl);
    const placeDetails = response.data.result;

    if (!placeDetails) {
      return res.status(404).json({ error: 'Detalhes não encontrados para esse Place ID.' });
    }

    const simplifiedDetails = {
      name: placeDetails.name || null,
      address: placeDetails.formatted_address || null,
      phone: placeDetails.formatted_phone_number || null,
      website: placeDetails.website || null,
      opening_hours: placeDetails.opening_hours?.weekday_text || null
    };

    res.json(simplifiedDetails);

  } catch (error) {
    console.error('Erro ao buscar detalhes:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar detalhes da farmácia.' });
  }
});

module.exports = app;
