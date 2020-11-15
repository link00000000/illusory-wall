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
    public static class Scraper
    {
        // Scrape a page at a Url
        public static ScraperResult Scrape(Uri url)
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
                HP = _hp(infoBox),
                Souls = _souls(infoBox),
                Damages = _damages(infoBox),
                Description = _description(page)
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

        // Extract NG Souls
        // Is able to parse values like: 3,333
        // Is not able to parse values like: 3,3311,805 (Painting Guardian)
        private static int? _souls(HtmlNode infoBox)
        {
            var souls = infoBox.CssSelect(".pi-item")
                ?.ElementAtOrDefault(5)
                ?.CssSelect("td[data-source=souls]")
                ?.Select(s => s.InnerText)
                .Where(s =>
                {
                    int x;
                    return Int32.TryParse(
                        s,
                        NumberStyles.AllowThousands,
                        new CultureInfo("en-US"),
                        out x);
                })
                .Select(s => Int32.Parse(s, NumberStyles.AllowThousands));

            if (souls.Count() > 0)
            {
                return souls.FirstOrDefault();
            }
            return null;
        }

        // Extract damages
        // First character is considered the damage, if its -, it is replaced with null
        private static Damages _damages(HtmlNode infoBox)
        {
            var damages = infoBox.CssSelect(".pi-item")
                ?.ElementAtOrDefault(6);

            return new Damages
            {
                Physical = damages
                    ?.CssSelect(".pi-data-value[data-source=phys-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
                Magic = damages
                    ?.CssSelect(".pi-data-value[data-source=mag-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
                Fire = damages
                    ?.CssSelect(".pi-data-value[data-source=fire-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
                Lightning = damages
                    ?.CssSelect(".pi-data-value[data-source=ltn-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
                Dark = damages
                    ?.CssSelect(".pi-data-value[data-source=dark-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
                Bleed = damages
                    ?.CssSelect(".pi-data-value[data-source=bld-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
                Poison = damages
                    ?.CssSelect(".pi-data-value[data-source=psn-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
                Frost = damages
                    ?.CssSelect(".pi-data-value[data-source=fst-atk]")
                    .Where(d => d.InnerText[0] != '-')
                    .FirstOrDefault()
                    ?.InnerText.ToLower()[0],
            };
        }

        // Extract all paragraphs (<p>) that are siblings of the h2 element that
        // has a span child with id "Description" until next h2 element is
        // reached
        private static string _description(WebPage page)
        {
            var nodes = page.Html
                .SelectNodes("//div[@class='mw-parser-output']//p[preceding-sibling::h2[1][span[@id='Description']]]")
                .Select(n => n.InnerText.Trim())
                .Where(n => n.Length > 0);

            return string.Join("\n", nodes);
        }
    }
}
