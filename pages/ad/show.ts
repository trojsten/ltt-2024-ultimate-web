import type { SessionRequest } from "@session";
import { startAdWatch } from ".";
import getConfig from "@config";


export async function get(req: SessionRequest) {
  if (req.session?.ad !== undefined) {
    return new Response('You already are watching an ad', { status: 400 })
  }

  const backUrl = req.parsedUrl.searchParams.get("back") ?? '/'
  if (!getConfig().ads.enabled) {
    return Response.redirect(backUrl)
  }
  try {
    return startAdWatch(req, backUrl, req.parsedUrl.searchParams.get("skippable") == '1')
  } catch (e) {
    return Response.redirect(backUrl)
  }
}
