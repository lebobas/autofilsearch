import {clearResults, displayError, displayResults} from "./display.component";

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
            displayError(response, query);
            return;
        }
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}