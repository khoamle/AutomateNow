import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiAutomation2 } from '../pages/apiAutomation2.page';
import testData from '../testData/testData.json'
import { faker } from '@faker-js/faker';

const baseURL = 'https://restful-booker.herokuapp.com'

test.describe('Booking API Tests', () => {
  let apiAutomation2: ApiAutomation2;
  let requestBody: any;
  let requestBody2: any;
  let bookingid: number;
  bookingid = faker.number.int({min: 1, max: 10})

  test.beforeAll(async () => {
    apiAutomation2 = new ApiAutomation2(baseURL);
    requestBody = {
      "firstname" : testData.bookings[0].firstname,
      "lastname" : testData.bookings[0].lastname,
      "totalprice" : testData.bookings[0].totalprice,
      "depositpaid" : testData.bookings[0].depositpaid,
      "bookingdates" : {
          "checkin" : testData.bookings[0].checkin,
          "checkout" : testData.bookings[0].checkout
      },
      "additionalneeds" : testData.bookings[1].additionalneeds
    }
    requestBody2 = {
      "firstname" : testData.bookings[1].firstname,
      "lastname" : testData.bookings[1].lastname,
      "totalprice" : testData.bookings[1].totalprice,
      "depositpaid" : testData.bookings[1].depositpaid,
      "bookingdates" : {
          "checkin" : testData.bookings[1].checkin,
          "checkout" : testData.bookings[1].checkout
      },
      "additionalneeds" : testData.bookings[1].additionalneeds
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
    if (apiResponse.status() === 200){
      expect(apiResponse.status()).toBe(200);
      const responseBody = await apiResponse.json();
      expect(responseBody).toHaveProperty('firstname');
      expect(responseBody).toHaveProperty('lastname');
      expect(responseBody).toHaveProperty('totalprice');
      expect(responseBody).toHaveProperty('depositpaid');
    } else {
      expect(apiResponse.status()).toBe(404);
    }
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

  test('Update a booking API response test', async({request}: {request: APIRequestContext}) => {
    const apiResponse = await apiAutomation2.putMethod(request, `booking/${bookingid}`, requestBody2)
    expect(apiResponse.status()).toBe(200);
    const responseBody = await apiResponse.json();
    expect(responseBody.firstname).toBe(requestBody2.firstname)
    expect(responseBody.lastname).toBe(requestBody2.lastname)
    expect(responseBody.totalprice).toBe(requestBody2.totalprice)
    expect(responseBody.depositpaid).toBe(requestBody2.depositpaid)
    expect(responseBody.bookingdates.checkin).toBe(requestBody2.bookingdates.checkin)
    expect(responseBody.bookingdates.checkout).toBe(requestBody2.bookingdates.checkout)
    expect(responseBody.additionalneeds).toBe(requestBody2.additionalneeds)
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