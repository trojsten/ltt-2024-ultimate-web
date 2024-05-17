import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default db


export async function getTeamForUser(userId: number) {
    return db.team.findFirst({
        where: {
            users: {
                some: {
                    id: userId
                }
            }
        }
    })
}