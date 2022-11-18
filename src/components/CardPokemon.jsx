import React from 'react'
import { Link } from 'react-router-dom'
import { primeraMayuscula } from '../helper/helper'

const CardPokemon = ({ pokemon }) => {

	const officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  return (
    <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
			<div className={`card-img`} >
				<img
					src={officialArtwork}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
			<div className='card-info'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				<h3>{primeraMayuscula(pokemon.name)}</h3>
				<div className='card-types'>
					{pokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{primeraMayuscula(type.type.name)}
						</span>
					))}
				</div>
			</div>
		</Link>
  )
}

export default CardPokemon