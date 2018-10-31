import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as logger from 'koa-logger'
import * as BodyParser from 'koa-bodyparser'
import { AppRoutes } from './routes'
import { Context } from 'koa'

createConnection().then(async connection => {

  const app = new Koa()
  const router = new Router()

  AppRoutes.forEach(route => router[route.method](route.path, route.action))

  app.use(async (ctx: Context, next) => {
    if (ctx.request.method === 'OPTIONS') {
      ctx.response.status = 200
    }
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Max-Age', 86400000)
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
    await next()
  })
  app.use(BodyParser())
  app.use(logger())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3000)
  console.log("Koa application is up and running on port 3000")

}).catch(error => console.log("TypeORM connection error: ", error))
