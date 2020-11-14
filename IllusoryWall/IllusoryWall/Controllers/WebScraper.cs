using System.Text.RegularExpressions;
using System;
using Microsoft.AspNetCore.Mvc;
using WebScraper;
using IllusoryWall.Models;
using System.Linq;
using System.Collections.Generic;

namespace IllusoryWall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebScraper : ControllerBase
    {
        [HttpGet]
        public IActionResult ScrapeFromUrl([FromQuery(Name = "url")] string urlString)
        {
            if (urlString == null)
            {
                return BadRequest("Url required.");
            }

            var url = new Uri(urlString);
            if (url == null || !url.IsWellFormedOriginalString())
            {
                return BadRequest("Malformed Url.");
            }

            try
            {
                _ = url.AbsoluteUri;
            }
            catch (InvalidOperationException)
            {
                return BadRequest("Url is not absolute.");
            }

            var rx = new Regex(@"^https?:\/\/darksouls\.fandom\.com\/wiki\/");
            if (!rx.IsMatch(url.OriginalString))
            {
                return BadRequest("Url must start with \"https://darksouls.fandom.com/wiki/\"");
            }

            var result = Scraper.Scrape(url);
            var model = _resultToModel(result);

            return Ok(model);
        }

        private Enemy _resultToModel(ScraperResult result)
        {
            var model = new Enemy();

            if (result.Name != null) model.Name = result.Name;
            if (result.Description != null) model.Description = result.Description;
            if (result.ImageUrl != null) model.ImagePath = result.ImageUrl.AbsoluteUri;

            if (result.Drops != null) model.Drops = result.Drops
                 .Select(d => new Drop() { Name = d })
                 .ToList();
            if (result.Locations != null) model.Locations = result.Locations
                 .Select(l =>
                 {
                     var loc = new Location() { Name = l };
                     if (result.HP != null) loc.HP = result.HP;
                     if (result.Souls != null) loc.Souls = result.Souls;
                     return loc;
                 })
                 .ToList();

            model.Damages = new List<Damage>();
            if (result.Damages.Physical != null)
                model.Damages.Add(
                    new Damage() { DamageType = "physical", Category = result.Damages.Physical }
                );

            if (result.Damages.Magic != null)
                model.Damages.Add(
                    new Damage() { DamageType = "magic", Category = result.Damages.Magic }
                );

            if (result.Damages.Fire != null)
                model.Damages.Add(
                    new Damage() { DamageType = "fire", Category = result.Damages.Fire }
                );

            if (result.Damages.Lightning != null)
                model.Damages.Add(
                    new Damage() { DamageType = "lightning", Category = result.Damages.Lightning }
                );

            if (result.Damages.Dark != null)
                model.Damages.Add(
                    new Damage() { DamageType = "dark", Category = result.Damages.Dark }
                );

            if (result.Damages.Bleed != null)
                model.Damages.Add(
                    new Damage() { DamageType = "bleed", Category = result.Damages.Bleed }
                );

            if (result.Damages.Poison != null)
                model.Damages.Add(
                    new Damage() { DamageType = "poison", Category = result.Damages.Poison }
                );

            if (result.Damages.Frost != null)
                model.Damages.Add(
                    new Damage() { DamageType = "frost", Category = result.Damages.Frost }
                );

            return model;
        }
    }
}
