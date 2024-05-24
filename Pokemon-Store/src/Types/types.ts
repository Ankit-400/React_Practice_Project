export type PokemonDetail = {
    name: string;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            }
        }
    };
    id: number;
    height: number;
    weight: number;
    abilities: {
        ability: { name: string; url: string; }
    }[]
}

export type PageType = {
    totalPokemons: number;
    activePage: number;
    fromPageNo: number;
    toPageNo: number;
}

export type StorePokemon = PokemonDetail & {
    quantity: number;
    price: number;
}

export type InitialState = {
    activePage: number;
    fromPage: number;
    toPage: number;
    pokemonList: StorePokemon[];
    cartItems: StorePokemon[];
    totalPokemons: number;
    totalPrice: number;
}

export type StoreState = {
    cart: InitialState
}