import {PokemonService} from "./api.service";
import {autocomplete} from "./autocomplete.component";
import {coupePokemonNames} from "./autocomplete.names";
import {Observer, PokemonState, pokemonStore} from "./store";
import {displayError, displayResults} from "./display.component";

export class Main {
    private searchInput = document.getElementById('searchInput') as HTMLInputElement
    private apiService = new PokemonService()

    constructor() {

    }

    start() {
        autocomplete(this.searchInput, coupePokemonNames, this.apiService.getPokemonByName);
        this.subscribeToStore();
    }

    private subscribeToStore() {
        const pokemonData: Observer<PokemonState> = (data) => {
            const {error} = data;
            if (error) {
                return displayError(error);
            }
            displayResults(data);
        };
        pokemonStore.subscribe(pokemonData);
    }


}