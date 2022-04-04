import { apiClient } from '../utils/apiClient';

class MovieService {

  async getMovies(movieParameters) {
    return await apiClient.get('/movies', { params: movieParameters});
  }

}

export const movieService = new MovieService();