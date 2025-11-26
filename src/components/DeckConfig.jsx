import React, { useState } from 'react';
import './DeckConfig.css';

/**
 * Componente DeckConfig - Configuración de mazos
 *
 * Permite editar:
 * - Cantidad de cartas por mazo
 * - Contenido de cada carta (palabras/emojis)
 */
const DeckConfig = ({ isOpen, onClose, wordCards, imageCards, onUpdateCards }) => {
  const [activeTab, setActiveTab] = useState('words'); // 'words' o 'images'
  const [editingWords, setEditingWords] = useState(wordCards);
  const [editingImages, setEditingImages] = useState(imageCards);

  if (!isOpen) return null;

  const handleWordChange = (index, newContent) => {
    const updated = [...editingWords];
    updated[index] = { ...updated[index], content: newContent };
    setEditingWords(updated);
  };

  const handleImageChange = (index, newContent) => {
    const updated = [...editingImages];
    updated[index] = { ...updated[index], content: newContent };
    setEditingImages(updated);
  };

  const handleAddWordCard = () => {
    const newId = `w${editingWords.length + 1}`;
    const newWord = { id: newId, type: 'word', content: 'NUEVA', state: 'faceDown' };
    setEditingWords([...editingWords, newWord]);
  };

  const handleAddImageCard = () => {
    const newImageId = `i${editingImages.length + 1}`;
    const newImage = { id: newImageId, type: 'image', content: '❓', state: 'faceDown' };
    setEditingImages([...editingImages, newImage]);
  };

  const handleRemoveWordCard = (index) => {
    if (editingWords.length > 1) {
      setEditingWords(editingWords.filter((_, i) => i !== index));
    }
  };

  const handleRemoveImageCard = (index) => {
    if (editingImages.length > 1) {
      setEditingImages(editingImages.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    onUpdateCards(editingWords, editingImages);
    onClose();
  };

  const handleCancel = () => {
    setEditingWords(wordCards);
    setEditingImages(imageCards);
    onClose();
  };

  return (
    <div className="config-overlay">
      <div className="config-panel">
        <div className="config-header">
          <h2>⚙️ Configuración de Mazos</h2>
          <button className="close-btn" onClick={handleCancel}>✕</button>
        </div>

        <div className="config-body">
          <div className="config-tabs">
            <button
              className={`tab ${activeTab === 'words' ? 'active' : ''}`}
              onClick={() => setActiveTab('words')}
            >
              📝 Palabras ({editingWords.length})
            </button>
            <button
              className={`tab ${activeTab === 'images' ? 'active' : ''}`}
              onClick={() => setActiveTab('images')}
            >
              🖼️ Imágenes ({editingImages.length})
            </button>
          </div>

          <div className="config-info">
            <p><strong>Cartas en este mazo:</strong> {activeTab === 'words' ? editingWords.length : editingImages.length}</p>
            <button
              className="btn-add"
              onClick={activeTab === 'words' ? handleAddWordCard : handleAddImageCard}
            >
              + Agregar carta
            </button>
          </div>

          <div className="cards-editor">
            {activeTab === 'words' ? (
              <div className="cards-list">
                {editingWords.map((card, index) => (
                  <div key={card.id} className="card-edit-row">
                    <span className="card-number">{index + 1}</span>
                    <input
                      type="text"
                      value={card.content}
                      onChange={(e) => handleWordChange(index, e.target.value)}
                      className="card-input"
                      placeholder="PALABRA"
                    />
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveWordCard(index)}
                      disabled={editingWords.length <= 1}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cards-list">
                {editingImages.map((card, index) => (
                  <div key={card.id} className="card-edit-row">
                    <span className="card-number">{index + 1}</span>
                    <input
                      type="text"
                      value={card.content}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="card-input card-input-emoji"
                      placeholder="Emoji o URL"
                    />
                    <span className="emoji-preview">{card.content}</span>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveImageCard(index)}
                      disabled={editingImages.length <= 1}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="config-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeckConfig;
