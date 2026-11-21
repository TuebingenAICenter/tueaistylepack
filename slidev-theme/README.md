# tuebingen.ai Slidev theme

A [Slidev](https://sli.dev) theme in the style of the Tübingen AI Center. It
renders like the [beamer theme](../beamer-theme) of this style pack, but the
slides are written in Markdown and are web pages: they can contain interactive
figures, and they can be handed to students as a link, as a single HTML file,
or as a PDF.

![The example deck in LaTeX and in Slidev](docs/comparison.jpg)

The same rules apply as for the rest of the style pack: the logos are
"all rights reserved", for use by faculty, employees and students of the
AI Center.

## Start a deck

You need [Node.js](https://nodejs.org) 20 or newer, and Git LFS (as for the
beamer theme). The theme is used straight from this repository, in the same
way as the LaTeX themes: add the style pack as a submodule and start from a
copy of the example deck.

```sh
mkdir my-talk && cd my-talk && git init
git submodule add https://github.com/TuebingenAICenter/tueaistylepack.git theme
cp -r theme/slidev-theme/example/. .
```

In `slides.md`, point the first line of the headmatter at the theme, then
install and start:

```yaml
theme: ./theme/slidev-theme
```

```sh
npm install
npm run dev
```

`npm run dev` opens the slides in the browser and updates them while you edit
`slides.md`. Press `o` for an overview of all slides and `p` for the presenter
view with notes; all controls are described in the
[Slidev guide](https://sli.dev/guide/ui).

The fonts (Roboto Condensed, Roboto Mono, Plus Jakarta Sans) come with the
theme. Nothing has to be installed on the machine, and nothing is loaded from
the internet while presenting.

## Share the slides with students

Students never need to install anything. There are three things you can give
them, and all three come out of the same `slides.md`:

| Command | Result | For students |
| --- | --- | --- |
| `npm run build:standalone` | `slides.html` | **One self-contained file**, with all interactive parts. Upload it to ILIAS or Moodle, or send it by mail; a double click opens it in the browser. Works offline. |
| `npm run build` | `dist/` | **A website** to put on any web server. Students get a link, and a button in the navigation bar to download the PDF. |
| `npm run export` | `slides.pdf` | **A PDF** with one page per slide, for printing and annotating. `npm run export:clicks` gives one page per click instead, like beamer overlays. |

Notes:

- With several decks in one folder, pass the file:
  `npm run build:standalone -- lecture-3.md` gives `lecture-3.html`.
- The PDF is drawn by a headless browser. Install it once with
  `npx playwright install chromium`.
- If the website does not sit at the root of its server, tell the build where
  it will live: `npm run build -- --base /teaching/ml/`.
- To publish on GitHub Pages, the example deck contains a ready-made workflow,
  [`.github/workflows/deploy.yml`](example/.github/workflows/deploy.yml). On
  every push it builds all three variants and puts them online. Enable it once
  in the settings of your repository (*Pages → Source → GitHub Actions*).
- Refer to images by a path relative to `slides.md` (`./figures/plot.svg`).
  Such files are bundled into every export. Files in `public/` are served by
  the website, but they are not part of the single-file `slides.html`.

## Write slides

Slides are separated by `---`. The first slide is the title page; its
headmatter holds what the beamer theme takes from `\title`, `\author` etc.:

```md
---
theme: ./theme/slidev-theme
title: The Tübingen.ai Beamer Theme
subtitle: A style pack for presentations and publications
author: Philipp Hennig
institute: Tübingen AI Center, Tübingen, Germany
date: January 2026
shortTitle: Tübingen.ai Beamer Theme   # for the footline, optional
shortAuthor: P. Hennig                 # for the footline, optional
---

---

# Frame title
## Frame subtitle

Text, with <Alert>alerted</Alert> words and math, $e^{i\pi} = -1$.

- a list
  - with a second level
```

A `#` heading at the top of a slide is the frame title, a `##` heading directly
below it the subtitle. The rest is centered vertically, as in beamer.

Everything Slidev offers works on top of that: click animations, code
highlighting, diagrams, speaker notes, recording, drawing. See the
[Slidev documentation](https://sli.dev/guide/syntax).

### Layouts

Choose the kind of slide with `layout:` in its frontmatter.

| Layout | beamer | |
| --- | --- | --- |
| `cover` | `\titlepage` | The title page. Default for the first slide. On a later slide, `title:`, `subtitle:` etc. in its frontmatter override the headmatter, e.g. to open a new part. |
| `default` | `frame` | A frame with title bar and footline. Default for all other slides. |
| `two-cols` | `columns` | Two columns, `::left::` and `::right::`. `cols: 60/40` sets their widths in percent of the text width. Content before `::left::` spans the full width. |
| `dark` | `darkframe` | A dark frame. |
| `plain` | `frame[plain]` | No title bar, no footline. |
| `pattern` | `\BackgroundPattern{n}` | A plain frame on one of the nine patterns of the Graphic Toolkit, `pattern: 0` … `8`. |
| `black` | `\blackslide` | An empty black slide. |

### Components

| Component | beamer | |
| --- | --- | --- |
| `<Alert>text</Alert>` | `\alert` | Alerted text. `**bold**` is set in the Regular weight, as `\textbf` is. |
| `[text](url)` | `\link` | An underlined link. |
| `<SrcCite href="url">text</SrcCite>` | `\srccite` | A source at the right end of the line, usually in the subtitle. |
| `<Block title="…">` | `block` | A titled block. `type="alert"` and `type="example"` give the other two colors. |
| `<Theorem>`, `<Proof>` | `theorem`, `proof` | Blocks with an italic body and with an end-of-proof mark. `title="Lemma"` changes the title. |
| `<Ribbon>` | `ribbon` | A band across the slide: yellow, or white on dark frames. |
| `<Figure src="./plot.svg" />` | `\includegraphics` | A centered figure, see [Figures](#figures). |
| `<SideImage src="./photo.jpg" />` | `\EastGradImage` … | An image along the edge of the frame, faded into the page. `side="left"`, `caption="…"`, `:fade="false"`, `full-height`. |
| `<ColorBox title="…">` | `tcolorbox` | A framed box, e.g. for a takeaway on a `pattern` slide. A `<template #side>` is set next to the text. |
| `<VFill />` | `\vfill` | Stretchable vertical space. |
| ```` ```python ```` | `\pythonblock` | Code blocks, with line numbers in the left rule. |
| `<dl>`, `<dt>`, `<dd>` | `description` | Description lists. |

Markdown inside a component needs an empty line after the opening and before
the closing tag:

```md
<Block title="Observation">

This is **Markdown**.

</Block>
```

The source of the [example deck](example/slides.md) shows all of this in use.
It reproduces the example of the beamer theme slide by slide.

### Figures

`<Figure>` puts an image on a line of its own, centered:

```md
<Figure src="./figures/plot.svg" />
<Figure src="./figures/photo.jpg" width="60%" caption="The new building" />
```

| | |
| --- | --- |
| `src` | Path relative to `slides.md`. |
| `width`, `height` | `60%` of the text (or column) width, or a length on the beamer page: `8cm`, `30mm`, `120pt`. |
| `caption` | Small text below the figure. |
| `align` | `left`, `center` (default) or `right`. |

Without a size, an SVG is shown at its physical size, as `\includegraphics`
shows a PDF. Plots made with [`tueplots`](https://tueplots.readthedocs.io)
therefore fit the slide in the same way as in LaTeX, with text as large as the
text of the slide. Use the beamer bundle and save the figure as SVG:

```python
plt.rcParams.update(bundles.beamer_tueai(rel_width=0.6))
...
plt.savefig("figures/plot.svg")
```

Browsers cannot show PDF figures. Save them as SVG as above, or convert them
with `pdftocairo -svg plot.pdf plot.svg`.

For an image along the edge of the slide, see `<SideImage>` above.

### Interactive figures

A Vue component in the `components/` folder of a deck can be used on its slides
right away. The example deck contains a small one,
[`GaussianDemo.vue`](example/components/GaussianDemo.vue), as a starting point.
The colors of the style pack are available as CSS variables
(`var(--tueai-accent)`, `var(--tueai-darkblue)`, …; all of them are listed in
[`styles/colors.css`](styles/colors.css)).

In the PDF, an interactive figure appears in its initial state.

## How closely does it match the beamer theme?

The lengths of the theme are those of the LaTeX sources. Where the beamer
output depends on TeX internals, they were measured in the PDF of the beamer
example. In a comparison of that PDF with the Slidev export, text and boxes of
the example deck lie within 1–3px of each other on the 960px wide slide, which
is half a millimeter on the 160mm wide beamer page. Lines break at the same
words.

This holds at every size. Slidev lays out each slide on a fixed canvas of
960 × 540px and scales the finished canvas to the window, the projector or the
PDF page, so no line can break differently on a different screen. The fonts
are part of the theme, set without hinting, and their vertical metrics are
pinned, so that the result does not depend on the operating system either.
Screenshots of the example deck from 640 × 360 to 3840 × 2160 pixels, at pixel
ratios from 1 to 3, in windows that are not 16:9, and of the exported PDF all
show the same layout.

Known differences:

- **Line breaks in borderline cases.** TeX optimizes the line breaks of a whole
  paragraph and may squeeze the spaces of a line; a browser fills line by line.
  The theme reproduces TeX's wider space after the end of a sentence and
  tolerates a slightly overfull line, which is enough for the example deck,
  but a long paragraph can still break at a different word. This is most
  visible in justified text (`<ColorBox>`) and in code lines that are too long.
- **Heights that depend on descenders.** In beamer, a block title without
  descenders ("Block") is 2pt lower than one with ("Example"). Here, all title
  bars have the height of the former.
- **Math** is set by KaTeX, in the same fonts as in the beamer theme (Roboto
  for latin letters, Computer Modern for the rest), but with slightly
  different spacing in and around formulas.
- **Syntax highlighting** uses the colors of the beamer theme, but the grammar
  of Shiki, which marks a few more words as keywords than `listings` does.
- The plot next to the code block of the example sits 16px higher than in
  beamer. There, the plot is exactly as wide as its column, and TeX puts an
  empty line in front of it.
- **Blocks on dark frames** keep dark text on their light background. In the
  beamer theme the text turns white there and is hard to read.

Some things look odd and are nevertheless what beamer does, so the theme does
them too: the columns of `two-cols` start 20px left of the text above them
(beamer's `columns` reach into the margins), and a `full-height` side image
runs over the title bar.

A few oddities of beamer are reproduced on purpose, because they are part of
how the slides look: no space between paragraphs (set `--parskip` to get
some), the tighter line above a nested list, and the content of a frame sitting
a little above the middle.

## Adapt it

- **Paragraph spacing, colors, sizes**: add a `style.css` next to `slides.md`.
  For example, `.tueai-slide { --parskip: 6pt; }`.
- **Larger text**: the canvas width of 960px corresponds to beamer's 10pt.
  `canvasWidth: 800` in the headmatter makes everything a fifth larger, like a
  12pt beamer class.
- **4:3 slides**: `aspectRatio: 4/3` and `canvasWidth: 768`.
- **Other layouts and components** of Slidev and of its addons keep working;
  they just do not have the title bar and footline of this theme.

## Files

```
slidev-theme/
├── package.json     name and defaults of the theme (canvas, fonts)
├── styles/          colors, fonts, text, title bar and footline, code;
│                    one file for each file of the beamer theme
├── layouts/         cover, default, two-cols, dark, plain, pattern, black
├── components/      Alert, Block, Ribbon, SideImage, … (and the frame itself)
├── setup/shiki.ts   colors of the syntax highlighting
├── markdown/        sentence spacing as in TeX
├── vite.config.ts   wires the two above into Slidev
├── assets/          fonts, logos and patterns
└── example/         the example deck and starting point for new decks
    ├── slides.md
    ├── package.json            the commands: dev, build, build:standalone, export
    ├── vite.config.ts          single-file bundling for build:standalone
    ├── scripts/                build:standalone
    ├── components/, figures/   content of the example
    └── .github/workflows/      deployment to GitHub Pages
```

To work on the theme itself, run the example deck: `cd example && npm install
&& npm run dev`. To get a later version of the theme into a deck, run
`git submodule update --remote theme`.
