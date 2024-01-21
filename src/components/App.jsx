import { Component } from 'react';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

const PER_PAGE = 12;

export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    selectedImage: '',
  };

  handleFormSubmit = async searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  async componentDidUpdate(_, prevState) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '40708369-d6dc8a1f6c8c52c3bc15ef748';

    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const response = await axios.get(
          `${BASE_URL}?key=${API_KEY}&q=${this.state.searchQuery}&orientation=horizontal&per_page=${PER_PAGE}&page=${this.state.page}`
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
        }));
      } catch (error) {
        toast.error('Reload the page and try again');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleChangePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = largeImageURL => {
    this.setState({ selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: '' });
  };

  render() {
    const { images, isLoading, selectedImage } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleOpenModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleChangePage} />
        )}
        <Toaster />
        {selectedImage && (
          <Modal
            onClose={this.handleCloseModal}
            selectedImage={selectedImage}
          />
        )}
      </>
    );
  }
}
