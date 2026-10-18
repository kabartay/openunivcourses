<p align="center">
  <img src="public/images/logo.svg" width="96" alt="openunivcourses logo">
</p>

<h1 align="center">openunivcourses</h1>

<p align="center">
  <strong>Free machine-learning courses from leading universities, in one searchable page.</strong><br>
  Lectures, notes and assignments from MIT, Stanford, Berkeley, CMU, NYU and UChicago, every yearly edition linked.
</p>

<p align="center">
  <a href="https://kabartay.github.io/openunivcourses/"><img src="https://img.shields.io/badge/website-browse%20courses-8957e5.svg" alt="Website"></a>
  <a href="https://github.com/kabartay/openunivcourses/actions/workflows/deploy.yml"><img src="https://github.com/kabartay/openunivcourses/actions/workflows/deploy.yml/badge.svg" alt="Build and deploy"></a>
  <a href="https://github.com/kabartay/openunivcourses/stargazers"><img src="https://img.shields.io/github/stars/kabartay/openunivcourses?style=flat&color=yellow" alt="GitHub stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT"></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/built%20with-Astro-ff5d01.svg" alt="Built with Astro"></a>
  <a href="https://github.com/kabartay/openunivcourses/actions/workflows/link-check.yml"><img src="https://github.com/kabartay/openunivcourses/actions/workflows/link-check.yml/badge.svg" alt="Weekly link check"></a>
</p>

<p align="center">
  <a href="https://kabartay.github.io/openunivcourses/"><strong>Browse the courses →</strong></a>
</p>

## What it is

University machine-learning courses are often published for free, but they are scattered
across department pages, YouTube playlists and old course sites, and each one is offered
again every year under a new URL. This project gathers them on one page: every course has
a short description and a link to each year it was offered, so you can pick the most
recent edition or the one whose lectures were recorded.

Type in the search bar to filter by course name, university or topic.

## What's in it

**43 courses from 6 universities**, with 326 yearly editions from 2011 to 2026, 86 of them lecture-video playlists.

| University | Courses |
| --- | --- |
| Massachusetts Institute of Technology | 9 |
| Stanford University | 9 |
| University of California, Berkeley | 10 |
| Carnegie Mellon University | 9 |
| New York University | 3 |
| University of Chicago | 3 |

Topics covered: machine learning, deep learning, natural language processing, computer
vision, reinforcement learning, generative models and foundation models, probabilistic
graphical models, statistical learning theory, the mathematics of ML, and ML for healthcare,
genomics and the life sciences.

Examples: MIT 6.S191 *Introduction to Deep Learning*, Stanford CS231n *Deep Learning for
Computer Vision*, Stanford CS336 *Language Modeling from Scratch*, Berkeley CS 285 *Deep
Reinforcement Learning*, CMU 11-785 *Introduction to Deep Learning*.

## Suggest a course

Use the [Suggest a course](https://github.com/kabartay/openunivcourses/issues/new?template=suggest-a-course.yml)
form, or open a pull request that edits [`src/data/courses.yaml`](src/data/courses.yaml) (see
below). A course fits the collection when:

- it is taught at a university,
- its lectures or materials are free to access without an account or payment,
- it is about machine learning, AI or the mathematics behind them.

A broken or outdated link is worth [reporting](https://github.com/kabartay/openunivcourses/issues/new?template=broken-link.yml) too. A weekly check also opens an issue listing any link that stops working.

## Add a course or a new year

All the content lives in two YAML files; the page is generated from them.

- [`src/data/courses.yaml`](src/data/courses.yaml): one entry per course.
- [`src/data/universities.yaml`](src/data/universities.yaml): name, short name, logo and website
  of each university. Logos are files in [`public/images/logos/`](public/images/logos/).

A new year of an existing course is one line under its `editions`:

```yaml
- id: stanford-cs336
  university: stanford
  code: CS336
  title: Language Modeling from Scratch
  description: Build a language model end to end, from tokenizer and transformer to training and scaling.
  topics: [llms, nlp]
  level: advanced
  editions:
    - { year: 2026, term: S, url: "https://cs336.stanford.edu/spring2026/" }   # the new line (example URL)
    - { year: 2025, term: S, url: "https://cs336.stanford.edu/spring2025/" }
    - { year: 2025, term: S, url: "https://www.youtube.com/playlist?list=...", video: true }
```

- `term` is optional: `W` Winter, `S` Spring, `U` Summer, `F` Fall. The button shows it after the year, e.g. `2026S`.
- `video: true` marks a lecture-video link; it shows as a red `YT25`-style button.
- Editions can be listed in any order; the page shows lecture videos first, then course pages, each newest first.
- Every URL must start with `https://`, and a description can be at most 150 characters (so every card keeps the same four-line layout).
- `topics` (up to three) and `level` (`intro`, `intermediate`, `advanced`) use the fixed lists
  at the top of `courses.yaml`.

Every build checks the data first: an unknown field, a URL that is not https, an unknown university,
a missing logo file, or two editions that would show the same button fails the build, naming the
entry and the problem.

## How it's built

[Astro](https://astro.build) turns the YAML into one static HTML page, with a small script for
the search. GitHub Actions builds every pull request, deploys `main` to GitHub Pages, and checks
every course link once a week: course pages with [lychee](https://lychee.cli.rs), YouTube playlists
through YouTube's oEmbed endpoint (a deleted playlist still answers its own page with HTTP 200).
Broken links go into one issue, which closes itself once they are fixed.

To run it locally (Node 22.12 or newer; `.nvmrc` pins it):

```bash
git clone https://github.com/kabartay/openunivcourses.git
cd openunivcourses
npm ci
npm run dev        # http://localhost:4321/openunivcourses/
npm run validate   # check the data only
npm run build      # validate, then build into dist/
npm run check:youtube   # check every YouTube link
```

The site is built for the `/openunivcourses` path. To serve it from another address, set both
at build time, for example `SITE=https://www.example.com BASE_PATH=/courses npm run build`.
When the same site is served from two addresses, set `CANONICAL_URL` to the primary one so
search engines treat the other as a copy.

## More from the author

| Project | What it is |
| --- | --- |
| [fintfm](https://github.com/kabartay/fintfm) | A tabular foundation model for corporate credit risk, pretrained only on synthetic data |
| [aava](https://github.com/kabartay/aava) | A 3D exploration-and-building game for children, on Godot 4 |
| [Tokenwatch](https://github.com/kabartay/tokenwatchclaude) | Claude Code quota and context, live in the VS Code status bar |
| [Jobwatch](https://github.com/kabartay/jobwatch) | Hugging Face Jobs and their cost in the VS Code status bar |
| [Citewatch](https://github.com/kabartay/citewatch) | Checks `.zenodo.json` and `CITATION.cff` as you type, before a Zenodo release |

Portfolio: [www.organokov.com](https://www.organokov.com)

## Support

If the collection saved you time, a star helps other people find it. You can also
[sponsor on GitHub](https://github.com/sponsors/kabartay) or
[buy me a coffee](https://buymeacoffee.com/kabartay).

## Acknowledgments

- The universities and lecturers who make their courses freely available.
- **Claude (Anthropic)** and **ChatGPT (OpenAI)** for assistance with website development
  and documentation.

## License

[MIT](LICENSE) © Mukharbek Organokov. Course content belongs to its universities and
authors; this project only links to it.
