export type QuestionType = {
  questionId: string,
  question: string,
  leftOption: string,
  rightOption: string
}

export type QuestionResult = {
  percentage: number
}

export type QuestionAnswer = 'left' | 'right'