import type { SessionRequest } from "@session";
import { startAdWatch } from ".";


export async function get(req: SessionRequest) {
  if (req.session?.ad !== undefined) {
    return new Response('You already are watching an ad', { status: 400 })
  }

  return startAdWatch(req, req.url)
}
