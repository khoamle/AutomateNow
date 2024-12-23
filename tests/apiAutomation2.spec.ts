import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiAutomation2 } from '../pages/apiAutomation2.page';

const baseURL = 'https://restful-booker.herokuapp.com/booking'


test('Get all booking API response test', async({request}: {request: APIRequestContext}) => {
  const apiAutomation2 = new ApiAutomation2(request, baseURL);
  const apiResponse = await apiAutomation2.getMethod('')
  expect(apiResponse.status()).toBe(200);
})

test('Get specific bookingid API response test', async({request}: {request: APIRequestContext}) => {
  const apiAutomation2 = new ApiAutomation2(request, baseURL);
  const apiResponse = await apiAutomation2.getMethod('1')
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(responseBody.firstname).toEqual('Susan')
})

test('Create a new booking API response test', async({request}: {request: APIRequestContext}) => {
  const dataInput = ['Kevin', 'Bacon', 999, true, "2018-01-01", "2019-01-01", "Breakfast"];
  const requestBody = {
    "firstname" : dataInput[0],
    "lastname" : dataInput[1],
    "totalprice" : dataInput[2],
    "depositpaid" : dataInput[3],
    "bookingdates" : {
        "checkin" : dataInput[4],
        "checkout" : dataInput[5]
    },
    "additionalneeds" : dataInput[6]
  }
  const apiAutomation2 = new ApiAutomation2(request, baseURL);
  const apiResponse = await apiAutomation2.postMethodWithBody(requestBody, '')
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(responseBody).toHaveProperty('bookingid');
  expect(responseBody.booking.firstname).toBe(requestBody.firstname)
  expect(responseBody.booking.lastname).toBe(requestBody.lastname)
  expect(responseBody.booking.totalprice).toBe(requestBody.totalprice)
  expect(responseBody.booking.depositpaid).toBe(requestBody.depositpaid)
  expect(responseBody.booking.bookingdates.checkin).toBe(requestBody.bookingdates.checkin)
  expect(responseBody.booking.bookingdates.checkout).toBe(requestBody.bookingdates.checkout)
  expect(responseBody.booking.additionalneeds).toBe(requestBody.additionalneeds)
})
