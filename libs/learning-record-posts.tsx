import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), '/pages/learning-record/posts')

export const getLearningRecordPost = (id: string) => {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
        id,
        ...matterResult.data,
        content: matterResult.content,
    }
}

export const getLearningRecordPostsIds = () => {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName) => {
        return {
            params: {
                postId: fileName.replace(/\.md$/, ''),
            },
        }
    })
}

export const getLearningRecordPostsSortedList = () => {
    const getTime = (date?: Date) =>
        date != null ? new Date(date).getTime() : 0
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        }
    })
    // Sort posts by date
    return allPostsData.sort((a: any, b: any) =>
        getTime(a.date) < getTime(b.date) ? 1 : -1
    )
}
