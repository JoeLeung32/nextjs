import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { getLearningRecordPostsSortedList } from '../../libs/learning-record-posts'
import {
    LearningRecordListProvider,
    LearningRecordProvider,
} from '../../interfaces/learningRecord'
import { Wrapper } from '../../styled'
import BtnHistoryGoBack from '../../components/btnHistoryGoBack'

const LearningRecordPostList = (data: LearningRecordListProvider) => {
    const { allPostsData } = data
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <Wrapper>
                <Container>
                    <BtnHistoryGoBack />
                    <h1>Learning Record</h1>
                    <ul>
                        {allPostsData.map(
                            (postData: LearningRecordProvider) => (
                                <li key={postData.id}>
                                    <strong>{postData.title}</strong>
                                    <br />
                                    {postData.date}
                                    <br />
                                    <Link
                                        href={`/learning-record/post/[postId]`}
                                        as={`/learning-record/post/${postData.id}`}
                                    >
                                        <a>Read More...</a>
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </Container>
            </Wrapper>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getLearningRecordPostsSortedList()
    return {
        props: {
            allPostsData,
        },
    }
}

export default LearningRecordPostList
