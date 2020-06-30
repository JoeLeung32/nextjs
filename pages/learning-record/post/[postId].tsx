import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Card, Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown/with-html'
import {
    getLearningRecordPostsIds,
    getLearningRecordPost,
} from '../../../libs/learning-record-posts'
import { LearningRecordContentProvider } from '../../../interfaces/learningRecord'
import { usePublicSetting } from '../../../context/PublicSetting'
import { Wrapper } from '../../../styled'
import BtnHistoryGoBack from '../../../components/btnHistoryGoBack'

interface CommitProvider {
    commitId: string | number
}

function LinkRenderer(props: any) {
    const { href, children } = props
    return (
        <a href={href} target={'_blank'} rel={'noopener noreferrer nofollow'}>
            {children}
        </a>
    )
}

const Commit = ({ commitId }: CommitProvider) => {
    return (
        <Card>
            <div className={'card-body'}>
                <h5 className={'card-title'}>{commitId}</h5>
                <h6 className={'card-subtitle mb-2 text-muted'}>
                    {commitId.toString().substring(0, 6)}
                </h6>
                <a
                    href={`https://github.com/JoeLeung32/nextjs/commit/${commitId}`}
                    className={'card-link'}
                    target={'_blank'}
                    rel={'noopener noreferrer nofollow'}
                >
                    Details
                </a>
                <a
                    href={`https://github.com/JoeLeung32/nextjs/tree/${commitId}`}
                    className={'card-link'}
                    target={'_blank'}
                    rel={'noopener noreferrer nofollow'}
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
    const { settings } = usePublicSetting()
    // const { settings, settingDispatch } = usePublicSetting()
    const router = useRouter()
    const { postId } = router.query
    if (!postData) return <div>No Content</div>
    const { title, date, content, commits } = postData
    const setCommitsHTML = () => {
        if (!commits || !commits.trim().length)
            return <span>No commit today</span>
        const commitList = commits.split(',')
        return commitList.reverse().map((d: string, idx: number) => {
            const commitId = d.trim()
            commitList[idx] = commitId
            return (
                <Commit
                    key={`${idx.toString()}_${postId}`}
                    commitId={commitId}
                />
            )
        })
    }
    return (
        <>
            <Head>
                <title>Next App</title>
            </Head>
            <Wrapper data-them={settings.theme}>
                <Container>
                    <BtnHistoryGoBack />
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
                    <BtnHistoryGoBack />
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
