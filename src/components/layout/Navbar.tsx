import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="#" className="text-xl font-serif font-bold">
                    Mathieu Schrurs
                </a>

                <nav className="hidden md:block">
                    <ul className="flex space-x-8">
                        <li><a href="#about" className="hover:text-blue-500 transition-colors">About</a></li>
                        <li><a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a></li>
                        <li><a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a></li>
                        <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
                    </ul>
                </nav>

                <button className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
