import {autocomplete} from "./autocomplete.component";
import {coupePokemonNames} from "./autocomplete.names";
import './css/style.css';
import {sendRequest} from "./api.service";

const searchInput = document.getElementById('searchInput') as HTMLInputElement

autocomplete(searchInput, coupePokemonNames, sendRequest);



