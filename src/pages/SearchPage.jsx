import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CardPokemon, Loader } from '../components'
import { PokemonContext } from '../context/PokemonContext'

const SearchPage = () => {

  const location = useLocation()

  const {globalPokemons, loading} = useContext(PokemonContext)

  const filteresPokemons = globalPokemons.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()))
  
  return (
    
        <div className="container">
          <p className="p-search">
            Se encontraron <span>{filteresPokemons.length}</span> resultados:
          </p>
          {
      loading ? (
        <Loader />
      ) : (
          <div className="card-list-pokemon container">
            {filteresPokemons.map(pokemon => (
              <CardPokemon pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
      )}
        </div>
  
  )
}

export default SearchPage