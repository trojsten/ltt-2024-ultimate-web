import { renderPage } from "@/main";
import { setSession, type SessionRequest } from "@session";

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
  );
}

export function get(req: SessionRequest) {
  return renderPage(home(req));
}

// export async function post(request: SessionRequest): Promise<Response> {
//   const formData = await request.data;
//   const test = formData.get("test") as string;
//   const res = await renderPage(home(request));
//   return setSession(res, { name: test });
// }