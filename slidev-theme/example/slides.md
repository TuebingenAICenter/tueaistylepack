---
theme: ../
title: The Tübingen.ai Beamer Theme
subtitle: A style pack for presentations and publications
author: Philipp Hennig
institute: Tübingen AI Center, Tübingen, Germany
date: January 2026
shortTitle: Tübingen.ai Beamer Theme
shortAuthor: P. Hennig
---

---
layout: two-cols
cols: 60/40
---

# Welcome!
## to the tue ai beamer theme

<SideImage src="./figures/floor_5.jpg" />

::left::

- This is the example presentation for the `tueai` beamer theme of the [Tübingen AI Center](https://tuebingen.ai).
- The style pack is intended for use by all faculty, employees, *and students* of the AI Center (yes, this includes BSc/MSc students, if affiliated with a research group at the center).
- If you have any proposals for improvements, please file a PR in the [repo](https://github.com/philipphennig/tueaistylepack).
- <Alert>Important note:</Alert> All graphics, logos, and other assets are the property of their respective owners, and “all rights reserved”. Faculty, employees and students of the AI center are allowed to use the logo for scientific presentations and publications. If you are in doubt about proper use, contact the AI center executive office.

---

# Itemizations, Enumerations, and Descriptions
## Itemizations and Enumerations

There are three <Alert>important</Alert> points:

1. A first one,
2. a second one with a bunch of subpoints,
   - first subpoint.
   - second subpoint.
   - third subpoint.
3. and a third one.

Here is some math:

$$
p(D\mid \mu,k) = \int \mathcal{N}(D; f(X), \sigma^2 I) \cdot \mathcal{GP}(f\mid \mu,k) \, \mathrm{d}f = \mathcal{N}(D; \mu_X, k_{XX} + \sigma^2 I)
$$

---

# Itemizations, Enumerations, and Descriptions
## Descriptions

<dl>
  <dt>short</dt> <dd>Some text.</dd>
  <dt>longest label</dt> <dd>Some text.</dd>
  <dt>long label</dt> <dd>Some text.</dd>
</dl>

---

# Plots with `tueplots`
## plots that fit the slide. Every time. <SrcCite href="https://tueplots.readthedocs.io">pip install tueplots</SrcCite>

<Figure src="./figures/tueplots_example.svg" />

---
layout: two-cols
cols: 60/40
---

# Plots with `tueplots`
## plots that fit the slide. Every time.

::left::

The [`tueplots` package](https://tueplots.readthedocs.io) generates stylesheets for matplotlib. Making this plot is as easy as

```python
import matplotlib.pyplot as plt
from tueplots import bundles
from tueplots.constants.color import rgb

plt.rcParams.update(bundles.beamer_tueai(rel_width=0.6))
fig, ax = plt.subplots()  # no `figsize` here!

# your plotting code goes here

plt.savefig("plotname.pdf")  # no `bbox_inches` etc. here!
```

By the way, this is a python code block.

::right::

<Figure src="./figures/tueplots_example_narrow.svg" />

---

# Block Environments
## in different styles

<Block title="Block">

A <Alert>regular</Alert> block.

</Block>

<Block title="Alerted Block" type="alert">

An <Alert>alerted</Alert> block.

</Block>

<Block title="Example Block" type="example">

An <Alert>example</Alert> block.

</Block>

---

# Theorem Environments
## Theorems and Proofs <span class="float-right">Test</span>

<Theorem>

There is <Alert>no largest</Alert> prime number.

</Theorem>

<Proof>
<ol>
<li :class="{ alert: $clicks === 0 }">

Suppose $p$ were the largest prime number.

</li>
<li v-click="1">

Let $q$ be the product of the first $p$ numbers.

</li>
<li v-click="2">

Then $q+1$ is not divisible by any of them.

</li>
<li>

But $q + 1$ is greater than $1$, thus divisible by some prime number not in the first $p$ numbers.

</li>
</ol>
</Proof>

---
layout: two-cols
cols: 30/70
---

# Images
## with and without gradient, in matched colors

<SideImage src="./figures/braitenberg.jpg" side="left" caption="Valentin Braitenberg (1926–2011)" />

::right::

Full height images can be put on the left side of the page with `\WestGradPerson{filepath}{caption}` command. There is also a `\EastGradPerson{filepath}{caption}` for the right side, and a `\EastGradImage{filepath}`, `\WestGradImage{filepath}` without caption. The optional Boolean `\WestGradImage[0]{filepath}` disables the fading to transparency.

You can use the little utility script `change_image_color.py` to make an image B/W and match the tone to the tue ai color theme (see the docstring of that file for more information).

---

# Ribbons
## can be used to call out important information

<Ribbon>

There are three <Alert>important</Alert> points:

1. A first one,
2. a second one with a bunch of subpoints,
   - first subpoint.
   - second subpoint.
   - third subpoint.
3. and a third one.

</Ribbon>

---
layout: pattern
pattern: 1
---

---
layout: pattern
pattern: 4
---

<ColorBox title="Takeaway slides" colback="white">

The background patterns and color boxes offer an alternative to dark slides, if you want to convey a break in the flow of the presentation.

For example, this can be used to present some main takeaway.

Note that the backgrounds are very busy, though. This works best if the takeaway box is large and covers most of the frame. For example, a QR code.

<template #side>

<Figure src="./figures/qr.png" width="100%" />

</template>
</ColorBox>

---
layout: dark
---

On dark frames, normal text is white. <Alert>Alerted text</Alert> remains accented. Darkframes also have a `\frametitle` and `\framesubtitle`, but their use is not encouraged, to increase visual contrast.

<VFill />

<Ribbon>

Ribbons become white, with dark text

</Ribbon>

---

# Interactive Slides
## what a PDF cannot do <SrcCite href="https://sli.dev/guide/component">sli.dev/guide/component</SrcCite>

Slides are web pages, so a figure can be a live component. Drag the sliders:

<GaussianDemo />

In the exported PDF, the figure shows up in its initial state.

---
layout: black
---
