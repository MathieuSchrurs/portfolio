import CVDownload from '../ui/CVDownload'; // Import the CVDownload component

const Hero = () => {
    return (
        <section
            id="hero"
            className="min-h-[calc(100vh-80px)] flex items-center mx-auto max-w-3xl py-20"
        >
            <div>
                <p className="text-green font-mono text-base mb-4">
                    Hi, my name is
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-lightest-slate mb-4">
                    Mathieu Schrurs.
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate mb-6">
                    I build things for the web.
                </h2>
                <p className="text-lg text-slate max-w-xl mb-12">
                    I'm a software engineer specializing in building (and occasionally designing) exceptional, high-quality websites and applications.
                </p>
                <div className="flex space-x-4"> {/* Add flex container for buttons */}
                    <a
                        href="#contact" // Link to contact section or email
                        className="inline-block font-mono text-sm text-green border border-green rounded-sm px-8 py-4 hover:bg-green/10 transition-colors duration-300"
                    >
                        Get In Touch
                    </a>
                    <CVDownload /> {/* Add the CVDownload button */}
                </div>
            </div>
        </section>
    );
};

export default Hero;
