import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiAutomation } from '../pages/apiAutomation.page';

const baseURL = 'https://automationexercise.com/api'


test('Get all products API response test', async({request}: {request: APIRequestContext}) => {
  const apiAutomation = new ApiAutomation(request, baseURL);
  const apiResponse = await apiAutomation.getMethod('/productsList')
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(responseBody.responseCode).toBe(200);
})

test('Post to all products list API response test', async({request}: { request: APIRequestContext}) => {
  const apiAutomation = new ApiAutomation(request, baseURL);
  const apiResponse = await apiAutomation.postMethod('/productsList')
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toContain("This request method is not supported.");
})

test('Get all brands list API response test', async({request}: { request: APIRequestContext}) => {
  const apiAutomation = new ApiAutomation(request, baseURL);
  const apiResponse = await apiAutomation.getMethod('/brandsList')
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(responseBody.responseCode).toBe(200);
})