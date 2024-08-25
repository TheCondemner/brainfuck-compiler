<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h1 align="center">TSBF</h1>
  <p align="center">
    Simple brainfuck compiler & runner made in TypeScript / JavaScript.
    <br />
    <br />
    <a href="https://github.com/TheCondemner/brainfuck-compiler/issues">Report Bug</a>
    ·
    <a href="https://github.com/TheCondemner/brainfuck-compiler/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
<div id="about-the-project"></div>

## About The Project <br />

![TSBF Screen Shot][product-screenshot]

This is a simple compiler for .bf files, to get started with using it, look at the <a href="#getting_started">Getting Started</a> section.

The compiler was written as a side-project for personal use, so updates will be infrequent.

<!-- GETTING STARTED --> <br />
<div id="getting-started"></div>

## Getting Started <br />

### Prerequisites

These are the prerequisites that are needed to run the program.
* [Node.JS](https://nodejs.org/en/) (npm is included with Node.JS)

### Installation Instructions
<div id="installation"></div>

1. Clone the repo
   ```sh
   $ git clone https://github.com/TheCondemner/brainfuck-compiler.git
   ```
2. Enter folder
   ```sh
   $ cd brainfuck-compiler
   ```
3. Install NPM packages
   ```sh
   $ npm install
   ```
4. Refer to the Usage section to see how to use the compiler.   


<!-- USAGE EXAMPLES -->
<div id="usage"></div>

## Usage <br />

To get started with the compiler, simply do `npm start`. This is the prompt you will be faced with:
```sh
$ npm start

Do you want to compile / run?
(0) compile
(1) run

>
```
From here, you can follow on-screen instructions to compile / run files.
```sh
$ npm start

Do you want to compile / run?
(0) compile
(1) run

> compile

Which files do you want to compile?
 (0) example.bf

> example.bf
example.bf was compiled
```
You can also use the file's index to compile / run it.
```sh
Which files do you want to compile?
 (0) example.bf

> example.bf
example.bf was compiled
```
You can also pass arguments to `npm start`, such as `run`, or `comp`.
```sh
$ npm start run example.js

Running: example.js

stdout:
H
e
l
l
o

W
o
r
l
d
!
```


<!-- ROADMAP -->
<div id="roadmap"></div>

## Roadmap <br />

- [X] Centralize to `main.js`.
- [X] Allow file names to be used during usage.
- [X] Update all READMEs to reflect actual usage.
- [ ] Allow compilation to executable files.

More features may be added here down the line.

<p align="right">(<a href="#top">Back to Top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TheCondemner/brainfuck-compiler.svg?style=for-the-badge
[contributors-url]: https://github.com/TheCondemner/brainfuck-compiler/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/TheCondemner/brainfuck-compiler.svg?style=for-the-badge
[stars-url]: https://github.com/TheCondemner/brainfuck-compiler/stargazers
[issues-shield]: https://img.shields.io/github/issues/TheCondemner/brainfuck-compiler.svg?style=for-the-badge
[issues-url]: https://github.com/TheCondemner/brainfuck-compiler/issues
[product-screenshot]: screenshot.png
