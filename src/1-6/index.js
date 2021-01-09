const Koa = require('koa')
const koaBody = require('koa-body')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter();

router.prefix('/api')

const createResponse = (code, msg, data) => ({ code, msg, data })

router.post('/user', async (ctx) => {
  let { name, email } = ctx.request.body
  const { role } = ctx.header
  if (!name || !email) {
    ctx.body = createResponse(404, 'name和email不得为空')
  } else if (!role || role !== 'admin') {
    ctx.body = createResponse(401, 'unauthorized post')
  } else {
    ctx.body = createResponse(200, '上传成功', { name, email })
  }
})


app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())
console.log('listen at port: 3000')
app.listen(3000)
