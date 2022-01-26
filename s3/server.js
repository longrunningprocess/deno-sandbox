
import { Application, Router } from 'https://deno.land/x/oak/mod.ts' // https://github.com/oakserver/oak
import { list, store } from './bucket.js'

const router = new Router()
router
  .get('/', async ctx => ctx.response.body = await Deno.readTextFile('./index.html'))
  .get('/files', async ctx => ctx.response.body = JSON.stringify(await list(), null, 2))
  .post('/file', async ctx => {
		const body = await ctx.request.body()
		const formData = await body.value.read()
		
		const localFile = formData.files[0]
		
		ctx.response.body = await store(localFile)

		// TODO: Deno creates the file in /var/folders and does NOT cleanup automatically to my knowledge FYI.
	})

	
const app = new Application()
app.use(router.routes())
app.addEventListener('listen', ({ port }) => console.log(`Listening on: http://localhost:${port}`))

await app.listen(':8000')