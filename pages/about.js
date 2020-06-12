import React from 'react'
import Router from 'next/router'

const AboutPage = ({ posts }) => {
    const goBackStyle = {
        color: 'blue',
        cursor: 'pointer',
        textDecoration: 'underline',
    }
    const displayValue = (data) => data || '--'
    const TagA = ({ url, title, target, content }) => {
        return (
            <a
                href={url || `#`}
                title={title || ``}
                target={target || `_self`}
                rel="noopener noreferrer nofollow"
            >
                {content || '--'}
            </a>
        )
    }
    return (
        <div>
            <div style={goBackStyle} onClick={() => Router.back()}>
                Go Back
            </div>
            <h1>About Me</h1>
            <img src={posts.avatar_url} alt={posts.name} />
            <ul>
                <li>{displayValue(posts.name)}</li>
                <li>{displayValue(posts.login)}</li>
                {posts.twitter_username && (
                    <li>{displayValue(posts.twitter_username)}</li>
                )}
                <li>ID # {displayValue(posts.id)}</li>
                <li>Gravatar # {displayValue(posts.gravatar_id)}</li>
                {posts.blog && (
                    <li>
                        My WebSite:{' '}
                        <TagA
                            url={posts.blog}
                            title={`My Website`}
                            target={`_blank`}
                            content={posts.blog}
                        />
                    </li>
                )}
                {posts.html_url && (
                    <li>
                        GitHub:{' '}
                        <TagA
                            url={posts.html_url}
                            title={`GitHub`}
                            target={`_blank`}
                            content={posts.html_url}
                        />
                    </li>
                )}
                <li>Working at {displayValue(posts.company)}</li>
                <li>Account create at {displayValue(posts.created_at)}</li>
                <li>Account update at {displayValue(posts.updated_at)}</li>
                <li>Email: {displayValue(posts.email)}</li>
                <li>Followers: {displayValue(posts.followers)}</li>
                <li>Following: {displayValue(posts.following)}</li>
                <li>Public Gists: {displayValue(posts.public_gists)}</li>
                <li>Public Repos: {displayValue(posts.public_repos)}</li>
                <li>Hire able: {displayValue(posts.hireable)}</li>
                <li>Location: {displayValue(posts.location)}</li>
            </ul>
        </div>
    )
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const api = `https://api.github.com/users/joeleung32`
    const res = await fetch(api)
    const posts = await res.json()

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}

export default AboutPage
