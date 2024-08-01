import { redirect, type RequestEvent } from "@sveltejs/kit";

export async function load({ locals }: RequestEvent) {
    if (!locals.authUser) throw redirect(302, '/Login');
}