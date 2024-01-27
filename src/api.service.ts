import {clearResults} from "./display.component";
import {pokemonStore} from "./store";
import {POKEMON_ERROR, POKEMON_UPDATE} from "./actions";

export async function sendRequest(query: string) {

    if (!query) {
        clearResults()
        return;
    }
    if(query.length < 3) return;
    query = query.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
            if (response.status === 404) {
                const error = `Error! pokemon ${query} not found`;
                    pokemonStore.dispatch({ type:POKEMON_ERROR, payload: {error} });
            }
            return;
        }
        const data = await response.json();
        pokemonStore.dispatch({ type:POKEMON_UPDATE, payload: data });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}