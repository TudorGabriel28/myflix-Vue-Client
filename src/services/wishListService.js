import { apiClient } from '../utils/apiClient';

class WishListService {

  async getWishList(movieParameters) {
    return await apiClient.get('/wishList', { params: movieParameters});
  }

}

export const wishListService = new WishListService();