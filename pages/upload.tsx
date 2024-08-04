import { renderPage } from "@main";
import type { SessionRequest } from "@session";
import fs from "fs";

function getPage(msg: string) {
  const files = fs.readdirSync('uploads')
  return (
    <div >
      <p>{msg}</p>
      <form method="post" encType="multipart/form-data" className="flex flex-col">
        <label htmlFor="fileName">Názov súboru</label>
        <input type="text" name="fileName" id="fileName" />
        <label htmlFor="file">Uploadni fotku / video</label>
        <input type="file" name="file" placeholder="Upload file" id="config" />
        <button type="submit" className="btn">Upload</button>
      </form>

      <hr />
      <h2> Uploadnuté súbory </h2>
      <ul>
        {files.map(e => {
          return (
            <li>
              <a href={`/uploads/${e}`}>/uploads/{e}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export async function get(req: SessionRequest) {
  if (!req.session!.user.admin) {
    return renderPage(getPage('Nemáte oprávnenie na prístup k tejto stránke'), req)
  }
  return renderPage(getPage(''), req)
}


export async function post(req: SessionRequest) {
  if (!req.session!.user.admin) {
    return renderPage(getPage('Nemáte oprávnenie na prístup k tejto stránke'), req)
  }
  const fileName = req.data.get("fileName")
  if (fileName != null) {
    const file = req.data.get("file")
    await Bun.write("uploads/" + fileName, file)
    return renderPage(getPage('Súbor uploadnutý do /uploads/' + fileName), req)
  }
}
