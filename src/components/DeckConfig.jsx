import React from 'react';
import './DeckConfig.css';

/**
 * Componente de Información - Modal informativo sobre la aplicación
 *
 * Muestra información sobre los mazos y la aplicación
 */
const DeckConfig = ({ isOpen, onClose, wordCards, imageCards }) => {
  if (!isOpen) return null;

  return (
    <div className="config-overlay">
      <div className="config-panel">
        <div className="config-header">
          <h2>ℹ️ Información de la Aplicación</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="config-body info-content">
          <section className="info-section">
            <h3>🎴 Acerca de Duetto</h3>
            <p>
              Duetto es una aplicación de cartas proyectivas para terapia y autoconocimiento,
              inspirada en las OH Cards. Combina palabras e imágenes para facilitar procesos
              terapéuticos y exploración emocional.
            </p>
          </section>

          <section className="info-section">
            <h3>📊 Composición de los Mazos</h3>
            <div className="deck-info">
              <div className="deck-stat">
                <span className="stat-icon">📝</span>
                <div className="stat-details">
                  <strong>Mazo de Palabras</strong>
                  <p>{wordCards.length} cartas con conceptos cuidadosamente seleccionados</p>
                </div>
              </div>
              <div className="deck-stat">
                <span className="stat-icon">🖼️</span>
                <div className="stat-details">
                  <strong>Mazo de Imágenes</strong>
                  <p>{imageCards.length} cartas con símbolos visuales proyectivos</p>
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h3>🎯 Cómo Usar la Aplicación</h3>
            <ol className="usage-steps">
              <li>Desplázate por los mazos y selecciona las cartas que te llamen la atención</li>
              <li>Puedes seleccionar una carta de cada mazo (máximo 1 por mazo)</li>
              <li>Presiona el botón "✨ Revelar carta/s" para voltear las cartas seleccionadas</li>
              <li>Reflexiona sobre la combinación de palabra + imagen que obtuviste</li>
              <li>Usa "🔄 Reiniciar / Mezclar" cuando quieras comenzar una nueva sesión</li>
            </ol>
          </section>

          <section className="info-section">
            <h3>⚙️ Características</h3>
            <ul className="features-list">
              <li><strong>100% Offline:</strong> Toda la aplicación funciona sin conexión a internet</li>
              <li><strong>Privacidad Total:</strong> Ningún dato sale de tu computadora</li>
              <li><strong>Mezcla Aleatoria:</strong> Los mazos se barajan al iniciar y al reiniciar</li>
              <li><strong>Modo Oscuro:</strong> Alterna entre tema claro y oscuro según tu preferencia</li>
              <li><strong>Pantalla Completa:</strong> Usa el modo inmersivo para tus sesiones</li>
            </ul>
          </section>

          <section className="info-section version-info">
            <p><strong>Versión:</strong> 1.3.1</p>
            <p><strong>Desarrollado para:</strong> Procesos terapéuticos y autoexploración</p>
          </section>
        </div>

        <div className="config-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckConfig;
