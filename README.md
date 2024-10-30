# Snake interactive game

[![codecov](https://codecov.io/gh/irebah/snake/graph/badge.svg?token=AK8P3KB9AR)](https://codecov.io/gh/irebah/snake)
[![Build, test and deploy](https://github.com/irebah/snake/actions/workflows/build.yml/badge.svg)](https://github.com/irebah/snake/actions/workflows/build.yml)

This project is a fun implementation of the classic Snake game using React and TypeScript, built with Vite for a fast development experience. It utilizes Tailwind CSS for styling and Vitest for testing. No canvas is used; instead, we leverage HTML and CSS for rendering.

You can view the live version of the project at [https://irebah.github.io/snake](https://irebah.github.io/snake).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Features

- Classic Snake gameplay
- Score tracking
- Simple controls
- Easy to extend and customize

## Technologies

- **Vite**: A fast build tool that provides an optimal development environment.
- **TypeScript**: A superset of JavaScript that offers static typing for better code quality.
- **Vitest**: A fast and lightweight testing framework for Vite.
- **TailwindCSS**: A utility-first CSS framework that allows for rapid UI development.
- **pnpm**: A fast, disk space-efficient package manager.

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/irebah/snake.git
   cd snake
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
    pnpm dev
   ```

4. **Open your browser: Navigate to http://localhost:5173 to view the application.**

## Usage

To start the game, click the "Start" button. Once the game begins, use the arrow keys (right, up, or down) to guide the snake toward the apple.

Every time the snake eats an apple, it will relocate to a new random position on the grid. Be cautious! If the snake runs into itself or the walls, it will result in a game over. Good luck!

## License

This project is licensed under the MIT License. See the [LICENSE file](./LICENSE.md) for details.
