using TechTalk.SpecFlow;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System;
using Microsoft.AspNetCore.Mvc.Testing;
using ContactsAPI;
using Microsoft.Extensions.DependencyInjection;
using ContactsAPI.Services;
using ContactsAPI.Data;
using ContactsAPI.Tests.Mocks;
using Xunit;

namespace ContactsAPI.Tests.Steps
{
    [Binding]
    public sealed class ContactSteps : IDisposable
    {
        private HttpResponseMessage _response;
        private string _requestData;
        private string _responseData;
        private int _statusCode;
        private readonly HttpClient _httpClient;
        private readonly WebApplicationFactory<Program> _factory;

        public ContactSteps()
        {
            _factory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        var descriptor = services.SingleOrDefault(
                            d => d.ServiceType == typeof(IContactRepository));
                        if (descriptor != null)
                        {
                            services.Remove(descriptor);
                        }

                        services.AddScoped<IContactRepository, MockContactRepository>();
                    });
                });

            _httpClient = _factory.CreateClient();
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
            _factory?.Dispose();
        }

        [Given(@"I am an authenticated user")]
        public void GivenIAmAnAuthenticatedUser()
        {
            // If needed, add authentication logic here (e.g., bearer token, etc.)
        }

        [When(@"I make a GET request to '(.*)'")]
        public async Task WhenIMakeAGETRequestToApiContacts(string endpoint)
        {
            _response = await _httpClient.GetAsync(endpoint);
            _statusCode = (int)_response.StatusCode;
            _responseData = await _response.Content.ReadAsStringAsync();
        }

        [Then(@"the response status code is '(.*)'")]
        public void ThenTheResponseStatusCodeIs(int expectedStatusCode)
        {
            Assert.Equal(expectedStatusCode, _statusCode);
        }

        [Then(@"the response data should be '(.*)'")]
        public void ThenTheResponseDataShouldBe(string expectedResponseData)
        {
            Assert.Equal(expectedResponseData, _responseData);
        }

        [When(@"I make a POST request to '(.*)' with the following data '(.*)'")]
        public async Task WhenIMakeAPostRequestToApiContactsWithTheFollowingData(string endpoint, string requestData)
        {
            var content = new StringContent(requestData, System.Text.Encoding.UTF8, "application/json");
            _response = await _httpClient.PostAsync(endpoint, content);
            _statusCode = (int)_response.StatusCode;
            _responseData = await _response.Content.ReadAsStringAsync();
        }

        [When(@"I make a PUT request to '(.*)' with the following data '(.*)'")]
        public async Task WhenIMakeAPutRequestToApiContactsWithTheFollowingData(string endpoint, string requestData)
        {
            var content = new StringContent(requestData, System.Text.Encoding.UTF8, "application/json");
            _response = await _httpClient.PutAsync(endpoint, content);
            _statusCode = (int)_response.StatusCode;
            _responseData = await _response.Content.ReadAsStringAsync();
        }

        [When(@"I make a DELETE request to '(.*)'")]
        public async Task WhenIMakeADeleteRequestToApiContacts(string endpoint)
        {
            _response = await _httpClient.DeleteAsync(endpoint);
            _statusCode = (int)_response.StatusCode;
            _responseData = await _response.Content.ReadAsStringAsync();
        }
    }
}
