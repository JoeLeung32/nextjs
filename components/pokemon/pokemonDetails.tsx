import React from 'react'

const PokemonDetails = ({ pokemon }: any) => {
    const Image = ({ src, alt }: any) => {
        if (!src) return <span>--</span>
        return <img src={src} alt={alt} />
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Front</th>
                        <th>Back</th>
                        <th colSpan={2}>Female</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Default</th>
                        <td>
                            <Image
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                            />
                        </td>
                        <td>
                            <Image
                                src={pokemon.sprites.back_default}
                                alt={pokemon.name}
                            />
                        </td>
                        <td>
                            <Image
                                src={pokemon.sprites.front_female}
                                alt={pokemon.name}
                            />
                        </td>
                        <td>
                            <Image
                                src={pokemon.sprites.back_female}
                                alt={pokemon.name}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Shiny</th>
                        <td>
                            <Image
                                src={pokemon.sprites.front_shiny}
                                alt={pokemon.name}
                            />
                        </td>
                        <td>
                            <Image
                                src={pokemon.sprites.back_shiny}
                                alt={pokemon.name}
                            />
                        </td>
                        <td>
                            <Image
                                src={pokemon.sprites.front_shiny_female}
                                alt={pokemon.name}
                            />
                        </td>
                        <td>
                            <Image
                                src={pokemon.sprites.back_shiny_female}
                                alt={pokemon.name}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul>
                <li>Order: {pokemon.order}</li>
                <li>Base Experience: {pokemon.base_experience}</li>
                <li>Height: {pokemon.height}</li>
                <li>Weight: {pokemon.weight}</li>
            </ul>
        </>
    )
}

export default PokemonDetails
