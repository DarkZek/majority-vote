import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export async function getQuestion(): Promise<{
  questionId: string,
  question: string,
  leftOption: string,
  rightOption: string
}> {
  axios.get('')
}