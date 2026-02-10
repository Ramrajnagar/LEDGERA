import './KPIBlock.css';

export default function KPIBlock({ icon: Icon, label, value, trend, color = '#3b82f6' }) {
  return (
    <div className="kpi-block card">
      <div className="kpi-icon" style={{ background: `${color}20`, color: color }}>
        <Icon size={28} />
      </div>
      <div className="kpi-content">
        <span className="kpi-label">{label}</span>
        <div className="kpi-value-row">
          <span className="kpi-value">{value}</span>
          {trend && (
            <span className={`kpi-trend ${trend > 0 ? 'positive' : 'negative'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
