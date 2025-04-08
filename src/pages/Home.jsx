import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // ------------------- Funciones -------------------

  const fetchPokemonList = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      if (!res.ok) throw new Error("Error al obtener la lista de pokemones");

      const data = await res.json();

      const detailedData = await Promise.all(
        data.results.map(async ({ name, url }) => {
          const res = await fetch(url);
          const details = await res.json();

          return {
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );

      setPokemons(detailedData);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleFavorite = (pokemon) => {
    const exists = favorites.some((fav) => fav.name === pokemon.name);
    const updatedFavorites = exists
      ? favorites.filter((fav) => fav.name !== pokemon.name)
      : [...favorites, pokemon];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const loadFavorites = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  };

  // ------------------- Ciclo de vida -------------------

  useEffect(() => {
    fetchPokemonList();
    loadFavorites();
  }, []);

  // ------------------- Render -------------------

  return (
    <div className="home-container">
      <header className="header">
        <h1>Pokédex React</h1>
        <p className="subtitle">Explorá y marcá tus favoritos</p>
        <Link to="/favorites">
          <button className="favorite-button">Ver Favoritos</button>
        </Link>
      </header>

      {error && <p className="error-message">{error}</p>}

      <section className="pokemon-section">
        <ul className="pokemon-list">
          {pokemons.map((pokemon) => {
            const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

            return (
              <li key={pokemon.name} className="pokemon-card">
                <Link to={`/detail/${pokemon.name}`} className="card-link">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-img"
                  />
                  <h2>{pokemon.name}</h2>
                </Link>
                <button
                  className={`favorite-button ${isFavorite ? "remove" : ""}`}
                  onClick={() => toggleFavorite(pokemon)}
                >
                  {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="footer">
        <p>
          Hecho con ❤️ por <strong>Andres Mena</strong>
        </p>
      </footer>
    </div>
  );
};

export default Home;
