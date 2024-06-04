import { renderPage } from "@main";
import type { SessionRequest } from "@session";

function Reservations(req: SessionRequest) {
  return (
    <div>
      <h1>Reservations</h1>
      <p>Reservations are not yet available.</p>
    </div>
  )
}



export async function get(req: SessionRequest) {
  return renderPage(Reservations(req), req)
}
