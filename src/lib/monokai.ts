import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

// Monokai color scheme
export const monokai = {
    background: '#272822',
    currentLine: '#373831',
    selection: '#49483E',
    foreground: '#F8F8F2',
    comment: '#75715E',
    red: '#F92672',
    orange: '#FD971F',
    yellow: '#E6DB74',
    green: '#A6E22E',
    cyan: '#A1EFE4',
    blue: '#66D9EF',
    purple: '#AE81FF'
};

export const highlight = {
    background: 'bg-[#272822]',
    keyword: 'outline-[#F92672]',
    boolean: 'outline-[#A6E22E]',
    identifier: 'outline-[#F8F8F2]',
    operator: 'outline-[#A1EFE4]'
};

/// The editor theme styles for Monokai.
export const monokaiTheme = EditorView.theme(
    {
        '&': {
            color: monokai.foreground,
            backgroundColor: monokai.background
        },

        '.cm-content': {
            caretColor: monokai.blue
        },

        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: monokai.blue
        },

        '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
            {
                backgroundColor: monokai.selection
            },

        '.cm-panels': {
            backgroundColor: monokai.background,
            color: monokai.foreground
        },
        '.cm-panels.cm-panels-top': {
            borderBottom: '2px solid black'
        },
        '.cm-panels.cm-panels-bottom': {
            borderTop: '2px solid black'
        },

        '.cm-searchMatch': {
            backgroundColor: '#72a1ff59',
            outline: '1px solid #457dff'
        },
        '.cm-searchMatch.cm-searchMatch-selected': {
            backgroundColor: '#6199ff2f'
        },

        '.cm-activeLine': {
            backgroundColor: monokai.currentLine
        },
        '.cm-selectionMatch': {
            backgroundColor: '#aafe661a'
        },

        '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bad0f847'
        },

        '.cm-gutters': {
            backgroundColor: monokai.background,
            color: monokai.comment,
            border: 'none'
        },

        '.cm-activeLineGutter': {
            backgroundColor: monokai.currentLine
        },

        '.cm-foldPlaceholder': {
            backgroundColor: 'transparent',
            border: 'none',
            color: monokai.comment
        },

        '.cm-tooltip': {
            border: 'none',
            backgroundColor: '#353a42'
        },
        '.cm-tooltip .cm-tooltip-arrow:before': {
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
        },
        '.cm-tooltip .cm-tooltip-arrow:after': {
            borderTopColor: '#353a42',
            borderBottomColor: '#353a42'
        },
        '.cm-tooltip-autocomplete': {
            '& > ul > li[aria-selected]': {
                backgroundColor: monokai.selection,
                color: monokai.foreground
            }
        }
    },
    { dark: true }
);

/// The highlighting style for code in the Monokai theme.
export const monokaiHighlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: monokai.red },
    { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: monokai.orange },
    { tag: [t.function(t.variableName), t.labelName], color: monokai.yellow },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: monokai.green },
    { tag: [t.definition(t.name), t.separator], color: monokai.foreground },
    {
        tag: [
            t.typeName,
            t.className,
            t.number,
            t.changed,
            t.annotation,
            t.modifier,
            t.self,
            t.namespace
        ],
        color: monokai.blue
    },
    {
        tag: [
            t.operator,
            t.operatorKeyword,
            t.url,
            t.escape,
            t.regexp,
            t.link,
            t.special(t.string)
        ],
        color: monokai.cyan
    },
    { tag: [t.meta, t.comment], color: monokai.comment },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: monokai.foreground, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: monokai.purple },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: monokai.green },
    { tag: [t.processingInstruction, t.string, t.inserted], color: monokai.cyan },
    { tag: t.invalid, color: monokai.red }
]);

/// Extension to enable the Monokai theme (both the editor theme and the highlight style).
export const Monokai: Extension = [monokaiTheme, syntaxHighlighting(monokaiHighlightStyle)];
