import {getManager} from 'typeorm'
import {Post} from '../entity/Post'
import {Context} from 'koa'

export async function postGetAllService (params) {
  const postRepository = getManager().getRepository(Post)
  const posts = await postRepository.find()
  return posts
}

export async function postCreateService (params) {
  const postRepository = getManager().getRepository(Post)
  const newPost = await postRepository.create(params)
  const result = await postRepository.save(newPost)
  return result
}

export async function postGetService (params, ctx: Context) {
  const postRepository = getManager().getRepository(Post)
  const post = await postRepository.findOne(params)
  if (!post) ctx.throw('post不存在', 404)
  return post
}
  