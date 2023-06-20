<script lang="ts">
    import { Header, Main } from './lib/components';
    import { tab } from './lib/types';
</script>

<svelte:head>
    <title>Monkey Lang - {$tab}</title>
</svelte:head>

<section class="h-screen">
    <Header />
    <Main />
</section>

<style>
    section {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 6rem auto;
        grid-template-areas:
            'header header'
            'main main';
    }
</style>
