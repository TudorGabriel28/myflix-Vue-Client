import { apiClient } from '../utils/apiClient';

class MovieService {
  async getMovies(movieParameters) {
    return await apiClient.get('/movies', { params: movieParameters });
  }

  async addMovie(createMovieRequest) {
    return await apiClient.post('/movies', createMovieRequest);
  }
}

export const movieService = new MovieService();
