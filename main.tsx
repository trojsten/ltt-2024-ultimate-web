import { renderToReadableStream } from 'react-dom/server'
import { navbar } from './navbar'
import type { SessionRequest } from '@session'

async function getPage(content: JSX.Element, req: SessionRequest) {
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
      </head>
      <body>
        {req.sessionValid ? await navbar(req) : null}
        {content}
      </body>
    </html>
  )
}

export async function renderPage(
  content: JSX.Element,
  req: SessionRequest,
  status: number = 200
) {
  const page = await getPage(content, req)
  const stream = await renderToReadableStream(page)
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html'
    },
    status
  })
}
