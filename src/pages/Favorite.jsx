import { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="home-container">
      <h1 className="detail-title">Pokémones Favoritos</h1>

      {favorites.length > 0 ? (
        <ul className="pokemon-list">
          {favorites.map((pokemon, index) => (
            <li key={index} className="pokemon-card">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-img"
              />
              <p style={{ fontWeight: "600", textTransform: "capitalize" }}>
                {pokemon.name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="error-message">No tenés Pokémon favoritos</p>
      )}

      <a href="javascript:history.back()" className="back-button">
        Volver atrás
      </a>
    </div>
  );
};

export default Favorites;
