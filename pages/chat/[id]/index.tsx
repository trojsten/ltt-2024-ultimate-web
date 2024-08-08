// import db from '@db'
// import { Icon } from '@iconify-icon/react'
// import { renderPage } from '@main'
// import type { SessionRequest } from '@session'
// import markdownit from 'markdown-it'
// import hljs from 'highlight.js'
// import { full } from 'markdown-it-emoji'
// import texmath from 'markdown-it-texmath'
// import katex from 'katex'
// import mime from 'mime'

// export async function getChannelList(req: SessionRequest) {
//   let md = markdownit({
//     breaks: true,
//     langPrefix: 'language-',
//     linkify: true,
//     typographer: true,
//     quotes: '„“‚‘',
//     highlight: (str, lang) =>
//       hljs.getLanguage(lang)
//         ? hljs.highlight(str, {
//             language: lang
//           }).value
//         : hljs.highlightAuto(str).value
//   })
//     .use(full)
//     .use(texmath.use(katex), {
//       engine: katex,
//       delimiters: 'dollars',
//       katexOptions: { macros: { '\\RR': '\\mathbb{R}' } }
//     })

//   const channel = await db.channel.findFirst({
//     where: {
//       id: parseInt(req.params.id)
//     },
//     select: {
//       name: true,
//       messages: {
//         select: {
//           content: true,
//           createdAt: true,
//           user: {
//             select: {
//               id: true,
//               name: true,
//               profileImage: true
//             }
//           },
//           attachment: true
//         }
//       }
//     }
//   })

//   return (
//     <div className="container w-full md:w-2/3 m-auto">
//       <h1 className="text-2xl my-2">{channel?.name}</h1>
//       {channel?.messages.map((message) => (
//         <section
//           className="grid items-end gap-0.5 overflow-auto snap-end my-4 "
//           style={
//             message.user.id === req.session!.user.id
//               ? { direction: 'rtl', grid: 'auto-flow / 2em 1fr' }
//               : { grid: 'auto-flow / 2em 1fr' }
//           }
//         >
//           <img
//             src={message.user.profileImage || '/static/profile.png'}
//             width="32"
//             height="32"
//             alt={message.user.name}
//             className="w-8 h-8 rounded-full"
//           />
//           <div className="w-fit m-0 bg-indigo-600 text-white rounded-e-xl rounded-t-xl p-2">
//             <div
//               className="font-bold underline"
//               style={
//                 message.user.id === req.session!.user.id
//                   ? { direction: 'ltr' }
//                   : {}
//               }
//             >
//               {message.user.name}
//             </div>
//             <div
//               className="prose prose-invert"
//               style={
//                 message.user.id === req.session!.user.id
//                   ? { direction: 'ltr' }
//                   : {}
//               }
//               dangerouslySetInnerHTML={{ __html: md.render(message.content) }}
//             />
//             {message.attachment ? <img src={message.attachment} /> : undefined}
//           </div>
//           <div
//             className="w-fit flex gap-1 flex-wrap order-2"
//             style={
//               message.user.id === req.session!.user.id
//                 ? { direction: 'ltr', gridColumn: 2 }
//                 : { gridColumn: 2 }
//             }
//           >
//             <Icon
//               icon="mdi:emoticon-plus-outline"
//               width="1.5em"
//               height="1.5em"
//             />
//           </div>
//           <time
//             className="w-fit text-gray-700 text-xs italic"
//             style={
//               message.user.id === req.session!.user.id
//                 ? { direction: 'ltr', gridRow: 3, gridColumn: 2 }
//                 : { gridRow: 3, gridColumn: 2 }
//             }
//           >
//             {new Date().getDate() === message.createdAt.getDate()
//               ? message.createdAt.toLocaleTimeString('sk-SK', {
//                   minute: 'numeric',
//                   hour: 'numeric'
//                 })
//               : new Date().getTime() - 604800000 <= message.createdAt.getTime()
//                 ? message.createdAt.toLocaleDateString('sk-SK', {
//                     weekday: 'short'
//                   })
//                 : message.createdAt.toLocaleDateString('sk-SK')}
//           </time>
//         </section>
//       ))}
//       <form
//         method="post"
//         id="form"
//         encType="multipart/form-data"
//         className="flex gap-2 items-center relative border-b-3 border-b-gray-300 z-10"
//       >
//         <Icon
//           id="attachement"
//           icon="mdi:attach-file"
//           width="1.5em"
//           height="1.5em"
//         />

//         <textarea
//           name="message"
//           id="message"
//           placeholder="napíš správu => Shift + Enter"
//           rows={parseInt('1')}
//           className="w-auto flex-1 leading-6 m-0 p-0 resize-none border-none overflow-hidden whitespace-pre-wrap break-words outline-none"
//         />
//         <Icon icon="mdi:emoji" width="1.5em" height="1.5em" id="emoji" />
//         <Icon
//           icon="mdi:send-variant"
//           width="1.5em"
//           height="1.5em"
//           id="submit"
//         />
//         <input
//           className="hidden"
//           name="mediaCapture"
//           id="mediaCapture"
//           type="file"
//           accept="image/*"
//         />
//       </form>
//     </div>
//   )
// }

// export async function get(req: SessionRequest) {
//   return renderPage(await getChannelList(req), req)
// }

// export async function post(req: SessionRequest): Promise<Response> {
//   const formdata = req.data!

//   const message = formdata.get('message') as string
//   const media = formdata.get('mediaCapture') as File
//   const contentId = crypto.randomUUID()
//   console.log(formdata.get('mediaType'))
//   if (media) {
//     await Bun.write(`uploads/${contentId}`, media)
//     await db.Message.create({
//       data: {
//         content: message,
//         attachment: `/uploads/${contentId}`,
//         channelId: parseInt(req.params.id),
//         userId: req.session!.user.id
//       }
//     })
//   } else {
//     await db.Message.create({
//       data: {
//         content: message,
//         channelId: parseInt(req.params.id),
//         userId: req.session!.user.id
//       }
//     })
//   }

//   return Response.redirect(`/chat/${req.params.id}`)
// }
