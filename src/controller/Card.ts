import { Context } from 'koa'
import { cardGetAllService, cardCreateService } from '../services/Card'

export async function cardGetAllAction (ctx: Context) {
	const params = ctx.query
	const result = await cardGetAllService(params)
	ctx.body = result
}

export async function cardCreateAction (ctx: Context) {
	const params = ctx.request.body
	const result = await cardCreateService(params)
	return result
}