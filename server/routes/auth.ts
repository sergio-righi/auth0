import express, { Request, Response } from 'express';
import { AuthController } from '../controllers'
class AuthRoute {
  router: express.Router;

  constructor() {
    this.router = express.Router()

    this.#setRoute();
  }

  #setRoute() {
    this.router.get('/sign-out', (req, res) => AuthController.logout(req, res));
    this.router.post("/sign-in", (req, res) => AuthController.login(req, res));
    this.router.post("/sign-up", (req, res) => AuthController.register(req, res));
  }
}

export default new AuthRoute().router;