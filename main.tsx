import { renderToReadableStream } from 'react-dom/server'
import { navbar } from './navbar'
import type { SessionRequest } from '@session'

async function getPage(content: JSX.Element, req: SessionRequest) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/app.css" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/static/navbar.js" defer async />
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <meta property="og:image" content="/static/ltt.svg" />
        <meta property="twitter:image" content="/static/ltt.svg" />
        <link rel="apple-touch-icon" href="/static/icon512_rounded.png" />
        <meta name="theme-color" content="white" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="LTT" />
        <meta
          name="msapplication-TileImage"
          content="/static/icon512_maskable.png"
        />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="description" content="LTT" />
        <meta name="og:description" content="LTT" />
        <meta name="twitter:description" content="LTT" />
        <meta name="author" content="Trojsten" />
        <meta name="robots" content="all" />
        <meta name="keywords" content="kapitalizmius, peniaze, Trojsten" />
        <meta property="og:site_name" content="LTT" />
        <title>LTT APP</title>
        <meta property="og:title" content="LTT" />
        <meta property="twitter:title" content="LTT" />
      </head>
      <body>
        <main className="flex h-screen min-w-screen flex-col md:flex-row">
          {req.sessionValid ? await navbar(req) : null}
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
