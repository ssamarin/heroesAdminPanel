import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => { // builder - обьект который позволяет конструировать редусер при помощи 3 встроеных в него методов
    builder
        .addCase(heroesFetching, state => { // аналог Case из reducer, принимает в себя 2 аргумента - актион креатор и функцию по изменению стейта 
            state.heroesLoadingStatus = 'loading';
        }) // addCease ничего не возвращает и только в таком случае будет работать иммер js 
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        })
        .addDefaultCase(() => {});
});

export default heroes;