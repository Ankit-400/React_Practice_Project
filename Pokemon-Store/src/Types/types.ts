export type pokemonDetail = {
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