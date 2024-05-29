import { startAdWatch } from '@pages/ad'
import { SessionRequest } from './session'

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
      data = await Request.formData()
    }
    const sessReq = new SessionRequest(Request, data, route.params)
    if (
      sessReq.session !== undefined &&
      sessReq.session.ad === undefined &&
      Math.random() > 1 &&
      sessReq.method == 'GET'
    ) {
      return startAdWatch(sessReq)
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
  port: 3000
})
