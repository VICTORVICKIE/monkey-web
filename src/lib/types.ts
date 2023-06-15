export type TokenType = { type: string, value?: string }

export type Position = { line: number, column: number, width: number }

export type Token = {
    tag: string
    token_type: TokenType
    literal: string
    position: Position
}

export const examples = {
    one_line: `let nice = 69;`,
    two_line: `let nice = 69;
let high = 420;`
}