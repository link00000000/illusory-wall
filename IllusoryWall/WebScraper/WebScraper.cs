using System;
using ScrapySharp.Network;
using ScrapySharp.Extensions;
using System.Linq;
using HtmlAgilityPack;
using System.Text.RegularExpressions;
using System.Collections.Generic;

namespace WebScraper
{
    // Scraping results POCO object
    public class ScraperResult
    {
        public string Name { get; set; }
        public Uri ImageUrl { get; set; }
        public IEnumerable<string> Locations { get; set; }
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
                Name = _name(infoBox),
                ImageUrl = _imageUrl(infoBox),
                Locations = _locations(infoBox)
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

        // Extract image Url
        private static Uri _imageUrl(HtmlNode infoBox)
        {
            var image = infoBox.CssSelect(".pi-image-thumbnail")?.FirstOrDefault();
            if (image == null)
            {
                return null;
            }

            var imageSrc = image.Attributes["src"];
            if (imageSrc == null)
            {
                return null;
            }

            if (imageSrc.Value == null)
            {
                return null;
            }

            // Typically images are in the format:
            // https://static.wikia.nocookie.net/darksouls/images/5/51/Sulyvahn.png/revision/latest/scale-to-width-down/350?cb=20180211153506
            // By removing everyting after the file extension, we can a higher-quality image
            var fileType = Regex.Match(imageSrc.Value, @"\.(png|jpg|gif)");
            if (fileType.Success)
            {
                return new Uri(imageSrc.Value.Substring(0, fileType.Index + fileType.Length));
            }

            // Return the whole url if an extension cannot be found
            return new Uri(imageSrc.Value);
        }

        // Extract list of location names
        private static IEnumerable<string> _locations(HtmlNode infoBox)
        {
            var locations = infoBox.CssSelect(".pi-item")
                ?.ElementAtOrDefault(2)
                ?.ChildNodes.ElementAtOrDefault(3)
                ?.ChildNodes.Select(l => l.InnerText)
                .Where(l => l.Length > 0);

            return locations;
        }
    }
}
