import React, { Component } from 'react';
import { Link } from '@reach/router';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('An error occured in the component', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>
            An error occurred while making the request. Click{' '}
            <Link to="/">here</Link>to go home
          </h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
