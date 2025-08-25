import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { IoShareOutline } from 'react-icons/io5';
import { FaMusic, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './VideoCard.css';

const VideoCard = ({ video, isActive }) => {
  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      const shouldUnmute = isActive && !videoEl.paused && volume > 0;
      videoEl.muted = !shouldUnmute;
    }
    const handlePlayPause = () => {
      if (videoEl) {
        const shouldUnmute = isActive && !videoEl.paused && volume > 0;
        videoEl.muted = !shouldUnmute;
      }
    };
    if (videoEl) {
      videoEl.addEventListener('play', handlePlayPause);
      videoEl.addEventListener('pause', handlePlayPause);
    }
    return () => {
      if (videoEl) {
        videoEl.removeEventListener('play', handlePlayPause);
        videoEl.removeEventListener('pause', handlePlayPause);
      }
    };
  }, [isActive, volume]);
  const videoRef = useRef(null);
  // Eliminadas variables no usadas
  const [volume, setVolume] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showVolumeIcon, setShowVolumeIcon] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (volume > 0) {
        videoRef.current.volume = 0;
        setVolume(0);
      } else {
        videoRef.current.volume = 1;
        setVolume(1);
      }
    }
  };

  return (
    <div className="video-container">
      <div 
        className={`video-content ${isActive ? 'active' : ''}`}
        onMouseEnter={() => setShowVolumeIcon(true)}
        onMouseLeave={() => setShowVolumeIcon(false)}
      >
        <video
          ref={videoRef}
          src={`https://kwajnaiebdhdonootfwh.supabase.co/storage/v1/object/public/videos/${video.storage_path}`}
          loop
          playsInline
          preload={isActive ? "auto" : "none"}
          poster={video.thumbnail_url}
          muted={volume === 0}
        />
        {showVolumeIcon && (
          <div 
            className="volume-control"
            onMouseEnter={() => setShowVolumeControl(true)}
            onMouseLeave={() => setShowVolumeControl(false)}
            style={{ flexDirection: 'column', top: 20, left: 20, position: 'absolute' }}
          >
            <button className="volume-button" onClick={toggleMute}>
              {volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            {showVolumeControl && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider-vertical"
                style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical', height: 80, width: 16 }}
              />
            )}
          </div>
        )}
      </div>

      <div className="video-actions">
        <div className="action">
          <img
            src={
              video.profiles?.avatar_url && video.profiles.avatar_url !== ''
                ? video.profiles.avatar_url
                : (video.avatar_url || '/default-avatar.png')
            }
            alt="avatar"
            style={{ width: '48px', height: '48px', borderRadius: '50%' }}
          />
        </div>
        <button className="action-button">
          <AiOutlineHeart size={28} />
          <span className="action-count">{video.likes_count || 0}</span>
        </button>
        <button className="action-button">
          <AiOutlineComment size={28} />
          <span className="action-count">{video.comments_count || 0}</span>
        </button>
        <button className="action-button">
          <IoShareOutline size={28} />
          <span className="action-count">{video.shares_count || 0}</span>
        </button>
      </div>

      <div className="video-info">
        <div className="video-author">@{video.user_id}</div>
        <div className="video-caption">{video.description}</div>
        <div className="video-music">
          <FaMusic className="music-icon" />
          <span>Sonido original - {video.user_id}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
