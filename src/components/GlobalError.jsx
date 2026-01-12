import React from 'react';

class GlobalError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', backgroundColor: '#fee2e2', color: '#b91c1c', minHeight: '100vh', fontFamily: 'sans-serif' }}>
                    <h1>Something went wrong.</h1>
                    <p>Please report this error:</p>
                    <pre style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalError;
