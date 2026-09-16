/**
 * ErrorBoundary — class component (the only way to catch render errors in React).
 * Wraps each route so one failing section degrades that section instead of
 * blanking the whole site.
 */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, Home } from 'lucide-react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Surface it in the console for debugging; there is no backend to report to.
    console.error('[Aarambh Fitness] render error caught by boundary:', error, info?.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    const { label = 'this section' } = this.props;

    if (!error) return this.props.children;

    return (
      <div className="error-boundary" role="alert">
        <span className="error-boundary__tag">Something went wrong</span>
        <h2 className="error-boundary__title">
          {label} could not be displayed.
        </h2>
        <p className="error-boundary__lede">
          Nothing you did caused this. Try again, and if it keeps happening send us a message on
          WhatsApp and we will help you directly.
        </p>
        <div className="error-boundary__actions">
          <button type="button" className="btn btn--primary" onClick={this.reset}>
            <RotateCcw size={15} /> Try again
          </button>
          <Link to="/" className="btn btn--outline">
            <Home size={15} /> Back to home
          </Link>
        </div>
      </div>
    );
  }
}
