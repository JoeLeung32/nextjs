export interface LearningRecordProvider {
    id: string
    date: Date
    title: string
    content: string
    commits: string
}

export interface LearningRecordListProvider {
    allPostsData: Array<LearningRecordProvider>
}

export interface LearningRecordContentProvider {
    postData: LearningRecordProvider
}
