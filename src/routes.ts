import { postGetAllAction, postGetAction } from './controller/Post'

export const AppRoutes = [
  {
    path: '/posts',
    method: 'get',
    action: postGetAllAction
  },
  {
    path: '/posts/:id',
    method: 'get',
    action: postGetAction
  }
]