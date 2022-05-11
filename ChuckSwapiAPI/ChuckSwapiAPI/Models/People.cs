namespace ChuckSwapiAPI.Models
{
    public class People
    {

        public int count { get; set; }
        public string next { get; set; }
        public string? previous { get; set; }
        public Person[] results { get; set; }

        public People()
        {
            
        }

    }
}
