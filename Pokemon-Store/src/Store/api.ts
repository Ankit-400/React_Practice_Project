import axios from "axios";
import { StorePokemon, PokemonDetail } from "../Types/types";

const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

export async function fetchPokemonList(activePage: number) {
    console.log("Fetching pokemons...", activePage);
    const fromPokemon = ((activePage - 1) * 20) + 1;
    const toPokemon = fromPokemon + 20;
    const pokemonList: PokemonDetail[] = [];
    for (let index = fromPokemon; index < toPokemon; index++) {
        const pokemon: {
            data: PokemonDetail
        } = await axios.get(API_ENDPOINT + index);

        const { data } = pokemon;

        pokemonList.push({
            name: data.name[0].toUpperCase() + data.name.slice(1),
            sprites: {
                other: {
                    dream_world: {
                        front_default: data.sprites.other.dream_world.front_default
                    }
                }
            },
            id: data.id,
            height: data.height,
            weight: data.weight,
            abilities: data.abilities
        })
    }
    console.log("Pokemons fetched for range..", fromPokemon, " --> ", toPokemon - 1);
    return pokemonList;
}