import { apiClient } from '../utils/apiClient';

class AccountService {

  async authenticate(credentials) {
    return await apiClient.post('/Account/authenticate', credentials);
  }
  async registerUser(credentials) {
    await apiClient.post('/api/users/register', credentials);
  }

  async activateAccount(userId) {
    await apiClient.get(`/api/users/activation/${userId}`);
  }

  async sendForgotPasswordEmail(email) {
    await apiClient.post('/api/users/forgot-password', email);
  }

  async validateResetPasswordToken(params) {
    await apiClient.get(
      `/api/users/reset-password/${params.userId}/${params.token}`
    );
  }

  async updatePassword(params, password) {
    await apiClient.put(
      `/api/users/reset-password/${params.userId}/${params.token}`,
      password
    );
  }

  async getAllUsers() {
    const users = await apiClient.get('/api/users/manager/');
    return users;
  }
}

export const accountService = new AccountService();
