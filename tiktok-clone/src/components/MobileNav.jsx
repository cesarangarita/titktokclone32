import React from 'react';
import { useNavigate } from 'react-router-dom';
import logomastiktok from '../assets/logomastiktok.svg';

const MobileNav = () => {
	const navigate = useNavigate();
	return (
		<>
			<style>{`
				@media (min-width: 601px) {
					.bottom-nav-mobile { display: none !important; }
				}
				@media (max-width: 600px) {
					.bottom-nav-mobile { display: flex !important; }
				}
			`}</style>
			<div className="bottom-nav-mobile" style={{
				position: 'fixed',
				left: 0,
				bottom: '16px',
				width: '100%', // Adaptable al ancho
				minWidth: 0,
				maxWidth: '100vw',
				height: '64px',
				background: '#000',
				borderTop: '1px solid #eee',
				justifyContent: 'space-around',
				alignItems: 'center',
				zIndex: 1000,
				boxShadow: '0 -2px 8px rgba(0,0,0,0.0)'
			}}>
			<button style={{background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',color:'#fff',fontSize:'24px',cursor:'pointer'}} aria-label="Inicio">
					<span style={{display:'inline-flex',alignItems:'center'}} onClick={()=>navigate('/') }>
						<svg width="40" height="40" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z"></path>
						</svg>
					</span>
					<span style={{fontSize:'11px',color:'#fff'}} onClick={()=>navigate('/') }>Inicio</span>
				</button>
			<button style={{background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',color:'#fff',fontSize:'24px',cursor:'pointer'}} aria-label="Tendencias">
					<span style={{display:'inline-flex',alignItems:'center'}} onClick={()=>navigate('/explore') }>
						<svg width="40" height="40" viewBox="0 0 36 36" fill="#fff" xmlns="http://www.w3.org/2000/svg" style={{fillOpacity:0.75}}>
							<path fillRule="evenodd" clipRule="evenodd" d="M18 28.0547C23.553 28.0547 28.0547 23.5531 28.0547 18C28.0547 12.4469 23.553 7.94531 18 7.94531C12.4469 7.94531 7.94531 12.4469 7.94531 18C7.94531 23.5531 12.4469 28.0547 18 28.0547ZM30.375 18C30.375 24.8345 24.8345 30.375 18 30.375C11.1655 30.375 5.625 24.8345 5.625 18C5.625 11.1655 11.1655 5.625 18 5.625C24.8345 5.625 30.375 11.1655 30.375 18Z"></path>
							<path fillRule="evenodd" clipRule="evenodd" d="M20.3508 20.3864C20.712 20.1679 20.9645 19.8074 21.0462 19.3932L22.427 12.3948C22.5027 12.0113 22.0871 11.7204 21.7527 11.9226L15.6486 15.6137C15.2874 15.8322 15.0349 16.1928 14.9532 16.6069L13.5724 23.6053C13.4967 23.9888 13.9123 24.2797 14.2467 24.0775L20.3508 20.3864ZM16.5684 20.0442L18.9029 18.6325L19.431 15.9559L17.0965 17.3676L16.5684 20.0442Z"></path>
						</svg>
					</span>
					<span style={{fontSize:'11px',color:'#fff'}} onClick={()=>navigate('/explore') }>Tendencias</span>
				</button>
				<button style={{background:'none',border:'none',borderRadius:'50%',width:'44px',height:'44px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'none',marginTop:'-16px',cursor:'pointer',padding:0}} aria-label="Subir">
					<img src={logomastiktok} alt="Subir" style={{width:'54px',height:'54px',objectFit:'contain',display:'block'}} onClick={()=>navigate('/upload')} />
				</button>
			<button style={{background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',color:'#fff',fontSize:'24px',cursor:'pointer'}} aria-label="Bandeja">
					<span style={{display:'inline-flex',alignItems:'center'}}>
						<svg width="40" height="40" viewBox="0 0 32 32" fill="#fff" xmlns="http://www.w3.org/2000/svg" style={{fillOpacity:0.75}}>
							<path fillRule="evenodd" clipRule="evenodd" d="M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z"></path>
						</svg>
					</span>
					<span style={{fontSize:'11px',color:'#fff'}}>Bandeja</span>
				</button>
			<button style={{background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',color:'#fff',fontSize:'24px',cursor:'pointer'}} aria-label="Perfil">
					<span style={{display:'inline-flex',alignItems:'center'}} onClick={()=>navigate('/profile')}>
						<svg width="40" height="40" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg" style={{fillOpacity:0.75}}>
							<path fillRule="evenodd" clipRule="evenodd" d="M24.0001 11.5C20.9625 11.5 18.5001 13.9624 18.5001 17C18.5001 20.0376 20.9625 22.5 24.0001 22.5C27.0377 22.5 29.5001 20.0376 29.5001 17C29.5001 13.9624 27.0377 11.5 24.0001 11.5ZM15.5001 17C15.5001 12.3056 19.3057 8.5 24.0001 8.5C28.6945 8.5 32.5001 12.3056 32.5001 17C32.5001 21.6944 28.6945 25.5 24.0001 25.5C19.3057 25.5 15.5001 21.6944 15.5001 17ZM24.0001 30.5C19.1458 30.5 15.0586 33.7954 13.8578 38.2712C13.7147 38.8046 13.2038 39.1741 12.6591 39.0827L11.6729 38.9173C11.1282 38.8259 10.7571 38.3085 10.8888 37.7722C12.3362 31.8748 17.6559 27.5 24.0001 27.5C30.3443 27.5 35.664 31.8748 37.1114 37.7722C37.2431 38.3085 36.872 38.8259 36.3273 38.9173L35.3411 39.0827C34.7964 39.1741 34.2855 38.8046 34.1424 38.2712C32.9416 33.7954 28.8544 30.5 24.0001 30.5Z"></path>
						</svg>
					</span>
					<span style={{fontSize:'11px',color:'#fff'}} onClick={()=>navigate('/profile')}>Perfil</span>
				</button>
			</div>
		</>
	);
};

export default MobileNav;
