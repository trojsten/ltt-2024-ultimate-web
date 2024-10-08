import { startAdWatch } from '@pages/ad'
import { SessionRequest, setSession } from './session'
import config from '@config'
import { importTags, importUsersFromCsv } from '@importer'
import getConfig from '@config'
import { adblockers } from '@pages/shop/buy/hooks'

await importTags()
await importUsersFromCsv('users.csv')

export const server = Bun.serve({
  fetch: async (Request) => {
    const path = new URL(Request.url).pathname
    if (
      Request.method == 'GET' &&
      (path.startsWith('/static') || path.startsWith('/uploads'))
    ) {
      const file = Bun.file('.' + path)
      if (!(await file.exists())) {
        return new Response('Not Found', { status: 404 })
      }

      return new Response(file)
    }

    const router = new Bun.FileSystemRouter({
      dir: './pages',
      style: 'nextjs'
    })

    const route = router.match(Request)

    if (!route) {
      return new Response('Not Found', { status: 404 })
    }

    let data: FormData | undefined
    if (Request.method == 'POST') {
      if (
        Request.headers.get('Content-Type') ==
        'application/x-www-form-urlencoded' ||
        Request.headers.get('Content-Type')?.includes('multipart/form-data')
      ) {
        data = await Request.formData()
      } else if (Request.headers.get('Content-Type') == 'application/json') {
        const text = await Request.text()
        data = JSON.parse(text)
      }
    }

    const sessReq = new SessionRequest(Request, data, route.params)
    const ip = server.requestIP(Request)
    sessReq.ip = ip?.address ?? 'unknown'
    if (
      sessReq.session?.ad !== undefined &&
      !sessReq.parsedUrl.pathname.startsWith('/ad')
    ) {
      return Response.redirect('/ad')
    }

    if (
      config().ads.enabled &&
      sessReq.session !== undefined &&
      sessReq.session.ad === undefined &&
      !sessReq.session.user.admin &&
      !sessReq.parsedUrl.pathname.startsWith('/ad') &&
      !sessReq.parsedUrl.pathname.match(/\/games\/[a-z-]*\//) &&
      Math.random() > 1 - getConfig().ads.adShowProbability / 100 &&
      sessReq.method == 'GET' &&
      !adblockers.has(sessReq.session.user.id)
    ) {
      try {
        const res = await startAdWatch(sessReq)

        return res
      } catch (err) {
        console.error(err)
      }
    }

    const page = await import(route.filePath)

    let res: Response | undefined
    if (sessReq.sessionValid == false) {
      if (sessReq.parsedUrl.pathname != '/login') {
        return setSession(Response.redirect('/login?redirect=' + btoa(Request.url)), undefined)
      }
    }

    if (Request.method == 'POST') {
      res = page.post?.(sessReq, data)
    } else if (Request.method == 'GET') {
      res = page.get?.(sessReq)
    }

    return res ?? new Response('Method Not Allowed', { status: 405 })
  },
  port: 3000,
  websocket: {
    message: function () // ws: ServerWebSocket<unknown>,
      // message: string | Buffer
      : void | Promise<void> {
      throw new Error('Function not implemented.')
    }
  },
  tls:
    Bun.env.DEBUG == 'True'
      ? {
        cert: Bun.file('domain.crt'),
        key: Bun.file('domain.key')
      }
      : {}
})
