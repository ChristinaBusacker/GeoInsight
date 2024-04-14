import { h, Component } from 'preact';
import { useState } from 'preact/hooks';
import './PhotoGrid.css'

const Lightbox = ({ photos, selectedPhoto, onClose, onNavigate }) => {
    if (!selectedPhoto) return null;

    const currentIndex = photos.findIndex(photo => photo === selectedPhoto);
    const nextPhoto = currentIndex < photos.length - 1 ? photos[currentIndex + 1] : photos[0];
    const prevPhoto = currentIndex > 0 ? photos[currentIndex - 1] : photos[photos.length - 1];

    return (
        <div id="lightbox">
            <div className='container'>
                <img src={selectedPhoto} className='displayed' />
                <button onClick={onClose} className="close">×</button>
                <button className='nav left' onClick={() => onNavigate(prevPhoto)} >&lt;</button>
                <button className="nav right" onClick={() => onNavigate(nextPhoto)} >&gt;</button>
                <div className='preview'>
                    {photos.map(photo => (
                        <img key={photo} src={photo} onClick={() => onNavigate(photo)} style={{ opacity: photo === selectedPhoto ? 1 : 0.5 }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const PhotoGrid = ({ photos }) => {
    const [lightboxSrc, setLightboxSrc] = useState(null);

    const openLightbox = (src) => {
        setLightboxSrc(src);
    };

    const closeLightbox = () => {
        setLightboxSrc(null);
    };

    const navigateLightbox = (src) => {
        setLightboxSrc(src);
    };

    return (
        <div>
            <div id="photogrid">
                {photos.map((photo, index) => (
                    <img key={index} onClick={() => openLightbox(photo)} src={photo} />
                ))}

            </div>
            <Lightbox photos={photos} selectedPhoto={lightboxSrc} onClose={closeLightbox} onNavigate={navigateLightbox} />
        </div>

    );
};

export default PhotoGrid;
