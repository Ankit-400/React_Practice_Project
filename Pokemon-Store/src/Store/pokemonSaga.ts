import { call, fork, put, takeEvery } from "redux-saga/effects";
import { fetchPokemonList } from "./api";
// import { initialPokemonList } from "./cartSlice";
import { SagaIterator } from "redux-saga";
import { updatePokemonsPage } from "./cartSlice";

export function* onLoadPokemonAsync(activePage: number = 1): SagaIterator {
    try {
        const response = yield call(fetchPokemonList, activePage);
        yield put(updatePokemonsPage(response));
    }
    catch {
        console.log("Something went wrong in pokemon saga, while fetching....");
    }
}

// function* onLoadPokemon() {
//     console.log("Watcher is up....");
//     yield takeEvery(initialPokemonList.type, () => onLoadPokemonAsync())
// }

// export const pokemonSagas = [fork(onLoadPokemon)];