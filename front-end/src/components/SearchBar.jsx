import React from 'react';

function SearchBar({ onSearch, isLoading }) {
  return (
    <div className="search-bar">
      <button onClick={onSearch} disabled={isLoading}>
        {isLoading ? 'Buscando...' : 'Buscar Farmácias Próximas'}
      </button>
    </div>
  );
}

export default SearchBar;