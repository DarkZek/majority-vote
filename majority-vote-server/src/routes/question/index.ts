import { FastifyPluginAsync } from "fastify"
import { Question } from "../../database/entity/question.entity"

const questionRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const result = await fastify.orm["typeorm"]
      .getRepository(Question).findOne({ where: { id: 'e6fa57b2-cf70-456d-b711-9e04b9c39891' }})

    return result
  })

  fastify.post('/:questionId/answer', async function (request, reply) {
    return {
      percentage: 0.6
    }
  })

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
