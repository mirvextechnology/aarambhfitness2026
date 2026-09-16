/**
 * ProgressTracker — frontend-only progress log stored in localStorage.
 * No account, no server: the data never leaves the browser.
 */
import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, TrendingDown, TrendingUp, RotateCcw, Lock } from 'lucide-react';
import { goalOptions } from '../../data/fitnessGoals.js';
import {
  loadProgress,
  saveProgress,
  deleteRecord,
  clearProgress,
} from '../../utils/bookingHelpers.js';
import { showToast } from '../../utils/emailSender.js';
import './ProgressTracker.css';

const EMPTY = { weight: '', goal: '', frequency: '', targetWeight: '', notes: '' };

export default function ProgressTracker() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  /* hydrate from localStorage */
  useEffect(() => {
    const stored = loadProgress();
    setData(stored);
    if (stored) {
      setForm((f) => ({
        ...f,
        goal: stored.goal || '',
        frequency: stored.frequency || '',
        targetWeight: stored.targetWeight ? String(stored.targetWeight) : '',
        notes: stored.notes || '',
      }));
    }
    setReady(true);
  }, []);

  const records = useMemo(() => data?.records || [], [data]);

  const stats = useMemo(() => {
    if (!records.length) return null;
    const weights = records.map((r) => Number(r.weight)).filter((n) => Number.isFinite(n));
    if (!weights.length) return null;
    const first = weights[0];
    const last = weights[weights.length - 1];
    const change = Math.round((last - first) * 10) / 10;
    return {
      first,
      last,
      change,
      min: Math.min(...weights),
      max: Math.max(...weights),
      count: weights.length,
    };
  }, [records]);

  /* SVG sparkline geometry */
  const chart = useMemo(() => {
    if (!stats || stats.count < 2) return null;
    const weights = records.map((r) => Number(r.weight));
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const span = max - min || 1;
    const w = 320;
    const h = 84;
    const pad = 8;
    const points = weights.map((value, i) => {
      const x = pad + (i / (weights.length - 1)) * (w - pad * 2);
      const y = pad + (1 - (value - min) / span) * (h - pad * 2);
      return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
    });
    return {
      line: points.map((p) => p.join(',')).join(' '),
      area: `${pad},${h - pad} ${points.map((p) => p.join(',')).join(' ')} ${w - pad},${h - pad}`,
      last: points[points.length - 1],
      width: w,
      height: h,
    };
  }, [records, stats]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const addEntry = (e) => {
    e.preventDefault();
    const weight = Number(form.weight);
    if (!Number.isFinite(weight) || weight < 20 || weight > 400) {
      setError('Enter a weight between 20 and 400 kg.');
      return;
    }
    setError('');
    const next = saveProgress({
      weight,
      goal: form.goal,
      frequency: form.frequency,
      targetWeight: form.targetWeight ? Number(form.targetWeight) : undefined,
      notes: form.notes,
    });
    if (!next) {
      setError('Could not save — your browser storage may be blocked.');
      return;
    }
    setData(next);
    setForm((f) => ({ ...f, weight: '', notes: '' }));
    showToast('Progress entry saved to this device');
  };

  const removeRecord = (id) => {
    const next = deleteRecord(id);
    if (next) setData(next);
  };

  const reset = () => {
    clearProgress();
    setData(null);
    setForm(EMPTY);
    showToast('Progress cleared from this device', 'info');
  };

  if (!ready) return null;

  return (
    <section className="tracker section bg-800" id="progress-tracker" aria-labelledby="tracker-title">
      <div className="container">
        <header className="tracker__head">
          <div>
            <span className="section-index">13 — Tracker</span>
            <h2 className="tracker__title" id="tracker-title">
              Track your own progress
            </h2>
            <p className="tracker__lede">
              A private log stored only in this browser. No account, no sign-up, nothing is sent
              anywhere — it is simply a way to see the trend between sessions.
            </p>
          </div>
          <span className="tracker__private">
            <Lock size={14} /> Stored locally on this device
          </span>
        </header>

        <div className="tracker__grid">
          {/* form */}
          <form className="tracker__form" onSubmit={addEntry} noValidate>
            <span className="tech-label">Log an entry</span>

            <div className="tracker__fields">
              <div className={`field ${error ? 'field--error' : ''}`}>
                <label className="field__label" htmlFor="tracker-weight">
                  Current weight (kg)<span className="req">*</span>
                </label>
                <input
                  id="tracker-weight"
                  className="input"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="20"
                  max="400"
                  placeholder="72.4"
                  value={form.weight}
                  onChange={set('weight')}
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tracker-goal">
                  Goal
                </label>
                <select id="tracker-goal" className="select" value={form.goal} onChange={set('goal')}>
                  <option value="">Not set</option>
                  {goalOptions.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tracker-freq">
                  Sessions per week
                </label>
                <select id="tracker-freq" className="select" value={form.frequency} onChange={set('frequency')}>
                  <option value="">Not set</option>
                  {['1', '2', '3', '4', '5', '6', '7'].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="tracker-target">
                  Target weight (kg)
                </label>
                <input
                  id="tracker-target"
                  className="input"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="20"
                  max="400"
                  placeholder="68"
                  value={form.targetWeight}
                  onChange={set('targetWeight')}
                />
              </div>

              <div className="field span-2">
                <label className="field__label" htmlFor="tracker-notes">
                  Personal notes
                </label>
                <textarea
                  id="tracker-notes"
                  className="textarea"
                  rows={3}
                  placeholder="Sleep, soreness, session notes, anything worth remembering."
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>
            </div>

            {error ? (
              <p className="field__error" role="alert">
                {error}
              </p>
            ) : null}

            <div className="tracker__form-actions">
              <button type="submit" className="btn btn--primary">
                <Plus size={16} /> Add entry
              </button>
              {records.length ? (
                <button type="button" className="btn btn--ghost" onClick={reset}>
                  <RotateCcw size={15} /> Clear all
                </button>
              ) : null}
            </div>
          </form>

          {/* visualisation */}
          <div className="tracker__panel">
            {stats ? (
              <>
                <div className="tracker__stats">
                  <div>
                    <span className="tech-label">Latest</span>
                    <strong className="mono">{stats.last} kg</strong>
                  </div>
                  <div>
                    <span className="tech-label">Change</span>
                    <strong className={`mono ${stats.change <= 0 ? 'is-down' : 'is-up'}`}>
                      {stats.change > 0 ? '+' : ''}
                      {stats.change} kg
                      {stats.change <= 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                    </strong>
                  </div>
                  <div>
                    <span className="tech-label">Entries</span>
                    <strong className="mono">{stats.count}</strong>
                  </div>
                  {data?.targetWeight ? (
                    <div>
                      <span className="tech-label">Target</span>
                      <strong className="mono">{data.targetWeight} kg</strong>
                    </div>
                  ) : null}
                </div>

                {chart ? (
                  <div className="tracker__chart">
                    <svg viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-label="Weight trend chart">
                      <polygon points={chart.area} fill="rgba(255, 90, 31, 0.12)" />
                      <polyline
                        points={chart.line}
                        fill="none"
                        stroke="#FF5A1F"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <circle cx={chart.last[0]} cy={chart.last[1]} r="4" fill="#FF5A1F" />
                    </svg>
                  </div>
                ) : (
                  <p className="tracker__hint">Add a second entry to see your trend line.</p>
                )}

                <ul className="tracker__records" role="list">
                  {records
                    .slice()
                    .reverse()
                    .map((record) => (
                      <li className="tracker__record" key={record.id}>
                        <span className="tracker__record-date mono">{record.date}</span>
                        <span className="tracker__record-weight mono">{record.weight} kg</span>
                        {record.notes ? <span className="tracker__record-notes">{record.notes}</span> : null}
                        <button
                          type="button"
                          className="tracker__record-delete"
                          onClick={() => removeRecord(record.id)}
                          aria-label={`Delete entry from ${record.date}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <div className="tracker__empty">
                <strong>No entries yet</strong>
                <p>
                  Log your starting weight on the left. Add an entry every week or two and the trend
                  will show up here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
