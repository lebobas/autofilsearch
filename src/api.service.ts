import {clearResults} from "./display.component";
import {pokemonStore} from "./store";
import {POKEMON_ERROR, POKEMON_UPDATE} from "./actions";
import {PokemonResponse} from "./models";

export class PokemonService {
    private readonly baseURL = 'https://pokeapi.co/api/v2';

    constructor() {

    }

    getPokemonByName = async (query: string): Promise<void> => {
        if (this.isQueryInvalid(query)) return;
        query = query.toLowerCase();
        try {
            const response: Response = await fetch(`${this.baseURL}/pokemon/${query}`);
            if (!response.ok) {
                if (response.status === 404) {
                    const error = `Error! pokemon ${query} not found`;
                    pokemonStore.dispatch({type: POKEMON_ERROR, payload: {error}});
                }
                return;
            }
            const data = await response.json() as PokemonResponse;
            pokemonStore.dispatch({type: POKEMON_UPDATE, payload: data});
        } catch (errorRes) {
            const error = `Error fetching data:${errorRes}`;
            pokemonStore.dispatch({type: POKEMON_ERROR, payload: {error}});
        }
    }

    private isQueryInvalid(query: string): boolean {
        if (!query) {
            clearResults();
            return false
        }
        return query.length < 3;

    }
}
