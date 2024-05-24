// import { all } from "axios";
// import { pokemonSagas } from "./pokemonSaga";
import { takeEvery } from "redux-saga/effects";
import { updatePagination, initialPokemonList } from "./cartSlice";
import { onLoadPokemonAsync } from "./pokemonSaga";
import { PayloadAction } from "@reduxjs/toolkit";

interface UpdatePaginationPayload {
    type: string;
    payload: number;
}

type UpdatePaginationAction = PayloadAction<UpdatePaginationPayload>;

export default function* rootSaga() {
    // yield all([...pokemonSagas]);
    yield takeEvery(initialPokemonList.type, onLoadPokemonAsync, 1);
    yield takeEvery(updatePagination.type, (action: UpdatePaginationAction) => {
        console.log(action.payload);
        return onLoadPokemonAsync(+action.payload);
    });
}
