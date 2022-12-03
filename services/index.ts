
import { default as AuthService } from './auth'
import { default as MailService } from './mail'
import { default as TokenService } from './token'

export const initializeService = (context: any) => ({
  auth: new AuthService(context),
  mail: new MailService(context),
  token: new TokenService(context),
})