import { apiClient } from '../utils/apiClient';

class WatchedListService {
  async getWatchedList(movieParameters) {
    return await apiClient.get('/watchedlist', { params: movieParameters });
  }

  async addMovie(movieId) {
    await apiClient.put(`watchedList/add/${movieId}`);
  }

  async removeMovie(movieId) {
    await apiClient.put(`watchedList/remove/${movieId}`);
  }
}

export const watchedListService = new WatchedListService();
