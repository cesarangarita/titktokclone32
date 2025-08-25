import React, { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

function Profile() {
  const { user } = useAuth()
  const [userVideos, setUserVideos] = useState([])
  const [userProfile, setUserProfile] = useState(null)
  const [activeTab, setActiveTab] = useState('videos')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalLikes: 0,
    followers: 0,
    following: 0
  })

  const fetchUserProfile = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setUserProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const fetchUserVideos = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from('videos')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Obtener las URLs públicas de los videos
      const videosWithUrls = await Promise.all(data.map(async (video) => {
        const { data: { publicUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl(video.storage_path);
        
        return {
          ...video,
          video_url: publicUrl
        };
      }));

      setUserVideos(videosWithUrls || []);
    } catch (error) {
      console.error('Error fetching user videos:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleEditProfile = () => {
    // Implementar lógica para editar perfil
    console.log('Editar perfil')
  }

  useEffect(() => {
    if (user) {
      fetchUserProfile()
      fetchUserVideos()
    } else {
      setLoading(false)
    }
  }, [user])

  if (!user) return <div>Por favor inicia sesión para ver tu perfil</div>
  if (loading) return <div>Cargando...</div>

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={
            userProfile?.avatar_url && userProfile.avatar_url !== ''
              ? userProfile.avatar_url
              : (user?.user_metadata?.avatar_url || user?.user_metadata?.picture || `https://ui-avatars.com/api/?name=${user.email}`)
          }
          alt="Profile" 
          className="profile-avatar"
        />
        
        <div className="profile-info">
          <h2 className="profile-username">@{userProfile?.username || user.email}</h2>
          
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">{userVideos.length}</div>
              <div className="stat-label">Videos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Siguiendo</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Seguidores</div>
            </div>
          </div>

          <p className="profile-bio">{userProfile?.bio || 'No hay biografía'}</p>
          
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Editar perfil
          </button>
        </div>
      </div>

      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </div>
        <div 
          className={`tab ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          Me gusta
        </div>
      </div>

      <div className="videos-grid">
        {loading ? (
          <div className="loading">Cargando videos...</div>
        ) : activeTab === 'videos' ? (
          userVideos.length > 0 ? (
            userVideos.map(video => (
              <div key={video.id} className="video-thumbnail">
                <video
                  src={video.video_url}
                  poster={video.thumbnail_url || `https://picsum.photos/seed/${video.id}/300/500`}
                  preload="metadata"
                  onClick={() => window.location.href = `/video/${video.id}`}
                  onMouseOver={e => e.target.play()}
                  onMouseOut={e => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                >
                  <source src={video.video_url} type="video/mp4" />
                </video>
                <div className="video-info">
                  <p className="video-description">{video.description}</p>
                  <div className="video-stats">
                    <span>{video.likes_count} likes</span>
                    <span>{video.comments_count} comentarios</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-videos">
              <p>No hay videos subidos</p>
              <button onClick={() => window.location.href = '/upload'}>
                Sube tu primer video
              </button>
            </div>
          )
        ) : (
          <div className="liked-videos">
            <p>Videos que te han gustado</p>
            {/* Implementar más tarde la funcionalidad de videos que te gustan */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
