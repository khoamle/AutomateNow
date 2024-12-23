import { APIRequestContext, expect } from '@playwright/test';

export class ApiAutomation2 {
  private request: APIRequestContext;
  private baseURL: string;
  private headers: Record<string,string>

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json'
    };
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

  async postMethodWithBody(requestBody: any, endpoint: string) {
    const response = await this.request.post(`${this.baseURL}/${endpoint}`, {
      headers: this.headers,
      data: requestBody
    });
    return response;
  }
}
