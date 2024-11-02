import type { QuestionAnswer, QuestionResult, QuestionType } from "@/types"
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export async function getQuestion(): Promise<QuestionType> {
  const response = await axios.get('/question')

  return response.data
}

export async function submitAnswer(questionId: string, answer: QuestionAnswer): Promise<QuestionResult> {
  const response = await axios.post(`/question/${questionId}/answer`, { isLeft: answer === 'left' })

  return response.data
}