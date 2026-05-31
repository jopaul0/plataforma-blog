const navRoutes = {
    default: [
        { name: 'Início', href: '/' },
        { name: 'Sobre', href: '/about' },
        { name: 'Pesquisar', href: '/search' },
    ],
    isAuthenticated: [
        { name: 'Início', href: '/' },
        { name: 'Painel', href: '/dashboard' },
        { name: 'Sobre', href: '/about' },
        { name: 'Pesquisar', href: '/search' },
    ],
};

export default navRoutes;