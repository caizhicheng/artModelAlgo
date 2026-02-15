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

This project is pinned to **Vite 4.5.14** for compatibility with Node 14/16/18.

- Supported Node range: `>=14.18.0 <20`
- If you saw: `Vite requires Node.js version 20.19+ or 22.12+`, your local `node_modules` likely still contains a newer Vite major version.

## Clean reinstall (important)

### Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
npm run dev
```

### macOS / Linux

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Verify installed Vite version

```bash
npx vite --version
```

Expected major version: `4.x`

## Build

```bash
npm run build
```
