// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import React from 'react'

const PokemonList = () => {
    const [offset, setOffset] = React.useState(0)
    const [pokemonList, setPokemonList] = React.useState([])
    const [resultLength, setResultLength] = React.useState(0)


    React.useEffect(() => {
        let ignore = false
        async function fetchPokemon () {
            await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    if (!ignore) {
                        const newList = [...pokemonList, ...res.results]
                        setPokemonList(newList)
                        setResultLength(res.count)
                    } 
                })

            
        }
        fetchPokemon()

        return () => {
            ignore = true
        }

    }, [offset])

    const handleClick = () => {
        setOffset((prevOffset) => prevOffset + 5)
    }

    return (
        <>
            <ul>
                {pokemonList.map((pokemon) => {
                    return <li key={pokemon.id}>{pokemon.name}</li>
                })}
            </ul>
            
            {pokemonList.length < resultLength &&
                <button onClick={handleClick}>Load more</button>
            }
            <p>Displaying {pokemonList.length} of {resultLength} results</p>
        </>
    )
};

export default PokemonList;
