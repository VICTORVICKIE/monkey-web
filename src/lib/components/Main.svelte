<script lang="ts">
    import { highlight } from '../monokai';
    import { tab } from '../types';
    import { Ast, Editor, Lexer, Output } from './main';
</script>

<main>
    <div class="grid-row-[1fr_auto] relative grid h-full overflow-auto {highlight.background}">
        {#if $tab === 'Editor'}
            <Editor />
        {:else if $tab === 'Lexer'}
            <Lexer />
        {:else if $tab === 'AST'}
            <Ast />
        {:else}
            <Output />
        {/if}
    </div>
</main>

<style>
    main {
        grid-area: main;
        overflow: hidden;
    }
</style>
