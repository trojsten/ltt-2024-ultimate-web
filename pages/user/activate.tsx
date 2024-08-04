import db from "@db"
import { renderPage } from "@main"
import { setSession, type SessionRequest } from "@session"

function login(errors: Record<string, string>, req: SessionRequest, data: FormData = new FormData()) {
  return (
    <div className="flex flex-col p-3 justify-center items-center min-h-screen">
      <h1 className="text-3xl text-center "></h1>
      <h2 className="text-xl text-center">Aktivuj svoj učet</h2>
      <form
        method="post"
        className="flex flex-col w-full md:w-1/2 mx-auto gap-1"
      >
        <label htmlFor="username">Meno</label>
        <input type="text" name="username" id="username" value={data.has("username") ? data.get("username") as string : req.session!.user.name} required />
        {errors['username'] ? <p className="text-red-500">{errors['username']}</p> : null}
        <p className="text-sm text-gray-500">Meno musí mať dlžku 3 až 20 znakov a musí ťa jednoznačne identifikovať (Ako ťa máme volať).</p>
        <label htmlFor="pass">Heslo</label>
        <input type="password" name="password" id="pass" required value={data.has("password") ? data.get("password") as string : undefined} />
        <label htmlFor="passCheck">Heslo znovu</label>
        <input type="password" name="passwordCheck" id="passCheck" required value={data.has("passwordCheck") ? data.get("passwordCheck") as string : undefined} />
        <p className="text-sm text-gray-500">Heslo si môžeš zvoliť hocijake avšak neskôr si ho nevieš zmeniť.</p>
        {errors['passwordCheck'] ? <p className="text-red-500">{errors['passwordCheck']}</p> : null}
        <div className="flex justify-between my-3">
          <label htmlFor="terms">Súhlasím s <a href="/static/terms-and-conditions.pdf" className="text-blue-300" target="_blank">podmienkami používania aplikácie</a></label>
          <input type="checkbox" name="terms" id="terms" checked={data.has("terms") && data.get("terms") === 'on'} />
        </div>
        {errors['terms'] ? <p className="text-red-500">{errors['terms']}</p> : null}
        <input type="submit" className="btn" value="Aktivovať" />
      </form>
    </div>
  )
}

export async function get(req: SessionRequest) {
  const hasSession = req.sessionValid
  req.sessionValid = false
  const page = await renderPage(
    login({}, req),
    req,
  )
  if (hasSession)
    req.sessionValid = true
  return page
}


export async function post(req: SessionRequest) {
  const hasSession = req.sessionValid
  req.sessionValid = false
  const data = req.data as FormData
  const errors: Record<string, string> = {}
  const validName = /^[a-zA-Z0-9_À-ž\s]{3,20}$/
  const userName = data.get('username') as string
  if (!data.has('username'))
    errors['username'] = 'Meno je povinné'
  if (userName.match(validName) === null)
    errors['username'] = 'Meno nespĺňa požiadavky'
  if (!data.has('password') || data.get('password') === '')
    errors['password'] = 'Heslo je povinné'
  if (!data.has('passwordCheck') || data.get('passwordCheck') === '')
    errors['passwordCheck'] = 'Heslo je povinné'
  if (data.get('password') !== data.get('passwordCheck'))
    errors['passwordCheck'] = 'Heslá sa nezhodujú'
  if (!data.has('terms'))
    errors['terms'] = 'Musíte súhlasiť s podmienkami'
  const user = await db.user.findFirst({
    where: {
      name: userName,
    },
  })
  if (user !== null && user.email !== req.session!.user.email)
    errors['username'] = `Meno "${userName}" je už obsadené`


  if (Object.keys(errors).length > 0) {
    const page = await renderPage(
      login(errors, req, req.data),
      req,
    )
    if (hasSession)
      req.sessionValid = true
    return page
  } else {
    await db.user.update({
      where: {
        email: req.session!.user.email,
      },
      data: {
        name: userName,
        password: await Bun.password.hash(data.get('password') as string),
        activated: true,
      }
    })

    return setSession(Response.redirect('/'), {
      ...req.session!,
      user: {
        ...req.session!.user,
        name: userName,
      }
    })
  }
}
