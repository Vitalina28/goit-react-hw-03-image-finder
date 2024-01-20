import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li
      className={css.galleryItem}
      onClick={() => onClick(image.largeImageURL)}
    >
      <img
        className={css.galleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        width="250"
      />
    </li>
  );
};
