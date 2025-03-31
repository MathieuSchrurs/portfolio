const Contact = () => {
    return (
        <section id="contact" className="py-24 mx-auto max-w-xl text-center">
            <h2 className="flex items-center justify-center mb-4 font-mono text-base text-green">
                <span className="mr-2">04.</span> What's Next?
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-4">
                Get In Touch
            </h3>
            <p className="text-slate mb-10 mx-auto max-w-lg">
                Although I'm not currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                {/* OR: I'm currently looking for new opportunities... */}
            </p>
            <a
                href="mailto:your.email@example.com" // Update email
                className="inline-block font-mono text-sm text-green border border-green rounded-sm px-8 py-4 hover:bg-green/10 transition-colors duration-300"
            >
                Say Hello
            </a>
        </section>
    );
};

export default Contact;
