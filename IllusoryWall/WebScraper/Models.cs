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

    // List of damages
    public class Damages
    {
        public char? Physical { get; set; }
        public char? Magic { get; set; }
        public char? Fire { get; set; }
        public char? Lightning { get; set; }
        public char? Dark { get; set; }
        public char? Bleed { get; set; }
        public char? Poison { get; set; }
        public char? Frost { get; set; }
    }
}
