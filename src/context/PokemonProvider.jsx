import React, { useEffect, useState } from 'react'
import { useForm } from '../hook/useForm'
import { PokemonContext } from './PokemonContext'

const PokemonProvider = ({ children }) => {

  const [offset, setOffset] = useState(0)
  const [allPokemons, setAllPokemons] = useState([])
  const [globalPokemons, setGlobalPokemons] = useState([])

  const {valueSearch, onInputChange, onReseteForm} = useForm({
    valueSearch: ''
  })

  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)

  const getAllPokemons = async(limit = 50) => {
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
    const data = await res.json()

    const promises = data.results.map(async(pokemon) => {
      const res = await fetch(pokemon.url) 
      const data = await res.json()
      return data
    })

    const results = await Promise.all(promises)

    setAllPokemons([...allPokemons, ...results])
    setLoading(false)
  }

  const getGlobalPokemons = async() => {
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=906&offset=0`)
    const data = await res.json()

    const promises = data.results.map(async(pokemon) => {
      const res = await fetch(pokemon.url) 
      const data = await res.json()
      return data
    })

    const results = await Promise.all(promises)

    setGlobalPokemons(results)
    setLoading(false)
  }

  const getPokemonByID = async(id) => {
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon/${id}`)
    const data = await res.json()
    return data
  }

  useEffect(() => {
    getAllPokemons()
  }, [offset])

  // useEffect(() => {
  //   getGlobalPokemons()
  // }, [])
  
  const onClickLoadMore = () => {
    setOffset(offset + 50)
  }
  
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
  })

  const handleCheckbox = e =>{
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked
    })

    if(e.target.checked){
      const filteredResults = globalPokemons.filter(pokemon => pokemon.types.map(type => type.type.name).includes(e.target.name))
      setFilteredPokemons([...filteredPokemons, ...filteredResults])
    } else {
      const filteredResults = filteredPokemons.filter(pokemon => !pokemon.types.map(type => type.type.name).includes(e.target.name))
      setFilteredPokemons([...filteredResults])
    }

  }

  return (
    <PokemonContext.Provider value={{
      valueSearch,
      onInputChange,
      onReseteForm,
      allPokemons,
      globalPokemons,
      getPokemonByID,
      onClickLoadMore,
      loading,
      setLoading,
      active,
      setActive,
      handleCheckbox,
      filteredPokemons,
      getGlobalPokemons
    }}>
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider