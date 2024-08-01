<script lang="ts">
    import { isOverlayOpen } from "../../../store/overlayStore";
    import Overlay from "$lib/Overlay.svelte";
    export let data;
    export let claims = data.claims;
    export let form;
</script>

<svelte:head>
    <title>Claims</title>
</svelte:head>

{#if $isOverlayOpen}
    <Overlay>
        <div class=" h-80">
            <p
                class="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
            >
                Claim Id : {form?.details?.claim_id}
            </p>
            <p
                class="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
            >
                Requested Amount :{form?.details?.amount}
            </p>
            <p
                class="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
            >
                Bill : {form?.details?.bill}
            </p>
            <p
                class="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
            >
                Description : {form?.details?.description}
            </p>
            <p
                class="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
            >
                Claim Status : {form?.details?.claim_status}
            </p>
            <p
                class="px-6 py-3 text-left text-base font-medium text-black uppercase tracking-wider"
            >
                Created At : {form?.details?.createdAt
                    .toString()
                    .split("GMT")[0]}
            </p>
        </div>
    </Overlay>
{/if}

<div
    class="mt-10 pt-10 w-full max-w-4xl p-5 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
    <div class="flex items-center justify-between mb-4">
        <div class="space-y-1">
            <h2 class="text-xl font-semibold">List of Your Claims</h2>
            <p class="text-sm text-gray-500">Fetched {claims.length} Claims</p>
        </div>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-400">
            <tr>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Claim Id</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Status</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Update History</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Details</th
                >
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each claims as claim (claim.claim_id)}
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">{claim.claim_id}</td
                    >
                    <td class="px-6 py-4 whitespace-nowrap">{claim.status}</td>
                    <td class="px-6 py-4 whitespace-nowrap"
                        >{claim.createdAt.toString().split("GMT")[0]}</td
                    >
                    <td class="px-6 py-4 whitespace-nowrap">
                        <form method="GET" action="?/view" class="inline-block">
                            <input
                                type="hidden"
                                name="claim_id"
                                value={claim.claim_id}
                            />
                            <button
                                class=" bg-orange-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-xl"
                                type="submit"
                                on:click={() => {
                                    isOverlayOpen.set(true);
                                }}
                            >
                                View Details
                            </button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div
    class="mt-10 pt-10 w-full max-w-5xl p-5 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
    <form method="POST" action="?/create">
        <h1 class=" text-2xl font-bold">Fill A New Claim</h1>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full mt-5 md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="claim_id"
                >
                    Policy Id
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="claim_id"
                    type="number"
                    placeholder="Enter Policy Id"
                    name="claim_id"
                />
            </div>
            <div class="w-full mt-5 md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="amount"
                >
                    Claim Amount
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="amount"
                    type="number"
                    placeholder="Enter claimed amount "
                    name="amount"
                />
            </div>
            <div class="w-full mt-5 md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="desc"
                >
                    Claim Description
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="desc"
                    type="text"
                    placeholder="Describe the reason"
                    name="desc"
                />
            </div>

            <div class="w-full mt-5 md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="bill"
                    >Attach Digital Bill
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="bill"
                    type="url"
                    placeholder="Provide the Url of the Bill"
                    name="bill"
                />
            </div>
            <div class="w-full mt-5 md:w-1/3 px-3 mb-6 md:mb-0">
                <button
                    class="bg-orange-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-xl"
                    type="submit">Fill Claim</button
                >
            </div>
        </div>
        {#if form?.success}
            <p class="pt-2">A Claim has been raised!</p>
        {/if}
        {#if form?.error}
            <p class="pt-2">${form?.msg}</p>
        {/if}
    </form>
</div>
