import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { AiOutlineClose } from 'react-icons/ai'
import { TipoFilter } from './filter-components'

const FilterBar = () => {

	const { active, setActive } = useContext(PokemonContext)

	return (
		<div className={`container-filters ${active ? 'active' : ''}`}>
			<div className='btn-close' onClick={() => setActive(!active)}>
				<AiOutlineClose />
			</div>
			<div className='filter-by-type'>
				<TipoFilter />
			</div>
		</div>
	)
}

export default FilterBar