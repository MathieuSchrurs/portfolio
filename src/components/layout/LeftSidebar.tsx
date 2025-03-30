import SocialIcon from '../ui/SocialIcon'; // Assuming you kept this component

const LeftSidebar = () => {
    return (
        // Position fixed, bottom-aligned, left-aligned
        // Hidden on small screens (md:block)
        <div className="hidden md:block fixed bottom-0 left-10 z-30 w-10">
            <ul className="flex flex-col items-center space-y-6 list-none p-0 m-0">
                <li><SocialIcon platform="github" url="https://github.com/yourusername" /></li>
                <li><SocialIcon platform="linkedin" url="https://linkedin.com/in/yourusername" /></li>
                <li><SocialIcon platform="instagram" url="https://instagram.com/yourusername" /></li>
            </ul>
            {/* Vertical Line */}
            <div className="h-24 w-px bg-light-slate mx-auto mt-6"></div>
        </div>
    );
};

export default LeftSidebar;
