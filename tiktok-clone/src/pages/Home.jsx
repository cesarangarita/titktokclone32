import React, { useEffect, useState, useRef } from 'react';
import botonMas from '../assets/boton+.png';
import logomastiktok from '../assets/logomastiktok.svg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const { user } = useAuth();
  // Estado para notificación de compartir
  const [showShareMsg, setShowShareMsg] = useState(false);

  // Función para compartir
  const handleShare = (video) => {
    const url = window.location.origin + '/video/' + video.id;
    navigator.clipboard.writeText(url);
    setShowShareMsg(true);
    setTimeout(() => setShowShareMsg(false), 2000);
  };
  // Estado para el modal de comentarios
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Abrir modal y cargar comentarios
  const handleOpenComments = async (videoId) => {
    setSelectedVideoId(videoId);
    setShowCommentsModal(true);
  const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('video_id', videoId)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  // Enviar nuevo comentario
  const handleSendComment = async () => {
    if (!newComment.trim() || !selectedVideoId || !user) return;
  await supabase
      .from('comments')
      .insert({
        video_id: selectedVideoId,
        user_id: user.id,
        text: newComment,
      });
    setNewComment("");
    // Recargar comentarios
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('video_id', selectedVideoId)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };
  // Estado para likes por video (si el usuario ya dio like)
  const [likedVideos, setLikedVideos] = useState({});

  // Cargar likes del usuario al montar los videos
  useEffect(() => {
    async function fetchUserLikes() {
      if (!user || videos.length === 0) return;
      const { data, error } = await supabase
        .from('likes')
        .select('video_id')
        .eq('user_id', user.id);
      if (!error && data) {
        const likesMap = {};
        data.forEach(like => {
          likesMap[like.video_id] = true;
        });
        setLikedVideos(likesMap);
      }
    }
    fetchUserLikes();
  }, [user, videos]);

  // Función para manejar el like y favoritos (solo likes por ahora)
  const handleLike = async (videoId, isLiked, currentLikes) => {
    if (!user) return;
    if (isLiked) {
      // Quitar el like
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('video_id', videoId);
      await supabase
        .from('videos')
        .update({ likes_count: currentLikes - 1 })
        .eq('id', videoId);
    } else {
      // Agregar el like
      await supabase
        .from('likes')
        .insert({ user_id: user.id, video_id: videoId });
      await supabase
        .from('videos')
        .update({ likes_count: currentLikes + 1 })
        .eq('id', videoId);
    }
    setLikedVideos(prev => ({
      ...prev,
      [videoId]: !isLiked
    }));
  }
  const [loadingVideoIndex, setLoadingVideoIndex] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoContainerRef = useRef(null);
  const location = useLocation();
  
  const handleScroll = () => {
    if (!videoContainerRef.current) return;
    
    const container = videoContainerRef.current;
    const scrollPosition = container.scrollTop;
    const videoHeight = container.clientHeight;
    const newIndex = Math.floor(scrollPosition / videoHeight);
    
    if (newIndex !== currentVideoIndex && newIndex < videos.length) {
      setCurrentVideoIndex(newIndex);
    }
  };

  // Cargar el perfil del usuario
  useEffect(() => {
    // Eliminado: carga de perfil de usuario y llamadas a setUserProfile
  }, [user]);

  // Función para obtener las iniciales del nombre de usuario
  // ...función eliminada porque no se usa...

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
        videoContainerRef.current?.scrollTo({
          top: (currentVideoIndex - 1) * videoContainerRef.current.clientHeight,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowDown' && currentVideoIndex < videos.length - 1) {
        videoContainerRef.current?.scrollTo({
          top: (currentVideoIndex + 1) * videoContainerRef.current.clientHeight,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex, videos.length]);
  
  useEffect(() => {
    async function loadVideos() {
      if (location.state?.selectedVideo) {
        // Si tenemos un video seleccionado, lo ponemos primero en la lista
        const selectedVideo = location.state.selectedVideo
        const { data: otherVideos, error } = await supabase
          .from('videos')
          .select(`
            *,
            profiles:user_id (
              username,
              avatar_url
            )
          `)
          .neq('id', selectedVideo.id)
          .order('created_at', { ascending: false })

        if (!error) {
          // Colocamos el video seleccionado al principio de la lista
          setVideos([selectedVideo, ...otherVideos])
          setCurrentVideoIndex(0)
        }
      } else {
        // Si no hay video seleccionado, cargamos normalmente
        fetchVideos()
      }
    }

    loadVideos()
  }, [location.state?.selectedVideo])

  useEffect(() => {
    const handleScroll = () => {
      if (videoContainerRef.current) {
        const container = videoContainerRef.current
        const scrollPosition = container.scrollTop
        const videoHeight = container.clientHeight
        const index = Math.round(scrollPosition / videoHeight)
        setCurrentVideoIndex(index)
      }
    }

    const container = videoContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  async function fetchVideos() {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setVideos(data || [])
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

  // refs para todos los videos
  const videoRefs = useRef([]);

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (videoEl) {
        if (idx === currentVideoIndex) {
          videoEl.muted = !hasInteracted;
          if (hasInteracted) {
            videoEl.play().catch(() => {});
          }
        } else {
          videoEl.muted = true;
          videoEl.pause();
        }
      }
    });
  }, [currentVideoIndex, videos.length, hasInteracted]);

  if (!videos || videos.length === 0) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',color:'#fff',background:'#111'}}>
        <h2>No hay videos para mostrar</h2>
        <p>Intenta subir un video o revisa tu conexión.</p>
      </div>
    );
  }
  return (
    <div className="video-feed-container">
      <div className="video-feed" ref={videoContainerRef} onScroll={handleScroll}>
        {videos.map((video, index) => (
          <div key={video.id} className="video-wrapper">
            <div className="video-container" onClick={() => setHasInteracted(true)}>
              {loadingVideoIndex === index && (
                <div className="video-loader" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:20}}>
                  <div style={{width:40,height:40,border:'4px solid #fff',borderTop:'4px solid #fe2c55',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
                </div>
              )}
              <video
                ref={el => videoRefs.current[index] = el}
                src={`https://kwajnaiebdhdonootfwh.supabase.co/storage/v1/object/public/${video.storage_bucket}/${video.storage_path}`}
                controls
                autoPlay={index === currentVideoIndex && hasInteracted}
                loop
                muted={index !== currentVideoIndex || !hasInteracted}
                style={{ width: '100%', height: '100%' }}
                preload="metadata"
                onLoadStart={() => setLoadingVideoIndex(index)}
                onLoadedData={() => setLoadingVideoIndex(null)}
              />
              {/* Acciones a la derecha */}
              <div className="video-actions">
                <div className="video-actions-group" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'24px',position:'absolute',right:'4px',top:'50%',transform:'translateY(-130%)'}}>
                  <div className="video-actions-group" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'24px',position:'fixed',right:'24px',top:'50%',transform:'translateY(-50%)',zIndex:30}}>
                     </div>
                     <img
                      src={video.profiles?.avatar_url ? video.profiles.avatar_url : '/default-avatar.png'}
                      alt="avatar"
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                    />
                 
                  <div className="action" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                    <button type="button" aria-label="Me gusta" style={{background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',color:'white',cursor:'pointer'}} onClick={() => handleLike(video.id, likedVideos[video.id], video.likes_count)}>
                      <span role="img" aria-label="like" style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={likedVideos[video.id] ? '#fe2c55' : 'white'} xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z" fill={likedVideos[video.id] ? '#fe2c55' : 'white'} stroke={likedVideos[video.id] ? '#fe2c55' : 'white'} strokeWidth="1.5" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <div style={{fontWeight:'bold',fontSize:'15px'}}>{likedVideos[video.id] ? (video.likes_count + 1) : video.likes_count || 0}</div>
                    </button>
                  </div>
                  <div className="action" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                    <button type="button" aria-label="Comentarios" style={{background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',color:'white',cursor:'pointer'}}>
                      <span role="img" aria-label="comment" style={{ display: 'inline-flex', alignItems: 'center' }} onClick={() => handleOpenComments(video.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white">
                          <use href="#Bubble_Ellipsis_Right_Fill-7ce6d3b3"></use>
                        </svg>
                      </span>
                      <div style={{fontWeight:'bold',fontSize:'15px'}}>{video.comments_count || 0}</div>
                    </button>
                  </div>
                  <div className="action" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                    <button type="button" aria-label="Compartir" style={{background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',color:'white',cursor:'pointer'}}>
                      <span role="img" aria-label="share" style={{ display: 'inline-flex', alignItems: 'center' }} onClick={() => handleShare(video)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white">
                          <use href="#pc-share-078b3fae"></use>
                        </svg>
                      </span>
                      <div style={{fontWeight:'bold',fontSize:'15px'}}>{video.shares_count || 0}</div>
      {/* Notificación de compartir */}
      {showShareMsg && (
  <div style={{position:'fixed',top:'24px',right:'24px',background:'#fff',color:'#111',padding:'12px 24px',borderRadius:'8px',zIndex:200,fontWeight:'bold',border:'1px solid #ccc'}}>¡Link copiado!</div>
      )}
                    </button>
                  </div>
                </div>
              </div>
              {/* Info abajo */}
              <div className="video-info">
                <div style={{ fontWeight: 'bold', color:'#fff' }}>{video.user_name || 'Name and Last name'}</div>
                <div style={{ color:'#fff' }}>{video.description || 'Caption of the post 😊\n#fyp'}</div>
                <div style={{ fontSize: '13px', opacity: 0.8, color:'#fff' }}>🎵 Song name - song artist</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de comentarios */}
      {showCommentsModal && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(255,255,255,0.8)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',padding:'32px',borderRadius:'16px',width:'350px',maxHeight:'80vh',overflowY:'auto',color:'#111',position:'relative',boxShadow:'0 2px 8px rgba(0,0,0,0.12)'}}>
            <button style={{position:'absolute',top:8,right:8,fontSize:'20px',background:'none',border:'none',color:'#fff',cursor:'pointer'}} onClick={()=>setShowCommentsModal(false)}>✕</button>
            <h3>Comentarios</h3>
            <div style={{marginBottom:'16px'}}>
              {comments.length === 0 ? (
                <div style={{opacity:0.7}}>No hay comentarios aún.</div>
              ) : (
                comments.map(c => (
                  <div key={c.id} style={{marginBottom:'12px',borderBottom:'1px solid #444',paddingBottom:'8px'}}>
                    <div style={{fontWeight:'bold',fontSize:'13px'}}>{c.text}</div>
                    <div style={{fontSize:'11px',opacity:0.7}}>{new Date(c.created_at).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              <input type="text" value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Escribe un comentario..." style={{flex:1,padding:'8px',borderRadius:'8px',border:'1px solid #ccc',background:'#fff',color:'#111'}} />
              <button onClick={handleSendComment} style={{padding:'8px 16px',borderRadius:'8px',background:'#fe2c55',color:'#fff',border:'none',cursor:'pointer'}}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

