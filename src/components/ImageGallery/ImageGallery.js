import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FetchPixabayApi } from '../../services/FetchPixabayApi';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { Loader } from '../Loader';

export function ImageGallery({ imageToSearch }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [state, setState] = useState('idle');

  const onBtnClick = () => setPage(state => state + 1);

  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevImage = usePrevious(imageToSearch);

  useEffect(() => {
    if (imageToSearch) {
      setImages([]);
      const page = 1;
      setPage(page);
      setState('pending');
      setTimeout(() => {
        FetchPixabayApi(imageToSearch, page).then(data => setImages(data.hits));
        setState('idle');
      }, 1000);
    }
  }, [imageToSearch]);

  useEffect(() => {
    if (page > 1 && imageToSearch === prevImage) {
      setState('pending');
      setTimeout(() => {
        FetchPixabayApi(imageToSearch, page).then(data =>
          setImages(state => [...state, ...data.hits])
        );
        setState('idle');
      }, 1000);
    }
  }, [imageToSearch, page, prevImage]);

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
