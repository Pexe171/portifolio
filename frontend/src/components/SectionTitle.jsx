function SectionTitle({ title, subtitle }) {
  return (
    <div className="space-y-2">
      <p className="text-primary-500 uppercase tracking-[0.35em] text-xs">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    </div>
  );
}

export default SectionTitle;
