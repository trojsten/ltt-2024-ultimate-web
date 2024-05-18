import { renderPage } from '@/main'
import { type SessionRequest } from '@session'

function home(req: SessionRequest) {
  return (
    <div>
      <div className="bg-red-500">
        <h1>Home</h1>
        <p>Session: {req.session?.user.name}</p>
        <p>Welcome to the home page.</p>
        <form action="/" method="post">
          <input type="text" name="test" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export function get(req: SessionRequest) {
  return renderPage(home(req), req)
}
