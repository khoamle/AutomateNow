import { APIRequestContext } from '@playwright/test';

export class ApiAutomation2 {
  private baseURL: string;
  private headers: Record<string,string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Basic YWRtaW46cGFzc3dvcmQxMjM=" 
    };
  }

  // Get method
  async getMethod(request: APIRequestContext, endpoint: string) {
    const apiResponse = await request.get(`${this.baseURL}/${endpoint}`);
    return apiResponse;
  }

  // Post method
  async postMethod(request: APIRequestContext, endpoint: string) {
    const apiResponse = await request.post(`${this.baseURL}/${endpoint}`);
    return apiResponse;
  }

  async postMethodWithBody(request: APIRequestContext, endpoint: string, requestBody: any) {
    const apiResponse = await request.post(`${this.baseURL}/${endpoint}`, {
      headers: this.headers,
      data: requestBody
    });
    return apiResponse;
  }

  async putMethod(request: APIRequestContext, endpoint: string, requestBody: any) {
    const apiResponse = await request.put(`${this.baseURL}/${endpoint}`, {
      headers: this.headers,
      data: requestBody
    });
    return apiResponse;
  }

  async createAuthMethod(request: APIRequestContext, endpoint: string) {
    const credentials = {
      username: "admin",
      password: 'password123'
    }
    const options: any = {
      headers: this.headers,
      data: JSON.stringify(credentials)
    }
    const apiResponse = await request.post(`${this.baseURL}/${endpoint}`, options);
    return apiResponse;
  }

  async deleteMethod(request: APIRequestContext, endpoint: string) {
    const options: any = {
      headers: this.headers
    };
    const apiResponse = await request.delete(`${this.baseURL}/${endpoint}`, options);
    return apiResponse;
  }
}
