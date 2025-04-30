Feature: Contacts

Contact management endpoints for creating, updating, fetching and deleting contact records.

Background:
    Given I am an authenticated user

@GetAllContacts
Scenario Outline: Get All Contacts
    When I make a GET request to '<endpoint>'
    Then the response status code is '<responseStatusCode>'
    Then the response data should be '<responseData>'

Examples:
| endpoint     | responseStatusCode | responseData                                                                                                      |
| api/contacts | 200                | {"data":[{"id":1,"firstName":"John","lastName":"Doe","email":"john.doe@example.com","phoneNumber":"1234567890"}]} |

@GetContactById
Scenario Outline: Get Contact by ID
    When I make a GET request to '<endpoint>'
    Then the response status code is '<responseStatusCode>'
    Then the response data should be '<responseData>'

Examples:
| endpoint               | responseStatusCode | responseData                                                                                      |
| api/contacts/1         | 200                | {"data":{"id":1,"firstName":"John","lastName":"Doe","email":"john.doe@example.com","phoneNumber":"1234567890"}}  |
| api/contacts/99        | 404                | {"message":"Contact with Id 99 not found."}                                                        |

@CreateContact
Scenario Outline: Create Contact
    When I make a POST request to '<endpoint>' with the following data '<requestData>'
    Then the response status code is '<responseStatusCode>'
    Then the response data should be '<responseData>'

Examples:
| endpoint     | requestData                                                                                     | responseStatusCode | responseData                                      |
| api/contacts | {"firstName":"Alice","lastName":"Wonder","email":"alice@wonder.com","phoneNumber":"5551234567"} | 201                | {"message":"Contact Created Successfully","id":2} |
| api/contacts | {"firstName":"","lastName":"Wonder","email":"alice@wonder.com","phoneNumber":"5551234567"}      | 400                | {"FirstName":["First name is required."]}         |

@UpdateContact
Scenario Outline: Update Contact
    When I make a PUT request to '<endpoint>' with the following data '<requestData>'
    Then the response status code is '<responseStatusCode>'
    Then the response data should be '<responseData>'

Examples:
| endpoint         | requestData                                                                                                 | responseStatusCode | responseData                                          |
| api/contacts/1   | {"firstName":"John","lastName":"Doe Updated","email":"john.updated@example.com","phoneNumber":"1234509876"} | 200                | {"message":"Contact with Id 1 updated successfully."} |
| api/contacts/999 | {"firstName":"Ghost","lastName":"Unknown","email":"ghost@example.com","phoneNumber":"0000000000"}           | 404                | {"message":"Contact with Id 999 not found."}          |

@DeleteContact
Scenario Outline: Delete Contact
    When I make a DELETE request to '<endpoint>'
    Then the response status code is '<responseStatusCode>'
    Then the response data should be '<responseData>'

Examples:
| endpoint               | responseStatusCode | responseData                                      |
| api/contacts/1         | 200                | {"message":"Contact with Id 1 deleted successfully."} |
| api/contacts/100       | 404                | {"message":"Contact with Id 100 not found."}          |
