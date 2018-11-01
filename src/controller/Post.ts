import { Context } from 'koa'
import { postGetAllService, postCreateService, postGetService, postUpdateService, postDestroyService } from '../services/Post'

export async function postGetAllAction (ctx: Context) {
  const params = ctx.query
  const result = await postGetAllService(params)
  ctx.body = result
}

export async function postCreateAction (ctx: Context) {
  const params = ctx.request.body
  const result = await postCreateService(params)
  ctx.body = result
}

export async function postGetAction (ctx: Context) {
  const params = ctx.params
  const result = await postGetService(ctx, params)
  ctx.body = result
}

export async function postUpdateAction (ctx: Context) {
  const params = Object.assign(ctx.params, ctx.request.body)
  const result = await postUpdateService(ctx, params)
  ctx.body = result
}

export async function postDestroyAction (ctx: Context) {
  const params = ctx.params
  const result = await postDestroyService(ctx, params)
  ctx.body = result
}
