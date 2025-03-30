const RightSidebar = () => {
    return (
        // Position fixed, bottom-aligned, right-aligned
        // Hidden on small screens (md:block)
        <div className="hidden md:block fixed bottom-0 right-10 z-30 w-10">
            <div className="flex flex-col items-center space-y-6">
                <a
                    href="mailto:mathieu@schrurs.be" // Update email
                    className="font-mono text-xs tracking-widest text-light-slate hover:text-green transition-colors duration-300"
                    style={{ writingMode: 'vertical-rl' }} // Vertical text
                >
                    mathieu@schrurs.be
                </a>
            </div>
            {/* Vertical Line */}
            <div className="h-24 w-px bg-light-slate mx-auto mt-6"></div>
        </div>
    );
};

export default RightSidebar;
