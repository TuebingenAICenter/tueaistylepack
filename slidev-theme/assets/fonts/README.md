# Fonts

The webfonts of the theme. The files are taken unchanged from version 5.3.0 of
the [Fontsource](https://fontsource.org) packages, which repackage the fonts
as published by Google Fonts. Only the Latin and Latin Extended subsets and
the weights that the theme uses are included.

| Family | Package | Weights | License |
| --- | --- | --- | --- |
| Roboto Condensed | `@fontsource/roboto-condensed` | 300, 400, each with italic | [SIL OFL 1.1](LICENSE-roboto-condensed.txt) |
| Roboto Mono | `@fontsource/roboto-mono` | 400, 400 italic, 700 | [SIL OFL 1.1](LICENSE-roboto-mono.txt) |
| Plus Jakarta Sans | `@fontsource/plus-jakarta-sans` | 400, 500, 700 | [SIL OFL 1.1](LICENSE-plus-jakarta-sans.txt) |

The `LICENSE-*.txt` files are the license files of these packages, also
unchanged. To add a weight or a subset, copy the file from the package and add
a `@font-face` rule to [`styles/font-faces.css`](../../styles/font-faces.css).
