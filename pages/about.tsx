import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Container } from 'react-bootstrap'
import { GitHubProvider } from '../interfaces/github'
import { TagAProvider } from '../interfaces/htmlElements'
import { Wrapper } from '../styled'

const AboutPage = ({ profile }: GitHubProvider) => {
    const displayValue = (data: any) => data || <span>--</span>
    const {
        id,
        gravatar_id,
        name,
        login,
        avatar_url,
        html_url,
        blog,
        twitter_username,
        company,
        created_at,
        updated_at,
        email,
        followers,
        following,
        public_gists,
        public_repos,
        hireable,
        location,
    } = profile
    const TagA = ({ url, title, target, content }: TagAProvider) => {
        return (
            <a
                href={url || `#`}
                title={title || ``}
                target={target || `_self`}
                rel="noopener noreferrer nofollow"
            >
                {content || <span>--</span>}
            </a>
        )
    }
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <Wrapper>
                <Container>
                    <div onClick={() => Router.back()}>
                        <a>Go Back</a>
                    </div>
                    <h1>About Me</h1>
                    <img src={avatar_url} alt={name} />
                    <ul>
                        <li>{displayValue(name)}</li>
                        <li>{displayValue(login)}</li>
                        {twitter_username && (
                            <li>{displayValue(twitter_username)}</li>
                        )}
                        <li>ID # {displayValue(id)}</li>
                        <li>Gravatar # {displayValue(gravatar_id)}</li>
                        {html_url && (
                            <li>
                                GitHub:{' '}
                                <TagA
                                    url={html_url}
                                    title={`GitHub`}
                                    target={`_blank`}
                                    content={html_url}
                                />
                            </li>
                        )}
                        {blog && (
                            <li>
                                My WebSite:{' '}
                                <TagA
                                    url={blog}
                                    title={`My Website`}
                                    target={`_blank`}
                                    content={blog}
                                />
                            </li>
                        )}
                        <li>Working at {displayValue(company)}</li>
                        <li>Account create at {displayValue(created_at)}</li>
                        <li>Account update at {displayValue(updated_at)}</li>
                        <li>Email: {displayValue(email)}</li>
                        <li>Followers: {displayValue(followers)}</li>
                        <li>Following: {displayValue(following)}</li>
                        <li>Public Gists: {displayValue(public_gists)}</li>
                        <li>Public Repos: {displayValue(public_repos)}</li>
                        <li>Hire able: {displayValue(hireable)}</li>
                        <li>Location: {displayValue(location)}</li>
                    </ul>
                </Container>
            </Wrapper>
        </>
    )
}

// This function gets called at build time
export const getStaticProps = async () => {
    // Call an external API endpoint to get posts
    const api = `https://api.github.com/users/joeleung32`
    const res = await fetch(api)
    const profile = await res.json()

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            profile,
        },
    }
}

export default AboutPage
