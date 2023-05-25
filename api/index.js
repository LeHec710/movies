import express, { Router } from 'express'
import { initializeMongoDatabase } from './db.js'
import movieController from './movies/controller.js'
import directorController from './directors/controller.js'

import cors from 'cors'

const hostname = "127.0.0.1";
const port = 3000;

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors())

initializeMongoDatabase();

const routes = Router();

routes.use('/movies', movieController)
routes.use('/directors', directorController)

app.use(routes)

app.get('/', (req, res) => {
  res.send("Backend launched")
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});