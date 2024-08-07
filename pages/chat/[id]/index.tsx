import db from '@db'
import { Icon } from '@iconify-icon/react'
import { renderPage } from '@main'
import type { SessionRequest } from '@session'

export async function getChannelList(req: SessionRequest) {
  const channel = await db.channel.findFirst({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      name: true,
      messages: {
        select: {
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })

  return (
    <div className="container w-full md:w-2/3 m-auto">
      <h1 className="text-2xl my-2">{channel?.name}</h1>
      <div
        id="form"
        className="flex gap-2 items-center relative border-b-3 border-b-gray-300 z-10"
      >
        <Icon
          icon="mdi:attach-file"
          width="1.5em"
          height="1.5em"
          id="attachement"
        />

        <textarea
          id="message"
          placeholder="napíš správu => Shift + Enter"
          rows={parseInt('1')}
          className="w-auto flex-1 leading-6 m-0 p-0 resize-none border-none overflow-hidden whitespace-pre-wrap break-words outline-none"
        />
        <Icon icon="mdi:emoji" width="1.5em" height="1.5em" id="emoji" />
        <Icon
          icon="mdi:send-variant"
          width="1.5em"
          height="1.5em"
          id="submit"
        />
        <input
          className="hidden"
          id="mediaCapture"
          type="file"
          accept="image/*"
        />
      </div>
    </div>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(await getChannelList(req), req)
}
