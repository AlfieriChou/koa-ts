import {Context} from 'koa'
import {postGetAllService, postGetService} from '../services/Post'

export async function postGetAllAction (ctx: Context) {
  const params = ctx.query
  const result = await postGetAllService(params)
  ctx.body = result
}

export async function postGetAction (ctx: Context) {
  const params = ctx.params
  const result = await postGetService(params)
  if (!result) ctx.throw('post不存在', 404)
  ctx.body = result
}
