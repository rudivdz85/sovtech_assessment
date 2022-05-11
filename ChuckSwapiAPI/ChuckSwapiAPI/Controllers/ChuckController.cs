using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ChuckSwapiAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChuckController : ControllerBase
    {

        private readonly ILogger<ChuckController> _logger;

        public ChuckController(ILogger<ChuckController> logger)
        {
            _logger = logger;
        }

        [Route("categories")]
        [HttpGet]
        public string GetCategories()
        {
            string resp = "";
            string url = @"https://api.chucknorris.io/jokes/categories";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                resp = reader.ReadToEnd();
            }

            Console.WriteLine(resp);
            return resp;
        }

        [Route("singleCategory")]
        [HttpGet]
        public string GetSingleCategory(string category)
        {
            string resp = "";
            string url = @"https://api.chucknorris.io/jokes/random?category=" + category;

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                resp = reader.ReadToEnd();
            }

            Console.WriteLine(resp);
            return resp;
        }

    }
}
