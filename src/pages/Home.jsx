import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return { name: details.name, image: details.sprites.front_default };
          })
        );

        setPokemons(pokemonDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPokemons();
    
    // Obtener favoritos de localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (pokemon) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex(fav => fav.name === pokemon.name);

    if (index !== -1) {
      // Eliminar de favoritos
      updatedFavorites.splice(index, 1);
    } else {
      // Agregar a favoritos
      updatedFavorites.push(pokemon);
    }

    setFavorites(updatedFavorites);

    // Guardar los favoritos en localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Pokemones Curso React</h1>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => {
          const isFavorite = favorites.some(fav => fav.name === pokemon.name);
          
          return (
            <li key={pokemon.name} className="pokemon-item">
              <Link to={`/detail/${pokemon.name}`}>
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                <p>{pokemon.name}</p>
              </Link>
              <button 
                onClick={() => toggleFavorite(pokemon)}
                className="favorite-button"
              >
                {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
              </button>
            </li>
          );
        })}
      </ul>
        <br />
      <Link to="/favorites">
        <button className="favorite-button">Ir a favoritos</button>
      </Link>
      <br />
      <br />
      <br />

      <footer> Derechos a <strong>Andres Mena</strong></footer>
    </div>
  );
};

export default Home;
