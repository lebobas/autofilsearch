import {reducer, Reducer} from "./reducer";
import {Action} from "./actions";
import {PokemonResponse} from "./models";

export type Observer<T> = (data: T) => void;

export class Observable<T> {
    private observers: Observer<T>[] = [];

    subscribe(observer: Observer<T>): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer<T>): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data: T): void {
        this.observers.forEach(observer => observer(data));
    }
}

export interface PokemonState extends PokemonResponse{
    error: string;
}


class Store extends Observable<PokemonState> {
    private static instance: Store;
    private state: PokemonState;
    private reducer: Reducer;

    private constructor(initialState: PokemonState, reducer: Reducer) {
        super();
        this.state = initialState;
        this.reducer = reducer;
    }

    static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store({error:''} as PokemonState, reducer);
        }
        return Store.instance;
    }

    getState(): PokemonState {
        return this.state;
    }

    dispatch(action: Action): void {
        this.setState(this.reducer(this.state, action));
    }

    private setState(newState: PokemonState): void {
        this.state = { ...this.state, ...newState };
        this.notify(this.state);
    }
}

export const pokemonStore = Store.getInstance();

