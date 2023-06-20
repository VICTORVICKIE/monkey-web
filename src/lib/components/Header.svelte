<script lang="ts">
    import { code, examples, tab } from '../types';
</script>

<header class="text-md flex items-center justify-between gap-4 bg-base-200 p-2 md:text-lg">
    <div class="flex items-center">
        <a class="underline underline-offset-2" href="https://monkeylang.org" target="_blank"
            >Monkey Lang Interpreter</a
        >
        <div class="dropdown-bottom dropdown-hover dropdown mt-1 h-6">
            <button><iconify-icon icon="lucide:chevron-down" width="24" height="24" /></button>
            <div
                class="card dropdown-content card-compact z-10 w-64 border border-neutral bg-base-200 p-2 text-primary-content shadow"
            >
                <ul class="menu rounded-box">
                    <li class="menu-title">Examples</li>
                    <li>
                        <button on:click={() => ($code = examples.one_line)}>One Line</button>
                    </li>
                    <li>
                        <button on:click={() => ($code = examples.two_line)}>Two Line</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="tabs">
        <button
            class:tab-active={$tab === 'Editor'}
            class="tab-bordered tab"
            on:click={() => ($tab = 'Editor')}>Editor</button
        >
        <button
            class:tab-active={$tab === 'Lexer'}
            class="tab-bordered tab"
            on:click={() => ($tab = 'Lexer')}>Lexer</button
        >
        <button
            class:tab-active={$tab === 'AST'}
            class="tab-bordered tab"
            on:click={() => ($tab = 'AST')}>AST</button
        >
        <button
            class:tab-active={$tab === 'Output'}
            class="tab-bordered tab"
            on:click={() => ($tab = 'Output')}>Output</button
        >
    </div>
    <a
        class="underline underline-offset-2"
        target="_blank"
        href="https://www.github.com/VICTORVICKIE">Victor Vickie</a
    >
</header>

<style>
    header {
        grid-area: header;
    }
</style>
