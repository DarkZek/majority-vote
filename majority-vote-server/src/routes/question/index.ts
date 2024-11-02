import { FastifyPluginAsync } from "fastify"
import { Question } from "../../database/entity/question.entity"
import { GetQuestionResponse } from "../../types/getQuestion"
import { SubmitResponseBody, SubmitResponseParams, SubmitResponseResponse } from "../../types/submitResponse"
import { QuestionController } from './controller'
import { Type } from "@fastify/type-provider-typebox"

const questionRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  const controller = new QuestionController()

  fastify.get('/',
    {
      schema: {
        response: Type.Object({
          200: GetQuestionResponse
        }),
      }
    },
    async function (request, reply) {
      const result = await await fastify.orm["typeorm"]
        .getRepository(Question)
        .createQueryBuilder()
        .select("questions")
        .from(Question, "questions")
        .orderBy("RANDOM()")
        .limit(1)
        .getOne()

      if (!result) {
        return
      }

      return result
    }
  )

  fastify.post('/:questionId/answer',
    {
      schema: {
        params: SubmitResponseParams,
        body: SubmitResponseBody,
        response: Type.Object({
          200: SubmitResponseResponse
        }),
      }
    },
    async function (request, reply) {

      const percentage = await controller.submitAnswer(
        request.params.questionId,
        request.body.isLeft,
        request.body.userId
      )

      return {
        percentage
      }
    }
  )

  fastify.post('/', async function (request, reply) {
    const question = new Question()

    question.leftOption = (request.body as any).leftOption
    question.rightOption = (request.body as any).rightOption
    question.statement = (request.body as any).statement

    await fastify.orm["typeorm"].getRepository(Question).save(question)

    return question
  })
}

export { questionRouter };
