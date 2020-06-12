import React from 'react'
import Router from 'next/router'

const PokemonPage = ({ pokemon }) => {
    const nameStyle = {
        textTransform: 'capitalize',
    }
    const goBackStyle = {
        color: 'blue',
        cursor: 'pointer',
        textDecoration: 'underline',
    }
    const Image = ({ src, alt }) => {
        if (!src) return '--'
        return <img src={src} alt={alt} />
    }
    return (
        <div>
            <div style={goBackStyle} onClick={() => Router.back()}>
                Go Back
            </div>
            <h1>
                <span>#{pokemon.id}</span>{' '}
                <span style={nameStyle}>{pokemon.name}</span>
            </h1>
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
        </div>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const api = `https://pokeapi.co/api/v2/pokemon/?limit=1000`
    const res = await fetch(api)
    const data = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = data.results.map((d) => {
        const url = new URL(d.url)
        const urlPathParams = url.pathname.slice(1, -1).split('/')
        const urlId = urlPathParams.pop()
        return `/pokemon/${urlId}`
    })

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const api = `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
    const res = await fetch(api)
    const pokemon = await res.json()

    // Pass post data to the page via props
    return { props: { pokemon } }
}

export default PokemonPage
