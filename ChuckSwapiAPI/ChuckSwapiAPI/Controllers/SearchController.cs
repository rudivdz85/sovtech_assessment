
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ChuckSwapiAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<SearchController> _logger;

        public SearchController(ILogger<SearchController> logger)
        {
            _logger = logger;
        }

        string DoRequest(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip;

            try
            {
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (StreamReader reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (System.Net.WebException e)
            {

                return "Bad Request - Error: " + e.Message;
            }
            
        }

        [HttpGet]
        public string Search(string query)
        {
            string jokeResponse = DoRequest(@"https://api.chucknorris.io/jokes/search?query=" + query);
            string personResponse = DoRequest(@"https://swapi.dev/api/people/?search=" + query);
            string totalResponse = "";

            Console.WriteLine(jokeResponse);
            Console.WriteLine(personResponse);
            totalResponse = "{\"jokes\":" + jokeResponse + ",\"people\":" + personResponse + "}";
            return totalResponse;
        }
    }
}
