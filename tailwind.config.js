const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT(
  {
    content: [
      'node_modules/flowbite-react/lib/esm/**/*.js',
      './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
)