/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-100': '#f3f4f6',
        'gray-200': '#e5e7eb',
        'gray-800': '#1f2937',
        'gray-900': '#111827',
        'accent': {
          'DEFAULT': '#3b82f6',
          'hover': '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
