# Awesome Project Build with TypeORM

[![Greenkeeper badge](https://badges.greenkeeper.io/AlfieriChou/koa-ts.svg)](https://greenkeeper.io/)

        
Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

### transaction

```typescript
import { getConnection } from 'typeorm'

const connection = getConnection()
const queryRunner = connect.createQueryRunner()
await queryRunner.startTransaction()
try {
    await queryRunner.manager.save(user1)
    await queryRunner.manager.save(user2)
    await queryRunner.manager.save(photos)
    await queryRunner.commitTransaction()
} catch (err) {
    await queryRunner.rollbackTransaction() 
} finally {
    await queryRunner.release()
}
```

```typescript
import { getManager } from 'typeorm'

await getManager.transaction(trx => {
    await trx.save(user1)
    await trx.save(user2)
    await trx.save(photos)
})
```
