import { postGetAllAction, postCreateAction, postGetAction } from './controller/Post'

export const AppRoutes = [
  {
    path: '/posts',
    method: 'get',
    action: postGetAllAction
  },
  {
    path: '/posts',
    method: 'post',
    action: postCreateAction
  },
  {
    path: '/posts/:id',
    method: 'get',
    action: postGetAction
  }
]