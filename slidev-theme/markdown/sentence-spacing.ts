/**
 * A markdown-it rule that widens the space at the end of a sentence.
 *
 * TeX sets the space after `.`, `?`, `!` and `:` a third wider than a normal
 * word space (\nonfrenchspacing), unless the punctuation follows a capital
 * letter, as in "P. Hennig". Browsers know nothing of the kind, and the few
 * pixels add up until lines break at different words than in the beamer
 * theme. This rule wraps those spaces in a <span>, and styles/inner.css
 * widens them. (The space is written as `{{ ' ' }}` because Vue drops a
 * <span> that contains nothing but whitespace.)
 */

// sentence punctuation, optionally followed by closing brackets or quotes
const SENTENCE_END = /(?<![A-Z])[.?!:][)\]'"’”]*$/
const SENTENCE_SPACE = /(?<![A-Z])([.?!:][)\]'"’”]*) (?=\S|$)/g

interface Token { type: string, content: string }
interface State { tokens: (Token & { children: Token[] | null })[], Token: new (type: string, tag: string, nesting: number) => Token }
interface MarkdownIt { core: { ruler: { push: (name: string, rule: (state: State) => void) => void } } }

export function sentenceSpacing(md: MarkdownIt) {
  md.core.ruler.push('tueai_sentence_spacing', (state) => {
    const token = (type: string, content: string) => Object.assign(new state.Token(type, '', 0), { content })
    const wideSpace = () => token('html_inline', `<span class="tueai-sentence-space">{{ ' ' }}</span>`)

    for (const block of state.tokens) {
      if (block.type !== 'inline' || !block.children)
        continue

      block.children = block.children.flatMap((child, i, children) => {
        // a sentence that ends at a line break of the Markdown source
        if (child.type === 'softbreak' && children[i - 1]?.type === 'text' && SENTENCE_END.test(children[i - 1].content))
          return [wideSpace()]
        if (child.type !== 'text')
          return [child]

        // "One. Two" -> "One." + wide space + "Two"
        const parts = child.content.replace(SENTENCE_SPACE, '$1\n').split('\n')
        return parts.flatMap((part, n) => n === 0 ? [token('text', part)] : [wideSpace(), token('text', part)])
      })
    }
  })
}
