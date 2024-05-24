import { createSlice, current } from "@reduxjs/toolkit";
import { InitialState } from "../Types/types";

const PAGINATION_RANGE = 5;

const initialState: InitialState = {
    activePage: 1,
    fromPage: 1,
    toPage: PAGINATION_RANGE,
    pokemonList: [],
    cartItems: [],
    totalPokemons: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        initialPokemonList: (state) => {
            state.totalPokemons = 1302;
        },
        updatePagination: (state, action) => {
            // send page number which is selected by user in action.payload
            const selectedPage = action.payload;

            let newFrom = selectedPage - Math.floor(Math.random() * 3);
            newFrom = Math.max(1, newFrom);

            let newTo = newFrom + PAGINATION_RANGE - 1;
            newTo = Math.min(newTo, 30);

            state.activePage = selectedPage;
            state.fromPage = newFrom;
            state.toPage = newTo;

            console.log(" -------- ", selectedPage, newFrom, newTo, " -------- ");
        },
        updatePokemonsPage: (state, action) => {
            state.pokemonList = action.payload;
        },
        addToCart: (state, action) => {
            // send quantity by which you wanted to increment the entity in cart along with the id of the pokemon
            const pokemonIndex = state.cartItems.findIndex(pokemon => pokemon.id === action.payload.id);
            if (pokemonIndex !== -1) {
                console.log(action.payload);

                const newCount = state.cartItems[pokemonIndex].quantity + action.payload.quantity;
                state.cartItems[pokemonIndex].quantity = Math.max(1, newCount);
                state.totalPrice += state.cartItems[pokemonIndex].price * action.payload.quantity;
            }
            else {
                const generatePrice = Math.floor((Math.random() * 5 + 1)) * 100
                const cartPokemon = {
                    ...action.payload,
                    quantity: 1,
                    price: +generatePrice
                }
                state.totalPrice += generatePrice;
                console.log(typeof state.totalPrice);
                state.cartItems.push(cartPokemon);
            }
            console.log(current(state).cartItems);
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;
            const pokemonIndex = state.cartItems.findIndex(pokemon => pokemon.id === id);
            state.totalPrice -= state.cartItems[pokemonIndex].quantity * state.cartItems[pokemonIndex].price;
            state.cartItems = state.cartItems.filter(pokemon => pokemon.id !== id);
        },
    }
})

export default cartSlice.reducer;
export const { initialPokemonList, updatePagination, updatePokemonsPage, addToCart, removeFromCart } = cartSlice.actions;