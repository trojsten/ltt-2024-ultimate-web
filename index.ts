import { PrismaClient } from "@prisma/client";
import { SessionRequest } from "./session";

Bun.serve({
  fetch: async (Request) => {
    const path = new URL(Request.url).pathname;
    if(Request.method == 'GET' && path.startsWith("/static")){
      const file = Bun.file("." + path)
      if(!await file.exists()){
        return new Response("Not Found", {status: 404})
      }

      return new Response(file)
    }

    const router = new Bun.FileSystemRouter({
      dir: "./pages",
      style: "nextjs"
    })

    const route = router.match(Request);
    if(!route){
      return new Response("Not Found", {status: 404})
    }
    let sessReq = new SessionRequest(Request)

    const page = await import(route.filePath)
    
    let res: Response | undefined;
    if(sessReq.sessionValid == false){
      if(new URL(Request.url).pathname != "/login"){
        return Response.redirect("/login?redirect=" + encodeURIComponent(Request.url))
      }      
    }

    if(Request.method == 'POST') {
      res = page.post?.(sessReq)
    } else if(Request.method == 'GET') {
      res = page.get?.(sessReq)
    }

    return res ?? new Response("Method Not Allowed", {status: 405})
  },
  port: 3000,
});
