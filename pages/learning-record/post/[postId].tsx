import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import {
    getLearningRecordPostsIds,
    getLearningRecordPost,
} from '../../../libs/learning-record-posts'
import { LearningRecordContentProvider } from '../../../interfaces/learningRecord'
import { Wrapper } from '../../../styled'

const LearningRecordPostDetails = ({
    postData,
}: LearningRecordContentProvider) => {
    const router = useRouter()
    const { postId } = router.query
    if (!postData) return <div>No Content</div>
    const { title, date, content } = postData
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
                    <h1>{title}</h1>
                    <p>{date}</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: content
                                .replace(/\r\n/g, '</p><p>')
                                .replace(/\n\n/g, '</p><p>'),
                        }}
                    />
                </Container>
            </Wrapper>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getLearningRecordPostsIds()
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postID = params ? params.postId : null
    let postData = null
    if (postID) {
        postData = getLearningRecordPost(postID.toString())
    }
    return {
        props: { postData },
    }
}

export default LearningRecordPostDetails
