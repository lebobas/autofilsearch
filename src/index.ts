import {autocomplete} from "./autocomplete.component";
import {coupePokemonNames} from "./autocomplete.names";
import './css/style.css';
import {sendRequest} from "./api.service";
import {Observer, PokemonState, pokemonStore} from "./store";
import {displayError, displayResults} from "./display.component";

const searchInput = document.getElementById('searchInput') as HTMLInputElement

autocomplete(searchInput, coupePokemonNames, sendRequest);

const pokemonData: Observer<PokemonState> = (data) => {
    const {error} = data;
    if(error) {
       return  displayError(error);
    }
    displayResults(data);
};
pokemonStore.subscribe(pokemonData);




