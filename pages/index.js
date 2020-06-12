import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const HomePage = ({ pokemons }) => {
    const nameStyle = {
        textTransform: 'capitalize',
    }
    return (
        <div>
            <h1>Welcome to Next.js!</h1>
            <Link href={`/about`}>
                <a>About Me</a>
            </Link>
            <h4>Pokemans</h4>
            <ul>
                {pokemons.map((link, idx) => {
                    return (
                        <li key={idx}>
                            #{link.id}:{' '}
                            <Link href={link.url}>
                                <a style={nameStyle}>{link.name}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

// This also gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const api = `https://pokeapi.co/api/v2/pokemon/?limit=1000`
    const res = await fetch(api)
    const data = await res.json()

    // Get the paths we want to pre-render based on posts
    const pokemons = data.results.map((d) => {
        const url = new URL(d.url)
        const urlPathParams = url.pathname.slice(1, -1).split('/')
        const urlId = urlPathParams.pop()
        return {
            id: urlId,
            name: d.name,
            url: `/pokemon/${urlId}`,
        }
    })

    // Pass post data to the page via props
    return { props: { pokemons } }
}

export default HomePage
