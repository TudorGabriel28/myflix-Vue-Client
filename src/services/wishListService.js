import { apiClient } from '../utils/apiClient';

class WishListService {
  async getWishList(movieParameters) {
    return await apiClient.get('/wishList', { params: movieParameters });
  }

  async addMovie(movieId) {
    await apiClient.put(`wishlist/add/${movieId}`);
  }

  async removeMovie(movieId) {
    await apiClient.put(`wishlist/remove/${movieId}`);
  }
}

export const wishListService = new WishListService();
