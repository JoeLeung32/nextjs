import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { PokemonProvider, PokemonListProvider } from '../interfaces/pokemon'

const HomePage = ({ pokemonList }: PokemonListProvider) => {
    const capitalize = (text: string) =>
        text.replace(/\b\w/g, function (m) {
            return m.toUpperCase()
        })
    const funcPokemonOptionList = (link: PokemonProvider, idx: number) => {
        return (
            <option key={link.id} value={link.id}>
                #{link.id}: {capitalize(link.name)}
                {/*<Link
                    href={`/pokemon/[pokemonId]]`}
                    as={`/pokemon/${link.id}`}
                >
                    <a style={nameStyle}>{link.name}</a>
                </Link>*/}
            </option>
        )
    }
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value
        if (id) {
            const url = `/pokemon/[pokemonId]`
            const as = `/pokemon/${e.target.value}`
            Router.push(url, as)
        }
    }
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <h1>Welcome to Next.js!</h1>
            <ul>
                <li>
                    <Link href={`/about`}>
                        <a>About Me</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/learning-record`}>
                        <a>Learning Record</a>
                    </Link>
                </li>
                <li>
                    <strong>Visit Your Pokemon</strong>
                    <br />
                    <select defaultValue={`DEFAULT`} onChange={handleSelect}>
                        <option value={`DEFAULT`} disabled>
                            Select your Pokes
                        </option>
                        {pokemonList.map(funcPokemonOptionList)}
                    </select>
                </li>
            </ul>
        </>
    )
}

// This also gets called at build time
export const getStaticProps = async () => {
    // Call an external API endpoint to get posts
    const api = `https://pokeapi.co/api/v2/pokemon/?limit=1000`
    const res = await fetch(api)
    const data = await res.json()

    // Get the paths we want to pre-render based on posts
    const pokemonList = data.results.map((d: any) => {
        const url = new URL(d.url)
        const urlPathParams = url.pathname.slice(1, -1).split('/')
        const id = urlPathParams.pop()
        return {
            id,
            ...d,
        }
    })

    // Pass post data to the page via props
    return { props: { pokemonList } }
}

export default HomePage
