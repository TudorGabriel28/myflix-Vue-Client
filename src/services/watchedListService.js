import { apiClient } from '../utils/apiClient';

class WatchedListService {

  async getWatchedList(movieParameters) {
    return await apiClient.get('/watchedlist', { params: movieParameters});
  }

}

export const watchedListService = new WatchedListService();