import { startAdWatch } from '@pages/ad'
import { SessionRequest } from './session'
import config from '@config'

Bun.serve({
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
      !sessReq.parsedUrl.pathname.startsWith('/ad') &&
      !sessReq.parsedUrl.pathname.match(/\/games\/[a-z-]*\//) &&
      Math.random() > 0.5 &&
      sessReq.method == 'GET'
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
        return Response.redirect('/login?redirect=' + btoa(Request.url))
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
