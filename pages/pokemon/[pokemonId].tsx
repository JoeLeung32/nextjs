import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { PokemonProvider } from '../../interfaces/pokemon'
import PokemonDetails from '../../components/pokemon/pokemonDetails'
import { Wrapper } from '../../styled'

const PokemonPage = ({ pokemon }: any) => {
    const capitalize = (text: string) =>
        text.replace(/\b\w/g, (m) => {
            return m.toUpperCase()
        })
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <Wrapper>
                <Container>
                    <Link href={`/`}>
                        <a>Go Back</a>
                    </Link>
                    <h1>
                        <span>#{pokemon.id}</span>{' '}
                        <span>{capitalize(pokemon.name)}</span>
                    </h1>
                    <PokemonDetails pokemon={pokemon} />
                </Container>
            </Wrapper>
        </>
    )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
    // Call an external API endpoint to get posts
    const api = `https://pokeapi.co/api/v2/pokemon/?limit=1000`
    const res = await fetch(api)
    const data = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = data.results.map((d: PokemonProvider) => {
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
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const pokemonID = params ? params.pokemonId : null
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const api = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    const res = await fetch(api)
    const pokemon = await res.json()

    // Pass post data to the page via props
    return { props: { pokemon } }
}

export default PokemonPage
