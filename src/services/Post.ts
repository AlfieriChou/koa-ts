import { getManager } from 'typeorm'
import { Post } from '../entity/Post'
import { paginate } from '../common/Paginate'

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

export async function postGetService (params) {
  const postRepository = getManager().getRepository(Post)
  const post = await postRepository.findOne(params)
  return post
}
  