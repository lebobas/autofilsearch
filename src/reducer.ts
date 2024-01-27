import {PokemonState} from "./store";
import {Action, POKEMON_ERROR, POKEMON_UPDATE, PokemonErrorAction, PokemonUpdateAction} from "./actions";

export type Reducer = (state: PokemonState, action: Action) => PokemonState;


export const reducer: Reducer = (state, action : PokemonUpdateAction | PokemonErrorAction) => {
    switch (action.type) {
        case POKEMON_UPDATE:
            return { ...state, ...action.payload, error: '' };
        case POKEMON_ERROR:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
