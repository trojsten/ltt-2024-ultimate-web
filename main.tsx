import { renderToReadableStream } from "react-dom/server";
import { navbar } from "./navbar"
import type { SessionRequest } from "@session";

function getPage(content: JSX.Element, req: SessionRequest) {
    return <html>
        <head>
            <link rel="stylesheet" href="/static/app.css" />
            <meta charSet="utf-8" />
        </head>
        <body>
            {navbar(req)}
            {content}
        </body>
    </html>
}


export async function renderPage(content: JSX.Element, req: SessionRequest) {
    const page = getPage(content, req);
    const stream = await renderToReadableStream(page);
    return new Response(stream, {
        headers: {
            "Content-Type": "text/html",
        },
    });
}