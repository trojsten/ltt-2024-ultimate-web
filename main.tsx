import { renderToReadableStream } from 'react-dom/server'
import { navbar } from './navbar'
import type { SessionRequest } from '@session'

async function getPage(content: JSX.Element, req: SessionRequest, nav: boolean = true) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/app.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/static/navbar.js" defer async />
      </head>
      <body>
        <main className="flex h-screen min-w-screen flex-col md:flex-row">
          {nav && req.sessionValid ? await navbar(req) : null}
          <section
            className={
              req.sessionValid
                ? 'overflow-y-auto w-full md:h-dvh h-[calc(100dvh-3.5rem)]'
                : 'overflow-y-auto w-full h-dvh'
            }
          >
            {content}
          </section>
        </main>
      </body>
    </html>
  )
}

export async function renderPage(
  content: JSX.Element,
  req: SessionRequest,
  status: number = 200,
  nav: boolean = true
) {
  const page = await getPage(content, req, nav)
  const stream = await renderToReadableStream(page)
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html'
    },
    status
  })
}
