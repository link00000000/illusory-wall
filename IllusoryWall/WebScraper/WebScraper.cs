using System;
using ScrapySharp.Network;
using ScrapySharp.Extensions;
using System.Linq;
using HtmlAgilityPack;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Globalization;

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
                Locations = _locations(infoBox),
                Drops = _drops(infoBox),
                HP = _hp(infoBox)
            };
        }

        // Find infobox that contains image and enemy stats
        private static HtmlNode _infoBox(WebPage page)
        {
            return page.Html
                .CssSelect(".portable-infobox")
                .FirstOrDefault();
        }

        // Extract enemy name
        private static string _name(HtmlNode infoBox)
        {
            return infoBox
                .CssSelect(".pi-title")
                ?.FirstOrDefault()
                ?.InnerText;
        }

        // Extract image Url
        private static Uri _imageUrl(HtmlNode infoBox)
        {
            var imageSrc = infoBox
                .CssSelect(".pi-image-thumbnail")
                ?.FirstOrDefault()
                ?.Attributes["src"]
                ?.Value;

            if (imageSrc == null)
            {
                return null;
            }

            // Typically images are in the format:
            // https://static.wikia.nocookie.net/darksouls/images/5/51/Sulyvahn.png/revision/latest/scale-to-width-down/350?cb=20180211153506
            // By removing everyting after the file extension, we can a higher-quality image
            var fileType = Regex.Match(imageSrc, @"\.(png|jpg|gif)");
            if (fileType.Success)
            {
                return new Uri(imageSrc.Substring(0, fileType.Index + fileType.Length));
            }

            // Return the whole url if an extension cannot be found
            return new Uri(imageSrc);
        }

        // Extract list of location names
        private static IEnumerable<string> _locations(HtmlNode infoBox)
        {
            return infoBox.CssSelect(".pi-item")
                ?.ElementAtOrDefault(2)
                ?.ChildNodes.ElementAtOrDefault(3)
                ?.ChildNodes.Select(l => l.InnerText)
                .Where(l => l.Length > 0);
        }

        // Extract list of item drops
        private static IEnumerable<string> _drops(HtmlNode infoBox)
        {
            return infoBox.CssSelect(".pi-item")
                ?.ElementAtOrDefault(3)
                ?.ChildNodes.ElementAtOrDefault(3)
                ?.ChildNodes.Select(d => d.InnerText)
                .Where(d => d.Length > 0);
        }

        // Extract NG Health
        // Is able to parse values like: 3,333
        // Is not able to parse values like: 3,3311,805 (Painting Guardian)
        private static int? _hp(HtmlNode infoBox)
        {
            var hp = infoBox.CssSelect(".pi-item")
                ?.ElementAtOrDefault(4)
                ?.CssSelect("td[data-source=hp]")
                ?.Select(h => h.InnerText)
                .Where(h =>
                {
                    int x;
                    return Int32.TryParse(
                        h,
                        NumberStyles.AllowThousands,
                        new CultureInfo("en-US"),
                        out x);
                })
                .Select(h => Int32.Parse(h, NumberStyles.AllowThousands));

            if (hp.Count() > 0)
            {
                return hp.FirstOrDefault();
            }
            return null;
        }
    }
}
