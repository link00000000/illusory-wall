using System.Text.RegularExpressions;
using System;
using Microsoft.AspNetCore.Mvc;
using WebScraper;
using System.Linq;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using IllusoryWall.Models;

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
                return BadRequest("Url is required");
            }

            Uri url;
            try
            {
                url = new Uri(urlString);
            }
            catch (UriFormatException)
            {
                return BadRequest("Malformed or incomplete Url");
            }

            if (url == null || !url.IsWellFormedOriginalString())
            {
                return BadRequest("Malformed or incomplete Url");
            }

            try
            {
                _ = url.AbsoluteUri;
            }
            catch (InvalidOperationException)
            {
                return BadRequest("Url is not absolute");
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

        private PartialEnemy _resultToModel(ScraperResult result)
        {
            var model = new PartialEnemy();

            if (result.Name != null) model.Name = result.Name;
            if (result.Description != null) model.Description = result.Description;
            if (result.ImageUrl != null) model.ImagePath = result.ImageUrl.AbsoluteUri;

            if (result.Drops != null) model.PartialDrops = result.Drops
                 .Select(d => new PartialDrop() { Name = d })
                 .ToList();
            if (result.Locations != null) model.PartialLocations = result.Locations
                 .Select(l =>
                 {
                     var loc = new PartialLocation() { Name = l };
                     if (result.HP != null) loc.HP = result.HP;
                     if (result.Souls != null) loc.Souls = result.Souls;
                     return loc;
                 })
                 .ToList();

            model.PartialDamages = new List<PartialDamage>();
            if (result.Damages.Physical != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "physical", Category = result.Damages.Physical }
                );

            if (result.Damages.Magic != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "magic", Category = result.Damages.Magic }
                );

            if (result.Damages.Fire != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "fire", Category = result.Damages.Fire }
                );

            if (result.Damages.Lightning != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "lightning", Category = result.Damages.Lightning }
                );

            if (result.Damages.Dark != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "dark", Category = result.Damages.Dark }
                );

            if (result.Damages.Bleed != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "bleed", Category = result.Damages.Bleed }
                );

            if (result.Damages.Poison != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "poison", Category = result.Damages.Poison }
                );

            if (result.Damages.Frost != null)
                model.PartialDamages.Add(
                    new PartialDamage() { DamageType = "frost", Category = result.Damages.Frost }
                );

            return model;
        }
    }
}
