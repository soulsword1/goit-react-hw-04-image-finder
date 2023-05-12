import { AppDiv } from './App.styled';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

export class App extends Component{

  state = {
    imageToSearch: null,
  }

  handleFormSubmit = imageToSearch => this.setState({ imageToSearch });
  
  render(){
    const { imageToSearch } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery imageToSearch={imageToSearch}/>
      </AppDiv>
    );
  }
};



