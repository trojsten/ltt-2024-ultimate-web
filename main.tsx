import { renderToReadableStream } from "react-dom/server";
import { navbar } from "./navbar"

function getPage(content: JSX.Element) {
    return <html>
        <head>
            <link rel="stylesheet" href="static/app.css" />
        </head>
        <body>
            {navbar()}
            {content}
        </body>
    </html>
}


export async function renderPage(content: JSX.Element) {
    const page = getPage(content);
    const stream = await renderToReadableStream(page);
    return new Response(stream, {
        headers: {
            "Content-Type": "text/html",
        },
    });
}