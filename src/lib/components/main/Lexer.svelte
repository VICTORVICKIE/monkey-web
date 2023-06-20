<script lang="ts">
    import { lexer, default as wasm_init, type InitOutput } from 'monkey-wasm';
    import { onMount } from 'svelte';
    import { highlight } from '../../monokai';
    import { code, type Token } from '../../types';

    let rows: Token[][] = [[]];
    let wasm: InitOutput;

    onMount(async () => (wasm = await wasm_init()));
    $: if (wasm) rows = lexer($code);
</script>

<div class="flex h-fit flex-col gap-4 p-24">
    {#each rows as tokens}
        <div class="mx-auto my-auto flex h-12 gap-4">
            {#each tokens as { tag, token_type: { type, value }, position: { column, line, width } }}
                {@const color = highlight[tag]}
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div class="dropdown-middle dropdown-hover dropdown h-fit">
                    <div
                        tabindex="0"
                        class="btn-md btn border-opacity-0 bg-transparent normal-case
                                                text-base-content outline hover:bg-transparent {color}"
                    >
                        {type.toUpperCase()}{value ? `: ${value}` : ''}
                    </div>
                    <div
                        tabindex="0"
                        class="compact card dropdown-content rounded-box w-20 bg-base-100 p-2 shadow"
                    >
                        Col: {column}<br />
                        Line: {line}<br />
                        Width: {width}
                    </div>
                </div>
            {/each}
        </div>
    {/each}
</div>
<div class="toast md:hidden">
    <div class="alert">
        <span>Scroll Right in Mobile</span>
    </div>
</div>

<style>
    .dropdown-middle .dropdown-content {
        transform: translateX(-50%);
        left: 50%;
        bottom: 110%;
        top: auto;
        right: auto;
        transform-origin: bottom;
    }
</style>
