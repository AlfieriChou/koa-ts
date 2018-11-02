import { getManager } from 'typeorm'
import { Post } from '../entity/Post'
import { paginate } from '../common/Paginate'
import { Context } from 'koa'

export async function postGetAllService (params) {
  const { pagination, page, size } = params
  let sql = getManager().createQueryBuilder(Post, 'post')
  if (params.id) sql = sql.where('post.id = :id', { id: params.id })
  if (params.title) sql = sql.where('post.title like :title', { title: '%' + params.title + '%' })
  if (pagination.toString() === 'true') {
    const count = await sql.getCount()
    sql.offset((page - 1) * size).limit(size)
    const result = await sql.getMany()
    return {
      result: result,
      paginate: paginate({ count, page, size })
    }
  }
  const result = await sql.getMany()
  return result
}

export async function postCreateService (params) {
  const postRepository = getManager().createQueryBuilder(Post, 'post')
  const result = await postRepository.insert().into(Post).values(params).execute()
  return result
}

export async function postGetService (ctx: Context, params) {
  const postRepository = getManager().createQueryBuilder(Post, 'post')
  const post = await postRepository.where({ id: params.id })
  if (!post) ctx.throw('该信息不存在', 404)
  return post
}

export async function postUpdateService (ctx: Context, params) {
  const postRepository = getManager().createQueryBuilder(Post, 'post')
  const exists = await postRepository.where({ id: params.id })
  if (!exists) ctx.throw('该信息不存在', 404)
  const result = await postRepository.update(Post).set(params).where('id = :id', { id: params.id }).execute()
  return result
}

export async function postDestroyService (ctx: Context, params) {
  const postRepository = getManager().createQueryBuilder(Post, 'post')
  const exists = await postRepository.where({ id: params.id })
  if (!exists) ctx.throw('该信息不存在', 404)
  const result = await postRepository.delete().from(Post).where('id = :id', { id: params.id }).execute()
  return result
}
  