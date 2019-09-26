module.exports = {
    theme: {
        extend: {
            colors: {
                black: '#0f0f0f',
                primary: {
                    '500': '#FD5600',
                    '600': '#FD2806',
                    '800': '#FF9100',
                },
            },
        },
        borderWidth: {
            default: '2px',
        },
        cursor: {
            pointer: 'pointer',
            grab: 'grab',
            grabbing: 'grabbing',
        },
        screens: {
            'xs': '320px', // => @media (min-width: 640px) { ... }
            'sm': '640px', // => @media (min-width: 640px) { ... }
            'md': '768px', // => @media (min-width: 768px) { ... }
            'lg': '1024px', // => @media (min-width: 1024px) { ... }
            'xl': '1280px', // => @media (min-width: 1280px) { ... }
        }
    },
    variants: {
        opacity: ['responsive', 'hover', 'group-hover'],
    }
}