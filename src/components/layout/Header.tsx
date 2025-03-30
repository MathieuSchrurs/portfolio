// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import AnimatedLogo from '../ui/AnimatedLogo';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                ? 'bg-navy/80 backdrop-blur-md shadow-lg h-16'
                : 'bg-navy h-20'
                }`}
        >
            <nav className="container mx-auto h-full px-6 flex justify-between items-center">
                {/* Logo Link */}
                <a
                    href="/"
                    aria-label="home"
                    // Increase size: e.g., from w-12 h-12 to w-14 h-14
                    className="block w-22 h-22 text-green transition-colors hover:text-green/80" // <-- ADJUSTED SIZE
                >
                    {/* Ensure AnimatedLogo fills its container */}
                    <AnimatedLogo className="w-full h-full" />
                </a>

                {/* Desktop Navigation (rest of the component remains the same) */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <ol className="flex space-x-6 lg:space-x-8 list-none p-0 m-0">
                        {navItems.map((item, index) => (
                            <li key={item.name} className="font-mono text-sm">
                                <a
                                    href={item.href}
                                    className="text-lightest-slate hover:text-green transition-colors duration-300"
                                >
                                    <span className="text-green mr-1">0{index + 1}.</span>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ol>
                    {/* Resume Button */}
                    <a
                        href="/path-to-your-resume.pdf" // Update path
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-green border border-green rounded px-4 py-2 hover:bg-green/10 transition-colors duration-300"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-green">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>
        </header>
    );
};

export default Header;
