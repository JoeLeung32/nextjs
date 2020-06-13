import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { getLearningRecordPostsSortedList } from '../../lib/learning-record-posts'
import {
    LearningRecordListProvider,
    LearningRecordProvider,
} from '../../interfaces/learningRecord'

const LearningRecordPostList = (data: LearningRecordListProvider) => {
    const { allPostsData } = data
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <div onClick={() => Router.back()}>
                <a>Go Back</a>
            </div>
            <h1>Learning Record</h1>
            <ul>
                {allPostsData.map((postData: LearningRecordProvider) => (
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
                ))}
            </ul>
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
