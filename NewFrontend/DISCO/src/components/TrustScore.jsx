import { useEffect, useState } from 'react';
import { TrendingUp, Clock, DollarSign, CheckCircle } from 'lucide-react';
import './TrustScore.css';

export default function TrustScore({ score = 91.2, breakdown = null }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const defaultBreakdown = breakdown || {
    onTime: 92,
    costEfficiency: 88,
    successRate: 95
  };

  useEffect(() => {
    // Animate score from 0 to target
    let current = 0;
    const target = score;
    const increment = target / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 75) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="trust-score-container card">
      <h3>Trust Score</h3>
      <div className="trust-score-visual">
        <svg className="progress-ring" width="180" height="180">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle
            className="progress-ring-background"
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
          />
          <circle
            className="progress-ring-progress"
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="score-text">
          <span className="score-value">{animatedScore.toFixed(1)}</span>
          <span className="score-max">/100</span>
        </div>
      </div>

      <div className="trust-breakdown">
        <div className="breakdown-item">
          <Clock size={18} />
          <div className="breakdown-info">
            <span className="breakdown-label">On-Time Delivery</span>
            <span className="breakdown-value">{defaultBreakdown.onTime}%</span>
          </div>
        </div>
        <div className="breakdown-item">
          <DollarSign size={18} />
          <div className="breakdown-info">
            <span className="breakdown-label">Cost Efficiency</span>
            <span className="breakdown-value">{defaultBreakdown.costEfficiency}%</span>
          </div>
        </div>
        <div className="breakdown-item">
          <CheckCircle size={18} />
          <div className="breakdown-info">
            <span className="breakdown-label">Success Rate</span>
            <span className="breakdown-value">{defaultBreakdown.successRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
