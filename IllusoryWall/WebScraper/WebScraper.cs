using System;
using ScrapySharp.Network;
using ScrapySharp.Extensions;
using System.Linq;
using HtmlAgilityPack;

namespace WebScraper
{
    // Scraping results POCO object
    public class ScraperResult
    {
        public string Name { get; set; }
    }

    public static class Scraper
    {
        // Scrape a page at a Url
        public static ScraperResult scrape(Uri url)
        {
            // Start ScrapySharp pseudo-browser
            var browser = new ScrapingBrowser();
            WebPage page = browser.NavigateToPage(url, HttpVerb.Get);

            var infoBox = _infoBox(page);

            // Map results to object
            return new ScraperResult
            {
                Name = _name(infoBox)
            };
        }

        // Find infobox that contains image and enemy stats
        private static HtmlNode _infoBox(WebPage page)
        {
            var infoBox = page.Html.CssSelect(".portable-infobox");
            return infoBox?.FirstOrDefault();
        }

        // Extract enemy name
        private static string _name(HtmlNode infoBox)
        {
            var name = infoBox.CssSelect(".pi-title");
            return name?.FirstOrDefault()?.InnerText;
        }
    }
}
