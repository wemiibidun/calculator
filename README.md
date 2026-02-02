# Apple-Style Calculator

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wemiibidun/calculator)
![GitHub languages count](https://img.shields.io/github/languages/count/wemiibidun/calculator)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://wemiibidun.github.io/calculator/)

## Table of contents
* [Introduction](#introduction)
* [Screenshot](#screenshot)
* [Technologies](#technologies)
* [Features](#features)
* [Deployment (Vite + GitHub Pages)](#deployment-vite--github-pages)
* [Link to Published Project](#link-to-published-project)
* [Status](#status)
* [Contact](#contact)

## Introduction
This project is a clean, Apple-inspired calculator built with React and Vite. It focuses on polished UI and reliable core calculator behavior, and it also supports keyboard input for quick calculations.

## Screenshot
![Apple-style calculator preview](public/preview.png)

## Technologies
![React](https://img.shields.io/badge/React-239120?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-239120?style=for-the-badge&logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

* React
* Vite
* CSS

## Features
* Apple-inspired layout, spacing, and visual styling
* Core calculator logic (AC/C, %, +/- , operations, equals)
* Keyboard support (digits, `+`, `-`, `*`, `/`, `.`, `Enter`, `Backspace`)
* Responsive sizing for mobile and desktop

## Deployment (Vite + GitHub Pages)
1. Set the base path in `vite.config.js`:
   * `base: "/calculator/"`
2. Install the deploy tool:
   * `npm install --save-dev gh-pages`
3. Add scripts in `package.json`:
   * `"predeploy": "npm run build"`
   * `"deploy": "gh-pages -d dist"`
4. Deploy:
   * `npm run deploy`
5. In GitHub: **Settings → Pages** → Source: **Deploy from a branch** → **gh-pages** → **/ (root)**.

## Link to Published Project
[Apple Calculator Webpage](https://wemiibidun.github.io/calculator/)

## Status
Project is: _Complete_

## Contact
Created by [@wemiibidun](https://github.com/wemiibidun)
