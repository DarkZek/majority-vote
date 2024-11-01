import { FastifyPluginAsync } from "fastify"
import { Question } from "../../database/entity/question.entity"

const questionRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const result = await fastify.orm["typeorm"]
      .getRepository(Question)
      .createQueryBuilder()
      .select('*')
      .from(Question, 'questions')
      .orderBy("RANDOM()")
      .limit(1)
      .getOne()

    console.log(result)

    return result
  })

  fastify.post('/:questionId/answer', async function (request, reply) {
    return {
      percentage: 0.6
    }
  })

  fastify.post('/', async function (request, reply) {
    let question = new Question()

    question.leftOption = (request.body as any).leftOption
    question.rightOption = (request.body as any).rightOption
    question.statement = (request.body as any).statement

    let result = await fastify.orm["typeorm"].getRepository(Question).insert(question)

    console.log(result)

    return question
  })
}

export { questionRouter };
