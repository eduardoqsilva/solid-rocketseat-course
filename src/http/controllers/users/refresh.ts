import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const role = request.user.role

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    }
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // acesso em todo backend
      secure: true, // usa https sim ou não
      sameSite: true,
      httpOnly: true, // só vai ser acesso pelo backend
    })
    .status(200)
    .send({
      token,
    })
}
