import express from 'express'
import passport from 'passport'

import { Db } from './config'
import { AuthRoute } from './routes'

class App {
  express: express.Express;

  constructor() {
    this.express = express();

    Db.connect().then(() => {
      this.#setConfiguration();
      this.#setRoute();
    });
  }

  #setConfiguration() {
    this.express.use(express.json())
    this.express.use(passport.initialize())
    this.express.use(express.urlencoded({ extended: true }))
  }

  #setRoute() {
    this.express.use('/auth', AuthRoute)
  }
}

export default new App().express;