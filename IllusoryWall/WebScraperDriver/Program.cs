using System;
using WebScraper;

namespace WebScraperDriver
{
    class Program
    {
        // This is a temporary program to use while testing the WebScraper library
        static void Main(string[] args)
        {
            Uri[] urls = {
                new Uri("https://darksouls.fandom.com/wiki/Basilisk_(Dark_Souls_III)"),
                new Uri("https://darksouls.fandom.com/wiki/Jailer"),
                new Uri("https://darksouls.fandom.com/wiki/Judicator_Argo"),
                new Uri("https://darksouls.fandom.com/wiki/Lothric_Knight"),
                new Uri("https://darksouls.fandom.com/wiki/Pontiff_Sulyvahn"),
                new Uri("https://darksouls.fandom.com/wiki/Hound_Rat")
            };

            foreach (var url in urls)
            {
                var result = Scraper.scrape(url);
                Console.WriteLine(result.Name);
                Console.WriteLine($" - ImageUrl: {result.ImageUrl}");
                Console.WriteLine(" - Locations");
                foreach (var location in result.Locations)
                {
                    Console.WriteLine($"   - {location}");
                }
                Console.WriteLine(" - Drops");
                foreach (var drop in result.Drops)
                {
                    Console.WriteLine($"   - {drop}");
                }

                Console.Write(" - HP: ");
                if (result.HP.HasValue)
                {
                    Console.WriteLine(result.HP);
                }
                else
                {
                    Console.WriteLine("Unkown");
                }

                Console.Write(" - Souls: ");
                if (result.Souls.HasValue)
                {
                    Console.WriteLine(result.Souls);
                }
                else
                {
                    Console.WriteLine("Unkown");
                }

                Console.WriteLine(" - Damages");
                Console.Write("   - Physical: ");
                if (result.Damages.Physical != null)
                {
                    Console.WriteLine(result.Damages.Physical);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.Write("   - Magic: ");
                if (result.Damages.Magic != null)
                {
                    Console.WriteLine(result.Damages.Magic);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.Write("   - Fire: ");
                if (result.Damages.Fire != null)
                {
                    Console.WriteLine(result.Damages.Fire);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.Write("   - Lightning: ");
                if (result.Damages.Lightning != null)
                {
                    Console.WriteLine(result.Damages.Lightning);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.Write("   - Dark: ");
                if (result.Damages.Dark != null)
                {
                    Console.WriteLine(result.Damages.Dark);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.Write("   - Bleed: ");
                if (result.Damages.Bleed != null)
                {
                    Console.WriteLine(result.Damages.Bleed);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.Write("   - Poison: ");
                if (result.Damages.Poison != null)
                {
                    Console.WriteLine(result.Damages.Poison);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.Write("   - Frost: ");
                if (result.Damages.Frost != null)
                {
                    Console.WriteLine(result.Damages.Frost);
                }
                else
                {
                    Console.WriteLine("Unknown");
                }

                Console.WriteLine();
            }
        }
    }
}
