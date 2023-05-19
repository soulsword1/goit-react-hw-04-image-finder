import { AppDiv } from './App.styled';
import { useState } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

export function App() {
  const [imageToSearch, setImageToSearch] = useState(null);

  const handleFormSubmit = imageToSearch => setImageToSearch(imageToSearch);

  return (
    <AppDiv>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageToSearch={imageToSearch} />
    </AppDiv>
  );
}
