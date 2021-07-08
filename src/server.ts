/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import categoriesRoute from './handlers/categories'
import ordersRoute from './handlers/orders'
import productsRoute from './handlers/products'
import usersRoute from './handlers/users'
import dashboardRoute from './handlers/dashboard'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(morgan('dev'))
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
categoriesRoute(app)
ordersRoute(app)
productsRoute(app)
usersRoute(app)
dashboardRoute(app)

export default app

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`starting app on: ${address}`)
})
