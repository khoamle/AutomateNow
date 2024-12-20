import { APIRequestContext, expect } from '@playwright/test';

export class ApiAutomation {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  // Get method
  async getMethod(endpoint: string) {
    const apiResponse = await this.request.get(`${this.baseURL}/${endpoint}`);
    return apiResponse;
  }

  // Post method
  async postMethod(endpoint: string) {
    const apiResponse = await this.request.post(`${this.baseURL}/${endpoint}`);
    return apiResponse;
  }
}
