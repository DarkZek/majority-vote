import { FastifyPluginAsync } from "fastify"

const questionRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return {
      question: 'Do ants have lungs',
      leftOption: 'Yes',
      rightOption: 'No',
      questionId: '1'
    }
  })

  fastify.post('/:questionId/answer', async function (request, reply) {
    return {
      percentage: 0.6
    }
  })
}

export { questionRouter };
