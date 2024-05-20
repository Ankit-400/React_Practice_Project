import React from "react";
import '../Style/PokemonCard.css'
import { pokemonDetail } from "../Types/types";

type PropsType = {
    loading: boolean;
    pokemonList: pokemonDetail[];
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
    setPokemon: React.Dispatch<React.SetStateAction<pokemonDetail | undefined>>
}

const PokemonCard: React.FC<PropsType> = (props) => {
    console.log(props);
    return <ul className="card-container">
        {
            !props.loading && props.pokemonList.map((pokemon, index) => {
                return <li key={index} onClick={() => {
                    props.setPokemon(pokemon);
                    props.toggle(true)
                }
                }>
                    <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
                    <p>
                        {
                            pokemon.name[0].toUpperCase() +
                            pokemon.name.slice(1)
                        }
                    </p>
                    <hr style={{ width: '90%', margin: '5px auto' }} />
                    <button>Add to Cart</button>
                </li>
            })
        }
    </ul>
}

export default PokemonCard;