import type { QuestionAnswer, QuestionResult, QuestionType } from "@/types"
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export async function getQuestion(): Promise<QuestionType> {
  // const response = await axios.get('/question')

  // return response.data

  return {
    question: 'Do ants have lungs',
    leftOption: 'Yes',
    rightOption: 'No',
    questionId: '1'
  }
}

export async function submitAnswer(questionId: string, answer: QuestionAnswer): Promise<QuestionResult> {
  // const response = await axios.push(`/question/${questionId}/answer`, { answer })

  // return response.data

  return {
    percentage: 0.3
  }
}