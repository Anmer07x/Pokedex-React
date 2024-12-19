import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pokemon) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Tipo: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <p>
        Habilidades:{" "}
        {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
      </p>
      <p>
        Stats:{" "}
        {pokemon.stats
          .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
          .join(", ")}
      </p>
      <br />
      <a href="javascript:history.back()"> Volver Atrás</a>
      <br />
      <br />

      <footer>
        {" "}
        Derechos a <strong>Andres Mena</strong>
      </footer>
    </div>
  );
};

export default Detail;
