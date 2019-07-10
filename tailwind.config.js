module.exports = {
    theme: {
        extend: {
            colors: {
                black: '#0f0f0f',
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
    },
    variants: {
        opacity: ['responsive', 'hover', 'group-hover'],
    }
}