import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { FaCloudUploadAlt, FaClock, FaFileVideo, FaExpand } from 'react-icons/fa';
import './Upload.css';

// Función para obtener la duración del video
const getVideoDuration = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    
    video.src = URL.createObjectURL(file);
  });
};

function Upload() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      
      // Verificar si es un archivo de video
      if (!selectedFile.type.startsWith('video/')) {
        alert('Por favor, selecciona un archivo de video válido');
        return;
      }

      // Verificar el tamaño del archivo (50GB = 50 * 1024 * 1024 * 1024 bytes)
      const maxSize = 50 * 1024 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        alert('El archivo es demasiado grande. El tamaño máximo es 50GB');
        return;
      }

      setFile(selectedFile);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);

      // Verificar si el usuario está autenticado
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Debes iniciar sesión para subir videos');
        return;
      }

      // Generar un nombre de archivo único
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${timestamp}.${fileExt}`;

      // Subir el video a Supabase Storage
      const { data, error: fileError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'video/mp4'
        });

      if (fileError) {
        console.error('Error detallado:', fileError);
        throw new Error('Error al subir el video: ' + (fileError.message || 'Error desconocido'));
      }

      // Obtener la URL pública del video
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Crear el registro en la base de datos
      const { data: videoData, error: dbError } = await supabase
        .from('videos')
        .insert([
          {
            user_id: user.id,
            description: caption,
            storage_path: fileName,
            storage_bucket: 'videos',
            likes_count: 0,
            comments_count: 0,
            shares_count: 0,
            duration: await getVideoDuration(file),
            created_at: new Date().toISOString()
          }
        ]);

      if (dbError) {
        // Si hay error en la base de datos, eliminar el archivo subido
        await supabase.storage
          .from('videos')
          .remove([`public/${fileName}`]);
        throw dbError;
      }

      alert('¡Video subido exitosamente!');
      setFile(null);
      setCaption('');
      
    } catch (error) {
      console.error('Error al subir el video:', error);
      alert(error.message || 'Error al subir el video. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="upload-container">
      <div 
        className={`upload-box ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt className="upload-icon" />
        <h2 className="upload-title">Selecciona el video que quieres cargar</h2>
        <p className="upload-subtitle">O arrastra y suéltalos aquí</p>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="video-input"
          disabled={uploading}
        />
        <label htmlFor="video-input">
          <button 
            type="button"
            className="select-video-btn" 
            disabled={uploading}
            onClick={() => document.getElementById('video-input').click()}
          >
            {uploading ? 'Subiendo...' : 'Seleccionar video'}
          </button>
        </label>
      </div>

      <div className="specs-container">
        <div className="spec-item">
          <div className="spec-title">
            <FaClock />
            Tamaño y duración
          </div>
          <p className="spec-description">
            Tamaño máximo: 50 GB, duración del video: 60 minutos
          </p>
        </div>

        <div className="spec-item">
          <div className="spec-title">
            <FaFileVideo />
            Formatos de archivo
          </div>
          <p className="spec-description">
            Recomendación: MP4. Se admiten otros formatos principales.
          </p>
        </div>

        <div className="spec-item">
          <div className="spec-title">
            <FaExpand />
            Resoluciones de video
          </div>
          <p className="spec-description">
            Se recomienda que tengan alta resolución: 1080p, 1440p, 4K
          </p>
        </div>
      </div>

      {file && (
        <div className="upload-form">
          <div className="preview-section">
            <div className="video-preview">
              <video
                src={URL.createObjectURL(file)}
                controls
                className="preview-video"
                loop
                playsInline
              />
            </div>
            <div className="video-info">
              <h3>Video seleccionado:</h3>
              <p className="file-name">{file.name}</p>
              <p className="file-size">Tamaño: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
          <div className="caption-input">
            <label className="form-label">Descripción</label>
            <textarea
              className="caption-textarea"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={uploading}
              placeholder="Describe tu video"
            />
            {uploading ? (
              <div className="upload-progress">
                <div className="upload-status">
                  <span className="uploading-text">Subiendo video...</span>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="select-video-btn"
                disabled={!file || uploading}
                onClick={handleSubmit}
              >
                Publicar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
