import { Request, Response } from 'express'
import { env, crypto, jwt } from '../utils'

export default (req: any, res: Response, next: any) => {
  console.log(req, res);
  try {
    const authorization = req.headers.authorization.split('&')

    if (!authorization) {
      const error: any = new Error('No parameters to authenticate.')
      error.statusCode = 401
      throw error
    }

    if (authorization[1]) {
      let decodedToken: any
      try {
        decodedToken = jwt.generateAccessToken(authorization[1])
      } catch (err) {
        const error: any = new Error('Authentication failed.')
        error.statusCode = 500
        throw error
      }

      if (!decodedToken) {
        const error: any = new Error('Not authenticated.')
        error.statusCode = 401
        throw error
      }
    }

    if (authorization[0]) {
      const secretKey = env.get('api')
      if (crypto.hash(authorization[0]) === secretKey) next()
      else {
        const error: any = new Error('Not authenticated.')
        error.statusCode = 401
        throw error
      }
    }
  } catch (err) {
    err === 401 ? res.status(401) : res.end()
  }
}
