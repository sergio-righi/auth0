import express, { Request, Response } from 'express';
import { AuthController } from '../controllers'
class AuthRoute {
  router: express.Router;

  constructor() {
    this.router = express.Router()

    this.#setRoute();
  }

  #setRoute() {
    this.router.get('/sign-out', AuthController.logout);
    this.router.post("/sign-in", AuthController.login);
    this.router.post("/sign-up", AuthController.register);
  }
}

export default new AuthRoute().router;