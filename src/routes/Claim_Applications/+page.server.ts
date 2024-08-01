import NeucronSDK from "neucron-sdk";
import { createPool } from '@vercel/postgres'
import { POSTGRES_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

const db = createPool({ connectionString: POSTGRES_URL })
const client = await db.connect();


export async function load({ locals }) {
    if (locals.authUser.issuperuser == "false") throw redirect(302, '/Dashboard');
    const { rows: claims } = await db.query(`SELECT * FROM claims`)
    for (let i = 0; i < claims.length; i++) {
        const { rows: user } = await db.query(`SELECT * FROM users where id = ${claims[i].user_id}`)
        claims[i].username = user[0].name;
        claims[i].paymail = user[0].paymail;
    }
    return {
        claims: claims,
    }
}

export const actions = {

    Approve: async ({ request }: RequestEvent) => {
        const data = await request.formData();

        const claim_id = data.get('claim_id');
        const paymail = data.get('paymail');
        const amount = data.get('amount');

        if (!claim_id || !paymail || !amount) { return { error: true, msg: "Something went wrong!" } }
        const neucron = new NeucronSDK();
        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;

        const loginResponse = await authModule.login({ email: "sales@timechainlabs.io", password: "string" });
        const options = {
            outputs: [
                {
                    address: paymail,
                    note: 'fund issued by policy management',
                    amount: Number(amount)
                }
            ]
        };
        const payResponse = await neucron.pay.txSpend(options);
        await client.sql`update claims set claim_status='Approved' where claim_id=${claim_id}`
        return { success: true, payment: payResponse.data.txid };
    },
    Reject: async ({ request }: RequestEvent) => {
        const data = await request.formData();

        const claim_id = data.get('claim_id');
        console.log(claim_id);

        if (!claim_id) { return { error: true, msg: "Something went wrong!" } }

        await client.sql`update claims set claim_status='Rejected' where claim_id=${claim_id}`
        return { success: true };
    }
};




