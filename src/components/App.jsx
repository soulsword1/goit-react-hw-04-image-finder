import { AppDiv } from './App.styled';
import Searchbar from './Searchbar';

export const App = () => {

  const key = '7874354-517214212a7de5151c1e37373'
  const url = `https://pixabay.com/api/?key=${key}&q=yellow+flowers&image_type=photo`;
  fetch(url).then( response => response.json).then(data => console.log(data)).catch(error => console.log(error));
  return (
    <AppDiv>
      <Searchbar />
    </AppDiv>
  );
};
