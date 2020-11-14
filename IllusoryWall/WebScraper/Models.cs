using System;
using System.Collections.Generic;

namespace WebScraper
{
    // Scraping results POCO object
    public class ScraperResult
    {
        public string Name { get; set; }
        public Uri ImageUrl { get; set; }
        public IEnumerable<string> Locations { get; set; }
        public IEnumerable<string> Drops { get; set; }
        public int? HP { get; set; }
        public int? Souls { get; set; }

        public Damages Damages { get; set; }
    }

}
