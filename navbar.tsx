import type { SessionRequest } from "@session";

export function navbar(req: SessionRequest) {
    const user = req.session?.user;
    return (
        <div>
            <nav>
                <ul>
                    <li><a href={'/user/' + user?.id}>Profil</a></li>
                    <li><a href="/shop">Obchod</a></li>
                </ul>
            </nav>
        </div>
    )
}