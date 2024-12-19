import { useState, useEffect } from "react";


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h1>Pokemones Favoritos</h1>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((pokemon, index) => (
            <li key={index}>
              <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
              <p>{pokemon.name}</p>

            </li>
          ))
        ) : (
          <p>No tienes Pokémon favoritos</p>
        )}
      </ul>
      <a href="javascript:history.back()"> Volver Atrás</a>
    </div>
  );
};

export default Favorites;
