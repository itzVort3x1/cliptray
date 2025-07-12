# CLI Tray

A cross-platform Electron clipboard history manager that lives in your system tray—featuring searchable history, quick keyboard shortcuts, and a sleek frosted-glass UI.

---

## 🚀 Features

-   Tracks up to **100** clipboard entries in real time
-   **Searchable** history window with translucent, rounded design
-   **Click-to-copy** and **keyboard accelerators** for the first 10 items
-   **Global shortcut** to open tray menu (Ctrl+Alt+M / ⌘+Alt+M)
-   **Auto-updates** via GitHub Releases
-   Packaged installers for **Windows (.exe)**, **macOS (.dmg)**, **Linux (.AppImage, .deb)**

---

## 🛠️ Getting Started

### Prerequisites

-   Node.js ≥14
-   npm or yarn
-   For Linux packaging: `xclip` or `xsel` and optionally `wine`, `mono-devel` (for Windows builds)

### Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/cliptray.git
cd cliptray

# Install dependencies
npm install
```

### Development

Run in dev mode (auto-rebuilds + live reload):

```bash
npm run dev
# or, if you use webpack watch + electron:
# npm run build && npm start
```

### Building & Packaging

Bundle the renderer and package the app:

```bash
# Build React bundle
npm run build

# Create unpacked package (dir):
npm run pack

# Create installers (exe, dmg, AppImage, deb):
npm run dist
```

_On Linux, to build a Windows `.exe`, install Wine & Mono._

### Running Tests

_TBD: Add test scripts if any_

---

## 🤝 Contributing

We ❤️ contributions! To get started:

1. **Fork** this repository
2. **Clone** your fork

    ```bash

    ```

git clone [https://github.com/](https://github.com/)<your-username>/cliptray.git
cd cliptray
git remote add upstream [https://github.com/](https://github.com/)<original-owner>/cliptray.git

````
3. **Create a new branch** for your feature or bugfix:
   ```bash
git checkout -b feature/my-cool-feature
````

4. **Implement** your changes, commit with a clear message:

    ```bash

    ```

git add .
git commit -m "feat: add awesome feature"

````
5. **Sync** with upstream before pushing:
   ```bash
git fetch upstream
git rebase upstream/main
````

6. **Push** your branch to your fork:

    ```bash

    ```

git push origin feature/my-cool-feature

```bash
7. **Open a Pull Request** against `main` in the original repo

### Code Style & Guidelines

- Follow the existing JavaScript (ES6) and React styling conventions
- Run linting (if configured) and ensure formatting consistency
- Document new features in this README

### Issue Reporting

Please open an issue for bugs or feature requests, filling out the provided template.

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

```
