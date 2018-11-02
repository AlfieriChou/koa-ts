import { postGetAllAction, postCreateAction, postGetAction, postUpdateAction, postDestroyAction } from './controller/Post'
import { cardGetAllAction, cardCreateAction } from './controller/Card'

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
  },
  {
    path: '/posts/:id',
    method: 'put',
    action: postUpdateAction
  },
  {
    path: '/posts/:id',
    method: 'delete',
    action: postDestroyAction
  },
  {
    path: '/cards',
    method: 'get',
    action: cardGetAllAction
  },
  {
    path: '/cards',
    method: 'post',
    action: cardCreateAction
  }
]