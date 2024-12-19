import { useReducer, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { initialState, reducer } from './components/Reducer/reducer';
import './App.css';

const key = 'y0gJ49G1DLk0OvX1vxQwt-g2b02l0kAIoqwa_mbytwY';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.query) return;

    const fetchImages = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: state.query, page: state.page, per_page: 12, client_id: key },
        });
        if (state.page === 1) {
          dispatch({ type: 'SET_IMAGES', payload: response.data.results });
        } else {
          dispatch({ type: 'APPEND_IMAGES', payload: response.data.results });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load images' });
      }
    };
    fetchImages();
  }, [state.query, state.page]);

  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }
    dispatch({ type: 'SET_QUERY', payload: searchQuery });
  };

  const handleLoadMore = () => {
    dispatch({ type: 'INCREMENT_PAGE' });
  };

  const openModal = (image) => {
    dispatch({ type: 'SET_SELECTED_IMAGE', payload: image });
  };

  const closeModal = () => {
    dispatch({ type: 'CLEAR_SELECTED_IMAGE' });
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {state.error && <ErrorMessage message={state.error} />}
      <ImageGallery images={state.images} onImageClick={openModal} />
      {state.loading && <Loader />}
      {state.images.length > 0 && !state.loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {state.selectedImage && <ImageModal image={state.selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;