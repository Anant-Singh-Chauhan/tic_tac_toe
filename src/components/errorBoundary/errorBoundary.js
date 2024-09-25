import React from "react";
import { logClientInfo } from "../../loggerService";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log the error to an error reporting service
    logClientInfo("error", error.toString(), info.componentStack);

    // Refresh the page after 10 seconds
    setTimeout(() => {
        window.location.reload();
      }, 10000);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong. The page will refresh in 10 seconds.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
