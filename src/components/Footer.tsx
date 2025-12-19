const Footer = () => {
  return (
    <footer
      className="w-full max-w-2xl lg:max-w-4xl mx-auto px-4 mt-16 pb-8
      flex flex-col items-center text-center"
    >
      <a
        href="https://trog.codes"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 font-tektur text-sm md:text-base
          hover:text-white/80 transition-colors duration-300"
      >
        Made by <u>Joe Bullet</u>
      </a>
    </footer>
  );
};

export default Footer;
