import React from 'react';
import './ErrorBoundary.css';

/**
 * Error Boundary para capturar errores de React y mostrar UI de fallback
 *
 * Captura errores en:
 * - Render
 * - Lifecycle methods
 * - Constructors de componentes hijos
 *
 * NO captura errores en:
 * - Event handlers (usar try/catch)
 * - Código asíncrono
 * - Server-side rendering
 * - Errores del propio Error Boundary
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Actualizar estado para renderizar UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log del error (podría enviarse a un servicio de logging)
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Aquí podrías enviar el error a un servicio de logging
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Recargar la página
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // UI de fallback
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-boundary-icon">⚠️</div>
            <h1 className="error-boundary-title">Algo salió mal</h1>
            <p className="error-boundary-message">
              La aplicación encontró un error inesperado.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary-details">
                <summary>Detalles del error (desarrollo)</summary>
                <pre className="error-boundary-stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="error-boundary-actions">
              <button
                onClick={this.handleReset}
                className="error-boundary-button"
              >
                🔄 Reiniciar Aplicación
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
