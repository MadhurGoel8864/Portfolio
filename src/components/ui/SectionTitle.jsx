export function SectionTitle({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 0 }}>
      <div className="sec-eyebrow">
        <span>{label}</span>
      </div>
      <h2 className="sec-title">{title}</h2>
      <div className="sec-underline" />
      {subtitle && <p className="sec-subtitle">{subtitle}</p>}
    </div>
  );
}
