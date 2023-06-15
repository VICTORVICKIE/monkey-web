<script lang="ts">
    import { javascript } from "@codemirror/lang-javascript";
    import { ChevronDown } from "lucide-svelte";
    import { lexer, default as wasm_init, type InitOutput } from "monkey-wasm";
    import { onMount } from "svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { Monokai, highlight } from "./lib/monokai";
    import { examples, type Token } from "./lib/types";

    let tab = "Editor";
    let code = "";
    let rows: Token[][];

    let wasm: InitOutput;

    onMount(async () => (wasm = await wasm_init()));

    function call_lexer(code: string) {
        rows = [[]];
        let tokens: Token[] = lexer(code);
        let current_line = 0;

        for (const token of tokens) {
            // mapping line to idx
            let idx = token.position.line - 1;
            if (idx > current_line) {
                current_line = idx;
                rows.push([]);
            }
            rows[current_line]?.push(token);
        }
    }

    $: if (wasm) call_lexer(code);
</script>

<svelte:head>
    <title>Monkey Lang - {tab}</title>
</svelte:head>

<section class="h-screen">
    <header class="flex p-2 justify-between items-center bg-base-200 text-lg">
        <div class="flex justify-center items-center content-start gap-2">
            <div>Monkey Lang Interpreter</div>
            <a href="https://monkeylang.org/" target="_blank">ⓘ </a>
            <div class="dropdown dropdown-hover dropdown-bottom">
                <ChevronDown />
                <div
                    class="dropdown-content z-10 card card-compact w-64 p-2 shadow bg-base-200 border border-neutral text-primary-content"
                >
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <ul class="menu rounded-box">
                        <li class="menu-title">Examples</li>
                        <li>
                            <a on:click={() => (code = examples.one_line)}
                                >One Line</a
                            >
                        </li>
                        <li>
                            <a on:click={() => (code = examples.two_line)}
                                >Two Line</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="tabs">
            <button
                class:tab-active={tab === "Editor"}
                class="tab tab-bordered"
                on:click={() => (tab = "Editor")}>Editor</button
            >
            <button
                class:tab-active={tab === "Lexer"}
                class="tab tab-bordered"
                on:click={() => (tab = "Lexer")}>Lexer</button
            >
            <button
                class:tab-active={tab === "AST"}
                class="tab tab-bordered"
                on:click={() => (tab = "AST")}>AST (WIP)</button
            >
            <button
                class:tab-active={tab === "Output"}
                class="tab tab-bordered"
                on:click={() => (tab = "Output")}>Output (WIP)</button
            >
        </div>
        <a
            class="underline"
            target="_blank"
            href="https://www.github.com/VICTORVICKIE">Victor Vickie</a
        >
    </header>
    <main>
        <div
            class="relative h-full grid grid-row-[1fr_auto] {highlight.background} overflow-auto"
        >
            {#if tab === "Editor"}
                <CodeMirror
                    bind:value={code}
                    class="overflow-auto"
                    theme={Monokai}
                    lang={javascript({ typescript: true })}
                    styles={{
                        "&": {
                            height: "100%",
                            fontSize: "1.2em",
                            lineHeight: "1.4em",
                        },
                        ".cm-gutters": {
                            marginRight: "0.15em",
                        },
                    }}
                />
            {:else if tab === "Lexer"}
                <div class="flex flex-col h-fit p-24 gap-4">
                    {#each rows as tokens}
                        <div class="flex mx-auto h-12 my-auto gap-4">
                            {#each tokens as { tag, token_type: { type, value }, position: { column, line, width } }}
                                {@const color = highlight[tag]}
                                <div
                                    class="dropdown dropdown-middle dropdown-hover h-fit"
                                >
                                    <div
                                        class="btn btn-sm normal-case outline text-base-content
                            bg-transparent hover:bg-transparent {color}"
                                    >
                                        {type.toUpperCase()}{value
                                            ? `: ${value}`
                                            : ""}
                                    </div>
                                    <div
                                        class="card compact dropdown-content shadow bg-base-100 rounded-box w-20 p-2"
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
            {:else if tab === "AST"}
                <div class="mx-auto my-auto">WIP</div>
            {:else}
                <div class="mx-auto my-auto">WIP</div>
            {/if}
        </div>
    </main>
</section>

<style>
    .dropdown-middle .dropdown-content {
        transform: translateX(-50%);
        left: 50%;
        bottom: 110%;
        top: auto;
        right: auto;
        transform-origin: bottom;
    }

    section {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 4rem auto;
        grid-template-areas:
            "header header"
            "main main";
    }

    header {
        grid-area: header;
    }

    main {
        grid-area: main;
        overflow: hidden;
    }
</style>
