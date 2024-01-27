import {PokemonResponse} from "./models";

export  type Action = PokemonUpdateAction | PokemonErrorAction
export const POKEMON_UPDATE = '[Pokemon] Update pokemon';
export const POKEMON_ERROR = '[Pokemon] Error';

export interface PokemonUpdateAction {
    type: typeof POKEMON_UPDATE;
    payload: PokemonResponse;
}
export interface PokemonErrorAction {
    type: typeof POKEMON_ERROR;
    payload: {error: string}
}
