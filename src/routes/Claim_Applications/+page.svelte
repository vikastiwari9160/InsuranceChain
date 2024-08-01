<script lang="ts">
    export let data;
    export let claims = data.claims;
</script>

<svelte:head>
    <title>Claims</title>
</svelte:head>
<div
    class="mt-10 pt-10 w-full max-w-6xl p-5 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
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
                >
                    Claim Id
                </th>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                    User name
                </th>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Status</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Application Date</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Coverage Requested</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Bill</th
                ><th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Approve</th
                ><th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Reject</th
                >
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each claims as claim (claim.claim_id)}
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">{claim.claim_id}</td
                    >
                    <td class="px-6 py-4 whitespace-nowrap">{claim.username}</td
                    >
                    <td class="px-6 py-4 whitespace-nowrap">{claim.status}</td>
                    <td class="px-6 py-4 whitespace-nowrap"
                        >{claim.createdAt.toString().split("GMT")[0]}</td
                    >
                    <td class="px-6 py-4 whitespace-nowrap">{claim.amount}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-blue-800">
                        <a
                            class="hover:underline"
                            target="_blank"
                            href={claim.bill}>Bill</a
                        ></td
                    >
                    <td class="px-6 py-4 whitespace-nowrap">
                        <form action="?/Approve" method="post">
                            <input
                                type="hidden"
                                name="claim_id"
                                value={claim.claim_id}
                            />
                            <input
                                type="hidden"
                                name="paymail"
                                value={claim.paymail}
                            />
                            <input
                                type="hidden"
                                name="amount"
                                value={claim.amount}
                            />
                            <button
                                class=" bg-orange-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-xl"
                                >Approve</button
                            >
                        </form>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                        <form action="?/Reject" method="post">
                            <input
                                type="hidden"
                                name="claim_id"
                                value={claim.claim_id}
                            />
                            <button
                                class=" bg-orange-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-xl"
                                >Reject</button
                            >
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
