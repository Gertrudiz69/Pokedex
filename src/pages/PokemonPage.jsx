import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components'
import BarChart from '../components/charts/BarChart'
import { PokemonContext } from '../context/PokemonContext'
import ScrollToTop, { primeraMayuscula } from '../helper/helper'


const PokemonPage = () => {

  const {getPokemonByID} = useContext(PokemonContext)

  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})

  const {id} = useParams()

  const fetchPokemon = async(id) => {
    const data = await getPokemonByID(id)
    setPokemon(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemon(id)
  }, [])
  
	const officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  return (
    <main className="container main-pokemon">
			<ScrollToTop />
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <div className='header-main-pokemon'>
						<span className='number-pokemon'>#{pokemon.id}</span>
						<div className='container-img-pokemon'>
							<div className="box">

							<img
								src={officialArtwork}
								alt={`Pokemon ${pokemon.name}`}
							/>
							</div>
						</div>

						<div className='container-info-pokemon'>
							<h1>{primeraMayuscula(pokemon.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{primeraMayuscula(type.type.name)}
									</span>
								))}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Altura</p>
									<span>
										{(pokemon.height * 10) / 100 } M
									</span>
								</div>
								<div className='group-info'>
									<p>Peso</p>
									<span>{pokemon.weight}KG</span>
								</div>
							</div>
						</div>
					</div>

					<div className='container-stats'>	
						<BarChart pokemon={pokemon}/>
					</div>
          </>
        )
      }
    </main>
  )
}

export default PokemonPage