import { getManager } from 'typeorm'
import { Card } from '../entity/Card'
import { paginate } from '../common/Paginate'

export async function cardGetAllService (params) {
  const { pagination, page, size } = params
  let sql = getManager().createQueryBuilder(Card, 'card')
  if (params.id) sql = sql.where('card.id = :id', { id: params.id })
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

export async function cardCreateService (params) {
  const cardRepository = getManager().getRepository(Card)
  const newCard = await cardRepository.create(params)
  const result = await cardRepository.save(newCard)
  return result
}