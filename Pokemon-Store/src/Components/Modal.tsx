import React from "react";
import '../Style/Modal.css'
import { useSelector } from "react-redux";
import { StoreState } from "../Types/types";

type PropType = {
    open: boolean;
    pokeId: Number;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<PropType> = (prop) => {

    const { open, pokeId, toggle } = prop;
    const { pokemonList } = useSelector((state: StoreState) => state.cart)
    const data = pokemonList.find(pokemon => pokemon.id === pokeId)!;


    return <dialog open={open} className="pokemon-data">
        <section className="modal-upper">
            <div>
                <div>
                    <label>Name</label>
                    <p id="name">{data?.name[0].toUpperCase() + data?.name.slice(1)}</p>
                </div>
                <div>
                    <label>Height</label>
                    <p id="height">{data?.height}</p>

                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <p id="weight">{data?.weight}</p>
                </div>
            </div>
            <div>
                <img src={data?.sprites.other.dream_world.front_default} alt="" className="modal-image" />
            </div>
        </section>
        <div>
            <label htmlFor="abilitis">Abilities</label>
            <ul id="abilities">
                {
                    data?.abilities
                        .map(power => <li style={{ listStyle: 'none' }}>
                            {
                                power.ability.name[0].toUpperCase() +
                                power.ability.name.slice(1)
                            }
                        </li>)
                }
            </ul>
        </div>
        <button onClick={() => toggle(false)}>Close</button>
    </dialog>
}

export default Modal;