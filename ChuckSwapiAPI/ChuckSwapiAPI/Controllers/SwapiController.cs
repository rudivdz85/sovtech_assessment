using Microsoft.AspNetCore.Mvc;
using System.Net;
using ChuckSwapiAPI.Models;
using Newtonsoft.Json;

namespace ChuckSwapiAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SwapiController : ControllerBase
    {
        private readonly ILogger<SwapiController> _logger;

        public SwapiController(ILogger<SwapiController> logger)
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
        [Route("people")]
        public string GetPeople()
        {
            string apiResponse = "";
            List<People> allPeople = new List<People>();
            People fetchedPeople = JsonConvert.DeserializeObject<People>(DoRequest("https://swapi.dev/api/people/"));
            bool nextIsNull = false;


            while (!nextIsNull)
            {
                allPeople.Add(fetchedPeople);

                if (String.IsNullOrEmpty(fetchedPeople.next))
                {
                    nextIsNull = true;
                    break;
                }

                var preFetchedPeople = (DoRequest(fetchedPeople.next));
                fetchedPeople = JsonConvert.DeserializeObject<People>(preFetchedPeople);
            }

            apiResponse = JsonConvert.SerializeObject(allPeople, Formatting.Indented);
            Console.WriteLine(apiResponse);
            return apiResponse;
        }
    }
}