# CSV Explorer Premium 📊

A sophisticated, high-performance CSV data visualization and exploration tool built with React 19, Vite, and Shadcn UI. This project allows users to upload local CSV files and instantly interact with their data through searching, filtering, and paginated tables.

## ✨ Key Features

- **🚀 Instant CSV Parsing**: Local file processing using `PapaParse` for lightning-fast data loading without server overhead.
- **🔍 Smart Search**: Global search across all columns or targeted search within specific context columns.
- **📑 Premium Pagination**: Intelligent pagination system that handles large datasets smoothly with a responsive UI.
- **📱 Ultra Responsive**: Optimized layouts for mobile, tablet, and desktop using Tailwind CSS's advanced grid and flex systems.
- **🎨 Modern Design**: A high-end UI featuring glassmorphism, subtle micro-animations, and a sleek dark/light mode experience powered by Shadcn UI.
- **✅ Type Safe**: Built with TypeScript for robust development and maintenance.

## ⚙️ Parsing Engine

This project uses **[PapaParse](https://www.papaparse.com/)**, the most powerful in-browser CSV parser for JavaScript. It was selected for:
- **Fast Parsing**: Capable of handling millions of rows without locking the main thread.
- **Robustness**: Automatically handles malformed CSVs, different delimiters, and escaped quotes.
- **Local-Only Processing**: Data never leaves the browser, ensuring maximum privacy and zero latency.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **CSV Engine**: [PapaParse](https://www.papaparse.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/csvexport.git
   cd csvexport
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🧩 Shadcn Components Used

The project utilizes several modular Shadcn components:
- `Table` (Data display)
- `Input` (Search)
- `Select` (Column filtering)
- `Pagination` (Navigation)
- `Card` (Layout containers)
- `Badge` (Result counts)
- `Button` (Upload & Actions)

## 📁 Project Structure

```text
src/
├── components/ui/   # Shadcn UI components
├── lib/             # Utilities (CN merger etc.)
├── Page/            # Main application pages
│   └── HomePage.tsx # Core CSV logic and UI
├── App.tsx          # Main application wrapper
└── main.tsx         # Entry point
public/
└── favicon.svg      # Custom FileSpreadsheet favicon
```
.
