import {getManager} from 'typeorm'
import {Post} from '../entity/Post'

export async function postGetAllService (params) {
  const postRepository = getManager().getRepository(Post)
  const posts = await postRepository.find()
  return posts
}

export async function postGetService (params) {
  const postRepository = getManager().getRepository(Post)
  const post = await postRepository.findOne(params)
  return post
}
  