import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Card, Container } from 'react-bootstrap'
const ReactMarkdown = require('react-markdown/with-html')
import {
    getLearningRecordPostsIds,
    getLearningRecordPost,
} from '../../../libs/learning-record-posts'
import { LearningRecordContentProvider } from '../../../interfaces/learningRecord'
import { usePublicSetting } from '../../../context/PublicSetting'
import { Wrapper } from '../../../styled'

function LinkRenderer(props: any) {
    return (
        <a href={props.href} target="_blank" rel="noopener noreferrer nofollow">
            {props.children}
        </a>
    )
}

const Commit = ({ commitId }: any) => {
    return (
        <Card>
            <div className="card-body">
                <h5 className="card-title">{commitId}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {commitId.substring(0, 6)}
                </h6>
                <a
                    href={`https://github.com/JoeLeung32/nextjs/commit/${commitId}`}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                >
                    Details
                </a>
                <a
                    href={`https://github.com/JoeLeung32/nextjs/tree/${commitId}`}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                >
                    Browse the repository at this point in the history
                </a>
            </div>
        </Card>
    )
}

const LearningRecordPostDetails = ({
    postData,
}: LearningRecordContentProvider) => {
    const { settings, settingDispatch } = usePublicSetting()
    const router = useRouter()
    const { postId } = router.query
    if (!postData) return <div>No Content</div>
    const { title, date, content, commits } = postData
    const setCommitsHTML = () => {
        if (!commits || !commits.trim().length)
            return <span>No commit today</span>
        let commitList = commits.split(',')
        return commitList.reverse().map((d: string, idx: number) => {
            const commitId = (commitList[idx] = d.trim())
            return <Commit key={idx} commitId={commitId} />
        })
    }
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <Wrapper data-them={settings.theme}>
                <Container>
                    <div onClick={() => Router.back()}>
                        <a>Go Back</a>
                    </div>
                    <h1>{title}</h1>
                    <p>{date}</p>
                    <ReactMarkdown
                        source={content}
                        escapeHtml={false}
                        renderers={{ link: LinkRenderer }}
                    />
                    <hr />
                    <h2>Commits</h2>
                    {setCommitsHTML()}
                    <div className={`pt-2 text-center`}>-- END --</div>
                    <div onClick={() => Router.back()}>
                        <a>Go Back</a>
                    </div>
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
