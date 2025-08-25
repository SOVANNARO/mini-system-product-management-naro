# 📦 Mini System Product Management (Naro)

A **mini product management system** built with modern web technologies.
The project is designed with a clean architecture, well-organized folder structure, and responsive UI to ensure maintainability and scalability.

---

👉 **[Live Demo Here 🚀](https://mini-system-product-management-naro.vercel.app/)**

## ✨ Tech Stack

- [Next.js 15](https://nextjs.org/) – React framework for full-stack apps
- [Axios](https://axios-http.com/) – HTTP client for API requests
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework
- [TanStack Query](https://tanstack.com/query/latest) – Data fetching & caching
- [TanStack Table](https://tanstack.com/table/latest) – Advanced tables & data grids
- [Zod](https://zod.dev/) – TypeScript-first schema validation
- [React Hook Form](https://react-hook-form.com/) – Forms handling
- [shadcn/ui](https://ui.shadcn.com/) – Accessible and styled UI components

---

## 📂 Project Structure

```
mini-system-product-management-naro/
├─ public/                # Static assets
├─ src/
│  ├─ app/                # Next.js app router pages
│  ├─ components/         # Reusable UI & feature components
│  ├─ constants/          # API paths, query/mutation keys
│  ├─ lib/                # API clients & utility functions
│  ├─ stores/             # State management (React Query hooks, Zustand)
│  └─ types/              # TypeScript definitions
├─ .env                   # Environment variables
├─ next.config.ts         # Next.js configuration
├─ tsconfig.json          # TypeScript configuration
├─ package.json           # Project metadata & dependencies
└─ README.md              # Project documentation
```

The structure is organized for **readability and maintainability**, following modular and scalable design practices.

---

## 🎨 Features

- ✅ **Responsive UI** → Works on medium screens and below (mobile-first)
- ✅ **Clean code** → Well-formatted with ESLint & Prettier
- ✅ **Functional app** → Runs without breaking after install
- ✅ **Public GitHub repo** → Open for collaboration and learning
- ✅ **Modular design** → Easy to extend with new features

---

## 🚀 Getting Started

### 📌 Prerequisites

- **Node.js**: `>=20.x`
- **Package Manager**: `pnpm` (recommended)

### ⚡ Installation

```bash
# Clone repository
git clone https://github.com/SOVANNARO/mini-system-product-management-naro
cd mini-system-product-management-naro

# Install dependencies
pnpm install
```

### 🖥️ Development

```bash
pnpm dev
```

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it.

### 🏗️ Build

```bash
pnpm build
pnpm start
```

Builds the app for production and starts the server.

---

## 🧪 CI – GitHub Actions

This project includes a **CI workflow** to check code quality, test, and build automatically.

Create a file: `.github/workflows/nextjs.yml`

This ensures every commit to `main` is **linted, tested, and built** successfully.

---

## 📖 How to Contribute

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m "Add awesome feature"`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the **MIT License**.

---
