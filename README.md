<p align="center">
  <img src="images/logo.svg" width="96" alt="openunivcourses logo">
</p>

<h1 align="center">openunivcourses</h1>

<p align="center">
  <strong>Free machine-learning courses from leading universities, in one searchable page.</strong><br>
  Lectures, notes and assignments from MIT, Stanford, Berkeley, CMU, NYU and UChicago, with no paywalls.
</p>

<p align="center">
  <a href="https://kabartay.github.io/openunivcourses/"><img src="https://img.shields.io/badge/website-browse%20courses-8957e5.svg" alt="Website"></a>
  <a href="https://github.com/kabartay/openunivcourses/actions/workflows/deploy.yml"><img src="https://github.com/kabartay/openunivcourses/actions/workflows/deploy.yml/badge.svg" alt="Deploy to GitHub Pages"></a>
  <a href="https://github.com/kabartay/openunivcourses/stargazers"><img src="https://img.shields.io/github/stars/kabartay/openunivcourses?style=flat&color=yellow" alt="GitHub stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT"></a>
  <a href="index.html"><img src="https://img.shields.io/badge/dependencies-none-brightgreen.svg" alt="No dependencies"></a>
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

**42 courses from 6 universities**, with editions from 2017 to 2025.

| University | Courses |
| --- | --- |
| Massachusetts Institute of Technology | 9 |
| Stanford University | 9 |
| University of California, Berkeley | 9 |
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

[Open an issue](https://github.com/kabartay/openunivcourses/issues/new) with the course
name, university and link. A course fits the collection when:

- it is taught at a university,
- its lectures or materials are free to access without an account or payment,
- it is about machine learning, AI or the mathematics behind them.

A broken or outdated link is worth an issue too.

## How it's built

One self-contained `index.html`: HTML, CSS and plain JavaScript for the search, with no
build step and no dependencies. GitHub Actions validates the HTML and deploys `main` to
GitHub Pages.

To run it locally:

```bash
git clone https://github.com/kabartay/openunivcourses.git
cd openunivcourses
python3 -m http.server 8000   # then open http://localhost:8000
```

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
