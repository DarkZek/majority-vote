import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync, } from 'fastify';
import cors from '@fastify/cors'
import { configureDatabase } from "./db.config";
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';

const app: FastifyPluginAsync = async (
    fastify,
    opts
): Promise<void> => {
  fastify = fastify.withTypeProvider<TypeBoxTypeProvider>()
  await fastify.setValidatorCompiler(TypeBoxValidatorCompiler)
  await fastify

  await fastify.register(cors)

  configureDatabase(fastify)

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })
};

export default app;
export { app }
