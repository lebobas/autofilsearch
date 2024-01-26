import {PokemonResponse} from "./models";
const searchResults = document.getElementById('searchResults') as HTMLUListElement

export function displayResults(result: PokemonResponse) {
    if(searchResults === null) throw new Error('search-results element not found');
    searchResults.innerHTML = '';
    const listItem = document.createElement('li');
    listItem.innerHTML = `<h3>${result.name}</h3>`
    searchResults.appendChild(listItem);
    result.abilities.forEach(ability => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<p>${ability.ability.name}</p>`
        searchResults.appendChild(listItem);
    });
}
export  function displayError(response: Response, query: string){
    if (response.status === 404) {
        searchResults.innerHTML = '';
        const listItem = document.createElement('li');
        listItem.innerText = `Error! pokemon ${query} not found`;
        searchResults.appendChild(listItem);
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

}

export function clearResults() {
    searchResults.innerHTML = '';
}