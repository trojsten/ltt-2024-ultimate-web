import db from "@db";
import type { SessionRequest } from "@session";

export async function post(req: SessionRequest): Promise<Response> {
    const user = req.session!.user;
    const team = await db.team.findFirst({
        where: {
            users: {
                some: {
                    id: user.id
                }
            }
        }
    });
    const item = await db.item.findUnique({
        where: {
            id: parseInt(req.params.itemID),
        }
    });

    if(!team || !item || item.amount == 0) {
        return new Response("Item or team not found", {status: 404});
    }

    if(team!.money < item!.cost) {
        return new Response("Nemáš dostatok peňazí", {status: 400});
    }

    await db.item.update({
        where: {
            id: item!.id
        },
        data: {
            amount: {
                decrement: 1
            }
        }
    })

    await db.transaction.create({
        data: {
            amount: item!.cost,
            team: {
                connect: {
                    id: team!.id
                }
            },
            user: {
                connect: {
                    id: user.id
                }
            },
            item: {
                connect: {
                    id: item!.id
                }
            },
        }
    })

    await db.team.update({
        where: {
            id: team!.id
        },
        data: {
            money: {
                decrement: item!.cost
            }
        }
    })

    return Response.redirect("/shop");
}
