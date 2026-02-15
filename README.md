# React + TypeScript + Vite + TailwindCSS App

## Features
- React + TypeScript app scaffolded for Vite workflow
- TailwindCSS integrated for utility-first styling
- Pages: Home, About, Contact, Profile
- Home includes hero banner, features section, and footer
- Profile fetches user data from `https://jsonplaceholder.typicode.com/users`
- Responsive navigation bar with active link highlighting
- Mobile and desktop responsive layouts

## Node compatibility

If you see `crypto.getRandomValues is not a function` when running `npm run dev`, it usually means your local Node.js runtime is too old for your installed Vite major version.

This project is pinned to **Vite 4** for better compatibility with older Node environments.

Recommended:
- Node.js `>= 14.18` (or preferably Node.js 18 LTS+)
- Remove old dependencies before reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
