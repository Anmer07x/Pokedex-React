import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const Detail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error("Error al obtener datos del Pokémon");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPokemon();
  }, [name]);

  if (error) return <p className="detail-error">Error: {error}</p>;
  if (!pokemon) return <p className="detail-loading">Cargando...</p>;

  return (
    <div className="detail-container">
      <div className="detail-card">
        <h1 className="detail-title">{pokemon.name}</h1>
        <img className="detail-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
        
        <div className="detail-info">
          <p><strong>Altura:</strong> {pokemon.height}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>
          <p><strong>Tipo:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
          <p><strong>Stats:</strong></p>
          <ul className="stat-list">
            {pokemon.stats.map((s, i) => (
              <li key={i}>{s.stat.name}: {s.base_stat}</li>
            ))}
          </ul>
        </div>

        <button className="back-button" onClick={() => window.history.back()}>
          Volver Atrás
        </button>
      </div>

      <footer className="detail-footer">
        Derechos a <strong>Andres Mena</strong>
      </footer>
    </div>
  );
};

export default Detail;
