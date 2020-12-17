import Koa from "koa"
import mongo from "./"

const app = new Koa()

app.use(mongo())
app.use(async (ctx, next) => {
  await ctx.mongo.db('test').collection('users').insertOne({ name: 'example' })
  ctx.body = await ctx.db.collection('users').find().toArray()
  await ctx.db.collection('users').deleteMany({ name: 'example' })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
