import { APIRequestContext } from '@playwright/test';

export class ApiAutomation2 {
  private baseURL: string;
  private headers: Record<string,string>;
  private authorization: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json'
    };
    this.authorization = this.authorization;
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

  async deleteMethod(request: APIRequestContext, endpoint: string, bookingid: number) {
    const options: any = {
      headers: this.headers,
      authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
    };
    const apiResponse = await request.delete(`${this.baseURL}/${endpoint}/${bookingid}`, options);
    console.log(`Booking ID: ${bookingid}`);
    return apiResponse;
  }
}
