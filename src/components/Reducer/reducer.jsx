export const initialState = {
    query: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    selectedImage: null,
  };
  
export const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, loading: true };
      case 'SET_IMAGES':
        return { ...state, images: action.payload, loading: false };
      case 'APPEND_IMAGES':
        return { ...state, images: [...state.images, ...action.payload], loading: false };
      case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
      case 'SET_QUERY':
        return { ...state, query: action.payload, images: [], page: 1 };
      case 'INCREMENT_PAGE':
        return { ...state, page: state.page + 1 };
      case 'SET_SELECTED_IMAGE':
        return { ...state, selectedImage: action.payload };
      case 'CLEAR_SELECTED_IMAGE':
        return { ...state, selectedImage: null };
      default:
        return state;
    }
};