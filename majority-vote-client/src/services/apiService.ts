import type { QuestionAnswer, QuestionResult, QuestionType } from "@/types"
import axios from "axios"
import { uuidv7 } from "uuidv7"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

if (!localStorage.getItem("uid")) {
  localStorage.setItem("uid", uuidv7())
}

export async function getQuestion(): Promise<QuestionType> {
  const response = await axios.get('/question',
    {
      params: {
        userId: localStorage.getItem("uid")
      }
    }
  )

  return response.data
}

export async function submitAnswer(questionId: string, answer: QuestionAnswer): Promise<QuestionResult> {
  const response = await axios.post(`/question/${questionId}/answer`, { 
    isLeft: answer === 'left',
    userId: localStorage.getItem("uid")
  })

  return response.data
}