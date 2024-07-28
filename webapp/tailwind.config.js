/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors:{
            white:'#ffffff',
            grey:{
                100:'#e8eff2',
                200:'#d5e4ef',
                300:'#c3d7e7',
                400:'#a5c0d5',
                500:'#87a1b7',
                600:'#698399',
                700:'#4b657b',
                800:'#2d475d',
                900:'#0f293f',
            },
            red:{
                300:'#fd4646',
            },
            beige:{
                100:'#f7e9d8',
                200:'#f2d8ba',
                300:'#e3bf98',
                400:'#c5a17a',
            }
        },
        screens:{
            md:'1024px',
            sm:'768px',
        }
    },
    plugins: [],
}