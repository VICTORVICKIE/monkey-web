<script>
    import { javascript } from '@codemirror/lang-javascript';
    import CodeMirror from 'svelte-codemirror-editor';
    import { Monokai } from '../../monokai';
    import { code } from '../../types';
</script>

<CodeMirror
    bind:value={$code}
    class="overflow-auto"
    theme={Monokai}
    lang={javascript({ typescript: true })}
    styles={{
        '&': {
            height: '100%',
            fontSize: '1.2em',
            lineHeight: '1.4em'
        },
        '.cm-gutters': {
            marginRight: '0.15em'
        }
    }}
/>
