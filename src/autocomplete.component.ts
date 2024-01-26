
export function autocomplete(inputElement: HTMLInputElement, values: string[], sendRequest:Function): void {
    let currentFocus: number;

    inputElement.addEventListener("input", debounce(handleInput, 300));

    inputElement.addEventListener("keydown", (event: KeyboardEvent) => {
        let autocompleteItems: HTMLCollectionOf<Element> | undefined = document.getElementById(inputElement.id + "autocomplete-list")?.getElementsByTagName("div");
        if (!autocompleteItems) return;

        if (event.key === "ArrowDown") {
            currentFocus++;
            addActive(autocompleteItems);
        } else if (event.key === "ArrowUp") {
            currentFocus--;
            addActive(autocompleteItems);
        } else if (event.key === "Enter") {
            event.preventDefault();
            if (currentFocus > -1) {
                (autocompleteItems[currentFocus] as HTMLElement).click();
            }
        }
    });

    function addActive(autocompleteItems: HTMLCollectionOf<Element>): void {
        removeActive(autocompleteItems);
        if (currentFocus >= autocompleteItems.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (autocompleteItems.length - 1);
        (autocompleteItems[currentFocus] as HTMLElement).classList.add("autocomplete-active");
    }

    function removeActive(autocompleteItems: HTMLCollectionOf<Element>): void {
        for (let i = 0; i < autocompleteItems.length; i++) {
            (autocompleteItems[i] as HTMLElement).classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(excludeElement?: HTMLElement): void {
        const autocompleteItems: HTMLCollectionOf<Element> = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < autocompleteItems.length; i++) {
            const autocompleteItem = autocompleteItems[i] as HTMLElement;
            if (excludeElement !== autocompleteItem && excludeElement !== inputElement) {
                autocompleteItem.parentNode?.removeChild(autocompleteItem);
            }
        }
    }

    function handleInput(event: Event): void {
        const inputValue: string = inputElement.value;
        closeAllLists();

        if (!inputValue) { return; }
        currentFocus = -1;

        const autocompleteContainer: HTMLDivElement = document.createElement("div");
        autocompleteContainer.id = inputElement.id + "autocomplete-list";
        autocompleteContainer.classList.add("autocomplete-items");
        autocompleteContainer.classList.add("list-group");
        (inputElement.parentNode as HTMLElement).appendChild(autocompleteContainer);

        for (let i = 0; i < values.length; i++) {
            const currentValue: string = values[i];
            if (currentValue.substr(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
                const autocompleteItem: HTMLDivElement = document.createElement("div");
                autocompleteItem.classList.add("list-group-item");
                autocompleteItem.innerHTML = `<strong>${currentValue.substr(0, inputValue.length)}</strong>`;
                autocompleteItem.innerHTML += currentValue.substr(inputValue.length);
                autocompleteItem.innerHTML += `<input type='hidden' value='${currentValue}'>`;

                autocompleteItem.addEventListener("click", (event: Event) => {
                    inputElement.value = (autocompleteItem.getElementsByTagName("input")[0] as HTMLInputElement).value;
                    closeAllLists();
                    sendRequest(inputElement.value)
                });

                autocompleteContainer.appendChild(autocompleteItem);
            }
        }
        sendRequest(inputElement.value)
    }

    document.addEventListener("click", (event: Event) => {
        closeAllLists(event.target as HTMLElement);
    });
}
function debounce(func:any, timeout:number) {
    let timer:any;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, timeout);
    };
}