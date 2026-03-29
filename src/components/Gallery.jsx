import classes from './Gallery.module.css';

export default function Gallery() {
  return (
    <section className={classes.gallery} id="galerija" aria-labelledby="gallery-title">
      <div className="container">
        <header className={classes.title}>
          <h2 id="gallery-title">Galerija</h2>
        </header>
        <div className={classes.galleryContent}>
          <div className={classes.galleryItem}>
            <img src="/gallery1.jpg" alt="Galerija 1" />
          </div>
          <div className={classes.galleryItem}>
            <img src="/gallery2.jpg" alt="Galerija 2" />
          </div>
          <div className={classes.galleryItem}>
            <img src="/gallery3.jpg" alt="Galerija 3" />
          </div>
         </div>
      </div>
    </section>
  );
} 