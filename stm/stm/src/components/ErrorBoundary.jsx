import { Component } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fallback" role="alert">
          <span className="fallback__icon" aria-hidden="true">
            <TriangleAlert size={22} />
          </span>
          <div>
            <h3>We couldn't display your tasks</h3>
            <p>Your tasks are still safe. Refresh the page to try again.</p>
          </div>
          <button className="button button--soft" onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
