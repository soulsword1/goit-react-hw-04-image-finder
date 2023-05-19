import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FetchPixabayApi } from '../../services/FetchPixabayApi';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { Loader } from '../Loader';

export function ImageGallery({ imageToSearch }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [state, setState] = useState('idle');

  const onBtnClick = () => setPage(state => state + 1);

  useEffect(() => {
    if (imageToSearch) {
      setImages([]);
      const page = 1;
      setPage(page);
      setState('pending');
      setTimeout(() => {
        FetchPixabayApi(imageToSearch, page)
          .then(data => setImages(data.hits))
          .catch(error => setError(error));
        setState('idle');
      }, 1000);
    }
  }, [imageToSearch]);

  useEffect(() => {
    if (page > 1) {
      setState('pending');
      setTimeout(() => {
        FetchPixabayApi(imageToSearch, page)
          .then(data => setImages(state => [...state, ...data.hits]))
          .catch(error => setError(error));
        setState('idle');
      }, 1000);
    }
  }, [imageToSearch, page]);

  return (
    <>
      {images && (
        <ImageGalleryList>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </ImageGalleryList>
      )}
      {state === 'error' && <p>Images not found</p>}
      {state === 'pending' && <Loader />}
      {state === 'idle' && images && <Button onBtnClick={onBtnClick} />}
    </>
  );
}

ImageGallery.propTypes = {
  imageToSearch: PropTypes.string,
};
