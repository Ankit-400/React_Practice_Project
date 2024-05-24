import React from "react";
import '../Style/PokemonCard.css'
import { StoreState } from "../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Store/cartSlice";

type PropsType = {
    loading: boolean;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPoke: React.Dispatch<React.SetStateAction<number>>
}

const PokemonCard: React.FC<PropsType> = (props) => {

    const PokeStore = useSelector((state: StoreState) => state.cart);
    const { loading, toggle, setSelectedPoke } = props;
    const dispatch = useDispatch();

    return <ul className="card-container">
        {
            !loading && PokeStore.pokemonList.map((pokemon, index) => {
                return <li key={index} >
                    <div onClick={() => { toggle(true); setSelectedPoke(pokemon.id) }}>
                        <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
                        <p>
                            {
                                pokemon.name[0].toUpperCase() +
                                pokemon.name.slice(1)
                            }
                        </p>
                    </div>
                    <hr style={{ width: '90%', margin: '5px auto' }} />
                    <button onClick={() => dispatch(addToCart({ ...pokemon, quantity: 1 }))}>Add to Cart</button>
                </li>
            })
        }
    </ul>
}

export default PokemonCard;