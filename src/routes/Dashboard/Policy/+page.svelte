<script lang="ts">
    import Table from "$lib/Table_policy.svelte";
    import { isOverlayOpen } from "../../../store/overlayStore";
    import Overlay from "$lib/Overlay.svelte";
    export let data;
    export let form;
</script>

<svelte:head>
    <title>Policy</title>
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

<Table policy={data.policy} />

<div
    class="mt-10 pt-10 w-full max-w-3xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
    <form method="POST" action="?/create">
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                >
                    Policy Number
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="policy_id"
                    type="number"
                    placeholder="Enter number"
                    name="policy_id"
                />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                >
                    Policy Provider
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="provider"
                    type="text"
                    placeholder="Enter Provider"
                    name="provider"
                />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                >
                    Policy Coverage
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="coverage"
                    type="number"
                    placeholder="Enter Coverage"
                    name="coverage"
                />
            </div>
            <button
                type="submit"
                class="bg-orange-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-3 py-2 rounded"
            >
                Create Policy
            </button>
        </div>
    </form>
    {#if form?.success}
        <p class="pt-2">Added new Policy!</p>
    {/if}
</div>
