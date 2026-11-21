// Syntax highlighting in the colors of the listings setup of the beamer theme
// (\pythonstyle): bold accent keywords, green strings, light blue comments.

const tueai = {
  name: 'tueai',
  type: 'light' as const,
  colors: {
    'editor.foreground': '#1a3a5b', // TueAIdarkblue
    'editor.background': '#f6f6f6', // TueAIgray
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#85cbd2' }, // TueAIlightblue
    },
    {
      scope: ['string', 'punctuation.definition.string'],
      settings: { foreground: '#77dd9f' }, // TueAIoceangreen
    },
    {
      scope: [
        'keyword.control',
        'keyword.other',
        'keyword.operator.logical',
        'keyword.operator.new',
        'keyword.operator.expression',
        'storage.type',
        'storage.modifier',
        'constant.language',
        'variable.language',
      ],
      settings: { foreground: '#ea4b2e', fontStyle: 'bold' }, // TueAIaccent
    },
    {
      scope: ['support.function', 'support.type', 'entity.name.type', 'entity.name.class'],
      settings: { fontStyle: 'italic' },
    },
  ],
}

export default () => ({
  themes: {
    light: tueai,
    dark: tueai,
  },
})
