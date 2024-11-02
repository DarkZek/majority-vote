import { Static, Type } from "@fastify/type-provider-typebox";

export const SubmitResponseBody = Type.Object({
    isLeft: Type.Boolean(),
    userId: Type.String()
})
export type SubmitResponseBodyType = Static<typeof SubmitResponseBody>

export const SubmitResponseParams = Type.Object({
    questionId: Type.String()
})
export type SubmitResponseParamsType = Static<typeof SubmitResponseParams>

export const SubmitResponseResponse = Type.Object({
    id: Type.String(),
    statement: Type.String(),
    leftOption: Type.String(),
    rightOption: Type.String()
})
export type SubmitResponseResponseType = Static<typeof SubmitResponseResponse>
