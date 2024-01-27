import {PokemonResponse} from "./models";
const searchResults = document.getElementById('searchResults') as HTMLUListElement
const error = document.getElementById('error') as HTMLDivElement

export function displayResults(result: PokemonResponse) {
    if(searchResults === null) throw new Error('search-results element not found');
    clearResults();
    clearError();

    const pokemonName= document.createElement('h3');
    pokemonName.classList.add('display-4');
    pokemonName.innerHTML = `${result.name}`;
    searchResults.appendChild(pokemonName);
    const abilitiesHead= document.createElement('p');
    abilitiesHead.innerHTML = `Pokemon abilities`;
    searchResults.appendChild(abilitiesHead);
    result.abilities.forEach(ability => {
        const abilityParagraph= document.createElement('p');
        abilityParagraph.innerHTML = `${ability.ability.name}`
        searchResults.appendChild(abilityParagraph);
    });
    const separator= document.createElement('hr');
    separator.classList.add('my-4');
    searchResults.appendChild(separator);
}
export  function displayError(msg: string){
        clearResults();
        clearError();
        const errorItem = document.createElement('p');
        errorItem.classList.add('alert', 'alert-danger');
        errorItem.innerText =msg
        error.appendChild(errorItem);
}

export function clearResults() {
    searchResults.innerHTML = '';
}
export function clearError() {
    error.innerHTML = '';
}