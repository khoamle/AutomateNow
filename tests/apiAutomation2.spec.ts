import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiAutomation2 } from '../pages/apiAutomation2.page';
import testData from '../testData/testData.json'
import { faker } from '@faker-js/faker';

const baseURL = 'https://restful-booker.herokuapp.com'

test.describe('Booking API Tests', () => {
  let apiAutomation2: ApiAutomation2;
  let requestBody;
  let bookingid: number;
  bookingid = faker.number.int({min: 1, max: 10})

  test.beforeAll(async () => {
    apiAutomation2 = new ApiAutomation2(baseURL);
    requestBody = {
      "firstname" : testData.booking.firstname,
      "lastname" : testData.booking.lastname,
      "totalprice" : testData.booking.totalprice,
      "depositpaid" : testData.booking.depositpaid,
      "bookingdates" : {
          "checkin" : testData.booking.checkin,
          "checkout" : testData.booking.checkout
      },
      "additionalneeds" : testData.booking.additionalneeds
    }
  
  });

  test('Create authorization token API response test', async({request} : {request: APIRequestContext}) => {
    const apiResponse = await apiAutomation2.createAuthMethod(request, 'auth')
    expect(apiResponse.status()).toBe(200);
  })

  test('Get all booking API response test', async({request} : {request: APIRequestContext}) => {
    const apiResponse = await apiAutomation2.getMethod(request, "booking")
    expect(apiResponse.status()).toBe(200);
  })
  
  test('Get specific bookingid API response test', async({request}: {request: APIRequestContext}) => {
    const apiResponse = await apiAutomation2.getMethod(request, `booking/${bookingid}`)
    expect(apiResponse.status()).toBe(200);
    const responseBody = await apiResponse.json();
    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
    expect(responseBody).toHaveProperty('totalprice');
    expect(responseBody).toHaveProperty('depositpaid');
  })
  
  test('Create a new booking API response test', async({request}: {request: APIRequestContext}) => {
    const apiResponse = await apiAutomation2.postMethodWithBody(request,'booking', requestBody)
    expect(apiResponse.status()).toBe(200);
    const responseBody = await apiResponse.json();
    bookingid = responseBody.bookingid;
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.booking.firstname).toBe(requestBody.firstname)
    expect(responseBody.booking.lastname).toBe(requestBody.lastname)
    expect(responseBody.booking.totalprice).toBe(requestBody.totalprice)
    expect(responseBody.booking.depositpaid).toBe(requestBody.depositpaid)
    expect(responseBody.booking.bookingdates.checkin).toBe(requestBody.bookingdates.checkin)
    expect(responseBody.booking.bookingdates.checkout).toBe(requestBody.bookingdates.checkout)
    expect(responseBody.booking.additionalneeds).toBe(requestBody.additionalneeds)
  })

  test.afterAll(async ({request}: {request: APIRequestContext}) => {
    if (!bookingid){
      throw new Error('Booking ID is not defined');
    }
    const apiResponse = await apiAutomation2.deleteMethod(request, `booking/${bookingid}`);
    expect(apiResponse.status()).toBe(201);
    
    const getAPIResponse = await apiAutomation2.getMethod(request, `booking/${bookingid}`);
    expect(getAPIResponse.status()).toBe(404);
  })
});