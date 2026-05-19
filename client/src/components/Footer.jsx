function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-stone-300 bg-stone-100">
      <p className="text-center text-green-800 text-sm">
        © {new Date().getFullYear()} Resource Manager — Built with MERN
      </p>
    </footer>
  );
}

export default Footer;
