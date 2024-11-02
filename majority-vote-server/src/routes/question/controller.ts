class QuestionController {
    public async submitAnswer(questionId: string, isLeft: boolean, userId: string): Promise<number> {
        console.log(`addAnswer(${questionId}, ${isLeft}, ${userId})`)

        return 0.2
    }
}

export { QuestionController }