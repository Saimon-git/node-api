/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  safelist: [
    // Colores y negrita para el contador del carrito
    "font-bold",
    "text-blue-600",
    "text-green-700",
    "text-yellow-500",
    // Margins
    "m-0", "m-1", "m-2", "m-3", "m-4", "m-5", "m-6", "m-8", "m-10", "m-12", "m-16", "m-20", "m-24", "m-32", "m-40", "m-48", "m-56", "m-64",
    "mt-0", "mt-1", "mt-2", "mt-3", "mt-4", "mt-5", "mt-6", "mt-8", "mt-10", "mt-12", "mt-16", "mt-20", "mt-24", "mt-32", "mt-40", "mt-48", "mt-56", "mt-64",
    "mb-0", "mb-1", "mb-2", "mb-3", "mb-4", "mb-5", "mb-6", "mb-8", "mb-10", "mb-12", "mb-16", "mb-20", "mb-24", "mb-32", "mb-40", "mb-48", "mb-56", "mb-64",
    "ml-0", "ml-1", "ml-2", "ml-3", "ml-4", "ml-5", "ml-6", "ml-8", "ml-10", "ml-12", "ml-16", "ml-20", "ml-24", "ml-32", "ml-40", "ml-48", "ml-56", "ml-64",
    "mr-0", "mr-1", "mr-2", "mr-3", "mr-4", "mr-5", "mr-6", "mr-8", "mr-10", "mr-12", "mr-16", "mr-20", "mr-24", "mr-32", "mr-40", "mr-48", "mr-56", "mr-64",
    // Paddings
    "p-0", "p-1", "p-2", "p-3", "p-4", "p-5", "p-6", "p-8", "p-10", "p-12", "p-16", "p-20", "p-24", "p-32", "p-40", "p-48", "p-56", "p-64",
    "pt-0", "pt-1", "pt-2", "pt-3", "pt-4", "pt-5", "pt-6", "pt-8", "pt-10", "pt-12", "pt-16", "pt-20", "pt-24", "pt-32", "pt-40", "pt-48", "pt-56", "pt-64",
    "pb-0", "pb-1", "pb-2", "pb-3", "pb-4", "pb-5", "pb-6", "pb-8", "pb-10", "pb-12", "pb-16", "pb-20", "pb-24", "pb-32", "pb-40", "pb-48", "pb-56", "pb-64",
    "pl-0", "pl-1", "pl-2", "pl-3", "pl-4", "pl-5", "pl-6", "pl-8", "pl-10", "pl-12", "pl-16", "pl-20", "pl-24", "pl-32", "pl-40", "pl-48", "pl-56", "pl-64",
    "pr-0", "pr-1", "pr-2", "pr-3", "pr-4", "pr-5", "pr-6", "pr-8", "pr-10", "pr-12", "pr-16", "pr-20", "pr-24", "pr-32", "pr-40", "pr-48", "pr-56", "pr-64"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
