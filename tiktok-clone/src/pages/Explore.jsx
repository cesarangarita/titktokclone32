import React, { useState, useEffect, useRef, memo } from 'react'
import { supabase } from '../services/supabase'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlay, FaHeart } from 'react-icons/fa'
import './Explore.css'

const categories = [
  'Todo',
  ' baile',
  'Comedia',
  'Deportes',
  'games',
  'Tecnologia'
  
]

const ExploreVideoCard = memo(function ExploreVideoCard({ video }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    let observer;
    // Intentar reproducir el video al montar si está visible
    const tryPlay = () => {
      if (videoEl && videoEl.offsetParent !== null) {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    };
    tryPlay();
    // Callback para Intersection Observer
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          videoEl.pause();
          videoEl.currentTime = 0;
        }
      });
    };
    observer = new window.IntersectionObserver(handleIntersection, {
      threshold: 0.2
    });
    observer.observe(videoEl);
    return () => {
      if (observer && videoEl) observer.unobserve(videoEl);
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = !isHovered;
    if (isHovered) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [isHovered]);

  const handleClick = async (e) => {
    e.preventDefault();
    // Obtener la información completa del video antes de navegar
    const { data: videoWithDetails, error } = await supabase
      .from('videos')
      .select(`
        *,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .eq('id', video.id)
      .single();

    if (!error && videoWithDetails) {
      navigate('/', { state: { selectedVideo: videoWithDetails } });
    }
  };

  return (
    <Link 
      to="/" 
      className={`explore-video-card ${isHovered ? 'is-hovered' : ''}`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`Ver video de ${video.profiles?.username || 'usuario'}`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
      style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
    >
      <div className="video-thumbnail" style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}>
        <video
          ref={videoRef}
          src={`https://kwajnaiebdhdonootfwh.supabase.co/storage/v1/object/public/videos/${video.storage_path}`}
          poster={video.thumbnail_url}
          muted
          loop
          playsInline
          preload="metadata"
          loading="lazy"
          autoPlay
          style={{ width: '100%', background: '#000', borderRadius: '12px', transition: 'box-shadow 0.2s, transform 0.2s' }}
        />
        <div className="video-stats">
          <span><FaPlay /> {formatNumber(video.views_count || 0)}</span>
          <span role="img" aria-label="like" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z" fill="#fe2c55" stroke="#fe2c55" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </span>
          <span role="img" aria-label="comment" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 8 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
              <use xlinkHref="#Bubble_Ellipsis_Right_Fill-7ce6d3b3"></use>
            </svg>
          </span>
        </div>
      </div>
      <div className="video-info">
        <div className="video-description">{video.description}</div>
        <div className="video-author">
          <div className="action">
            <img
              alt="avatar"
              src={video.profiles?.avatar_url ? video.profiles.avatar_url : '/default-avatar.png'}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            />
          </div>
          <span>@{video.profiles?.username ? video.profiles.username : 'usuario'}</span>
        </div>
      </div>
    </Link>
  )
});

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num
}

function Explore() {
  const [videos, setVideos] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Todo')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        let query = supabase
          .from('videos')
          .select(`
            *,
            profiles:user_id (
              username,
              avatar_url
            )
          `)
          .order('created_at', { ascending: false }) // Primero ordenamos por fecha
          .limit(100) // Obtenemos los últimos 100 videos
          .then(result => ({
            ...result,
            data: result.data?.sort(() => Math.random() - 0.5).slice(0, 20) // Mezclamos aleatoriamente y tomamos 20
          }))
        
        if (selectedCategory !== 'Todo') {
          query = query.eq('category', selectedCategory)
        }

        const { data, error } = await query
        
        if (error) throw error
        setVideos(data || [])
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos();
  }, [selectedCategory]);

  return (
    <div className="explore-container">
      <div className="categories-scroll" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            tabIndex={0}
            aria-label={`Filtrar por ${category}`}
            style={{ transition: 'background 0.2s, color 0.2s' }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="explore-grid">
        {loading ? (
          <div className="skeleton-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          videos.map(video => (
            <ExploreVideoCard key={video.id} video={video} />
          ))
        )}
      </div>
  
    </div>
  )
}

export default Explore
