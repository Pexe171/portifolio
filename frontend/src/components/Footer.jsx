function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-2">
        <span>© {new Date().getFullYear()} David Henrique Miranda da Silva</span>
        <span>Construído com Spring Boot &amp; React.</span>
      </div>
    </footer>
  );
}

export default Footer;
