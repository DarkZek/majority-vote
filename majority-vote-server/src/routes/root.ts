import { FastifyPluginAsync } from 'fastify'
import { questionRouter } from './question'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(questionRouter, { prefix: '/question' })
}

export default root;
