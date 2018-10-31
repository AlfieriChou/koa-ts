import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as logger from 'koa-logger'
import * as BodyParser from 'koa-bodyparser'
import { AppRoutes } from './routes'

createConnection().then(async connection => {

  const app = new Koa()
  const router = new Router()

  AppRoutes.forEach(route => router[route.method](route.path, route.action))

  app.use(BodyParser())
  app.use(logger())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3000)
  console.log("Koa application is up and running on port 3000")

}).catch(error => console.log("TypeORM connection error: ", error))
