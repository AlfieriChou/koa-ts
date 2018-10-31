import {getManager} from 'typeorm'
import {Post} from '../entity/Post'

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

export async function postGetService (params) {
  const postRepository = getManager().getRepository(Post)
  const post = await postRepository.findOne(params)
  return post
}
  