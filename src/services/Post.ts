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
  const postRepository = getManager().getRepository(Post)
  const newPost = await postRepository.create(params)
  const result = await postRepository.save(newPost)
  return result
}

export async function postGetService (ctx: Context, params) {
  const postRepository = getManager().getRepository(Post)
  const post = await postRepository.findOne(params)
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

// 这里需要注意下 这是物理删除 一般来说是逻辑删除 更新deleted_at时间就可以了
export async function postDestroyService (ctx: Context, params) {
  const postRepository = getManager().createQueryBuilder(Post, 'post')
  const exists = await postRepository.where({ id: params.id })
  if (!exists) ctx.throw('该信息不存在', 404)
  const result = await postRepository.delete().from(Post).where('id = :id', { id: params.id }).execute()
  return result
}
  