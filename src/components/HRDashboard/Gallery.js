import React, { useState ,useEffect,useRef} from "react";
import "../../styles/Gallery.css";

const Gallery = () => {

  const [images, setImages] = useState([]);
  const [view, setView] = useState("tile");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const [transitionEffect, setTransitionEffect] = useState("fade");

  const effects = ["fade", "zoom", "slide-left", "slide-right"];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file)
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const deleteImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };



useEffect(() => {

  if (view !== "slide" || images.length === 0) return;

  if (isPlaying) {
   intervalRef.current = setInterval(() => {

  setTransitionEffect(
    effects[Math.floor(Math.random() * effects.length)]
  );

  setCurrentIndex((prev) =>
    prev === images.length - 1 ? 0 : prev + 1
  );

     }, 2000);
  }

  return () => {
    clearInterval(intervalRef.current);
  };

}, [isPlaying, images, view]);



  return (
    <div className

="gallery-container">

      <div className

="gallery-header">
        <h2>Co-Curricular Activities Gallery</h2>
      </div>

      <div className

="upload-section">
        <label className

="upload-btn">
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </label>
      </div>

      {/* VIEW SWITCH BUTTONS */}
      <div className

="view-buttons">
        <button onClick={() => setView("tile")}>Tile View</button>
        <button onClick={() => setView("slide")}>Slide View</button>
      </div>

      {/* TILE VIEW */}
      {view === "tile" && (
        <div className

="gallery-grid">
          {images.length === 0 && (
            <p className

="no-images">No images uploaded yet</p>
          )}

          {images.map((img) => (
            <div key={img.id} className

="gallery-card">
              <img src={img.url} alt="activity" />

              <button
                className

="delete-btn"
                onClick={() => deleteImage(img.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SLIDE VIEW */}
      {view === "slide" && images.length > 0 && (
        <div className

="slider-container">

          <div className

="main-slider">
      <img
       src={images[currentIndex].url}
       alt="slide"
       className

={`main-image ${transitionEffect}`}
     />

  
</div>

<div className

="slideshow-toolbar">

  <button onClick={() => setIsPlaying(true)}>
    ▶ Play
  </button>

  <button onClick={() => setIsPlaying(false)}>
    ⏸ Pause
  </button>

  <button
    onClick={() => {
      setIsPlaying(false);
      setCurrentIndex(0);
    }}
  >
    ⏹ Stop
  </button>

</div>



          {/* THUMBNAILS */}
          <div className

="thumbnail-row">
            {images.map((img, index) => (
              <img
                key={img.id}
                src={img.url}
                alt="thumb"
                className

={
                  index === currentIndex
                    ? "thumbnail active"
                    : "thumbnail"
                }
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default Gallery;