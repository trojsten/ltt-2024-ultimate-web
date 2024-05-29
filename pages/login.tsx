import { renderPage } from '@/main'
import db from '@db'
import { setSession, type SessionRequest } from '@session'

function login(success: boolean = true, redirect: string = '/') {
  return (
    <div className="flex flex-col m-3 justify-center items-center min-h-screen">
      <h1 className="text-3xl text-center "></h1>
      <h2 className="text-xl text-center">Prihlásiť sa</h2>
      {success ? null : (
        <p className="text-red-500 font-light">Zlé meno alebo heslo</p>
      )}
      <form
        action={'/login?redirect=' + redirect}
        method="post"
        encType="multipart/form-data"
        className="flex flex-col w-full md:w-1/2 mx-auto"
      >
        <label htmlFor="name">Meno</label>
        <input type="text" name="username" id="name" />
        <label htmlFor="pass">Heslo</label>
        <input type="password" name="password" id="pass" />
        <button type="submit" className="btn">
          Prihlásiť sa
        </button>
      </form>
    </div>
  )
}

export function get(req: SessionRequest) {
  return renderPage(
    login(true, req.parsedUrl.searchParams.get('redirect') ?? '/'),
    req
  )
}

export async function post(req: SessionRequest): Promise<Response> {
  const formdata = req.data!

  const username = formdata.get('username') as string
  const password = formdata.get('password') as string
  const user = await db.user.findFirst({
    where: {
      name: username,
      password: password
    }
  })
  if (user) {
    const redirectUrl = req.parsedUrl.searchParams.get('redirect')
    let res: Response
    if (redirectUrl == null) {
      res = Response.redirect('/')
    } else {
      res = Response.redirect(atob(redirectUrl) ?? '/')
    }
    return setSession(res, { user: user, ad: undefined })
  } else {
    return renderPage(
      login(false, req.parsedUrl.searchParams.get('redirect') ?? '/'),
      req,
      403
    )
  }
}
