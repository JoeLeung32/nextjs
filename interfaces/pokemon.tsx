export interface PokemonProvider {
    id: string
    name: string
    url: string
}

export interface PokemonListProvider {
    pokemonList: Array<PokemonProvider>
}
