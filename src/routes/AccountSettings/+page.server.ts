import { createPool } from '@vercel/postgres'
import { POSTGRES_URL } from '$env/static/private'
import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function load({ locals }: RequestEvent) {
    if (!locals.authUser) throw redirect(302, '/Login');
    const db = createPool({ connectionString: POSTGRES_URL })
    if (!locals.authUser) {
        return { error: true, msg: "user not logged in" }
    }
    const { rows: users } = await db.query(`SELECT * FROM users where id = ${locals.authUser.id}`)
    return {
        user: users[0],
    }

}
export const actions = {

    update: async ({ request, locals }: RequestEvent) => {
        const data = await request.formData();
        const db = createPool({ connectionString: POSTGRES_URL })
        const client = await db.connect();

        const name = data.get('name');
        const password = data.get('password');
        const paymail = data.get('paymail');
        const id = locals.authUser.id;
        if (!name || !password || !paymail) {
            return { error: true, msg: "all fields are required!" }
        }
        const updateUser = await client.sql`UPDATE users
        SET name = ${name} ,password=${password}, paymail=${paymail} where id =${id};`
        return { success: true };
    }
}