import { Type, type Static } from "@fastify/type-provider-typebox";

export const GetQuestionResponse = Type.Optional(Type.Object({
    id: Type.String(),
    statement: Type.String(),
    leftOption: Type.String(),
    rightOption: Type.String()
}))
export type GetQuestionResponseType = Static<typeof GetQuestionResponse>
