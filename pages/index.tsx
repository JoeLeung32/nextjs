import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { Container } from 'react-bootstrap'
import { PokemonListProvider, PokemonProvider } from '../interfaces/pokemon'
import { usePublicSetting } from '../context/PublicSetting'
import { Wrapper } from '../styled'

const appValues = [
    'Next.js',
    'Express',
    'Bootstrap',
    'Markdown',
    'nookies',
    'React',
    'React Bootstrap',
    'Sass',
    'styled-components',
    'TypeScript',
    'PhpStorm',
]

const HomePage = ({ pokemonList }: PokemonListProvider) => {
    const { settings, settingDispatch } = usePublicSetting()
    const capitalize = (text: string) =>
        text.replace(/\b\w/g, (m) => {
            return m.toUpperCase()
        })
    const funcPokemonOptionList = (link: PokemonProvider) => {
        return (
            <option key={link.id} value={link.id}>
                #{link.id}: {capitalize(link.name)}
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
    const handleSwitcher = (e: React.ChangeEvent<HTMLInputElement>) => {
        const bool = e.target.checked
        let theme = 'themeLight'
        if (bool) theme = 'themeDark'
        settingDispatch({
            type: 'setTheme',
            data: theme,
        })
    }
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <Wrapper data-them={settings.theme}>
                <Container>
                    <div className={"btn-group"}>
                        <div className={"custom-control custom-switch"}>
                            <input
                                type={"checkbox"}
                                className={"custom-control-input"}
                                id={"themeSwitcher"}
                                onChange={handleSwitcher}
                                checked={settings.theme !== 'themeLight'}
                            />
                            <label
                                className={"custom-control-label"}
                                htmlFor={"themeSwitcher"}
                            >
                                Go Dark?
                            </label>
                        </div>
                    </div>
                    <h1>Welcome to Next.js!</h1>
                    <h4>App</h4>
                    <ul className={"list-unstyled list-inline"}>
                        {appValues &&
                            appValues.map((d: string, idx: number) => (
                                <li
                                    className={"list-inline-item badge badge-themed"}
                                    key={idx.toString()}
                                >
                                    {d}
                                </li>
                            ))}
                    </ul>
                    <h4>Pre-rendering</h4>
                    <ul>
                        <li>
                            <strong>Page: </strong>
                            <Link href={`/about`}>
                                <a>About Me</a>
                            </Link>
                            <br />
                            <i>
                                Static Page calling GitHub API request user
                                @JoeLeung32 profile information
                            </i>
                            <br />
                            <strong>Structure:</strong>
                            <ul>
                                <li>
                                    pages
                                    <ul>
                                        <li>about.tsx</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Page List: </strong>
                            <Link href={`/learning-record`}>
                                <a>Learning Record</a>
                            </Link>
                            <br />
                            <i>
                                Markdown (*.md) format contents, related fs,
                                path, and gray-matter.
                                <br />
                                Sample: List and Detail
                            </i>
                            <br />
                            <strong>Structure:</strong>
                            <ul>
                                <li>
                                    pages
                                    <ul>
                                        <li>
                                            learning-record
                                            <ul>
                                                <li>
                                                    post
                                                    <ul>
                                                        <li>[postId].tsx</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    posts
                                                    <ul>
                                                        <li>day1.md</li>
                                                        <li>day2.md</li>
                                                    </ul>
                                                </li>
                                                <li>index.tsx</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Pokemon</strong>
                            <form className={"form"}>
                                <select
                                    className={"custom-select"}
                                    defaultValue={"DEFAULT"}
                                    onChange={handleSelect}
                                >
                                    <option value={"DEFAULT"} disabled>
                                        Select your Pokes
                                    </option>
                                    {pokemonList.map(funcPokemonOptionList)}
                                </select>
                            </form>
                            <i>
                                Request PokeAPI and pre-rending all pokes with
                                fetch()
                            </i>
                            <br />
                            <strong>Structure:</strong>
                            <ul>
                                <li>
                                    pages
                                    <ul>
                                        <li>
                                            pokemon
                                            <ul>
                                                <li>[pokemonId].tsx</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h4>Data Fetching</h4>
                    <ul>
                        <li>todo...</li>
                    </ul>
                    <h4>GitHub</h4>
                    <a
                        href={`https://github.com/JoeLeung32/nextjs`}
                        target={"_blank"}
                        rel={"noopener noreferrer nofollow"}
                    >
                        https://github.com/JoeLeung32/nextjs
                    </a>
                </Container>
            </Wrapper>
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
