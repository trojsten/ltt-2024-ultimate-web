import { renderPage } from "@/main";
import db from "@db";
import { setSession, type SessionRequest } from "@session";

function login(success: boolean = true) {
  return (
    <div>
      <h1>Prihlásiť sa</h1>
      {success ? null : <p>Zle meno alebo heslo</p>}
      <form action="/login" method="post" encType="multipart/form-data">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export function get(req: SessionRequest) {
  return renderPage(login());
}

export async function post(req: SessionRequest): Promise<Response> {
    const formdata = await req.data;
    console.log(formdata);
    
    const username = formdata.get("username") as string;
    const password = formdata.get("password") as string;
    const user = await db.user.findFirst({
        where: {
            name: username,
            password: password
        }
    })
    if(user){
        const res = Response.redirect(req.parsedUrl.searchParams.get("redirect") ?? "/");
        return setSession(res, { user: user });
    } else {
        return renderPage(login(false));
    }
}