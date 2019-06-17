using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PerflectiePingTimes.Services;

namespace PerflectiePingTimes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
        private readonly PingRxService _pingService;

        public PingController(PingRxService pingService)
        {
            _pingService = pingService;
        }

        // GET api/values
        [HttpGet]
        public Task<IList<PingTime>> Get(string domain = "app.dialog.nl")
        {
            return  _pingService.GetPingTimesForDomain(domain);
        }

        // GET api/values/5
        [HttpGet("ping")]
        public Task<IList<PingTime>> Ping(string domain)
        {
            _pingService.PingAddress(domain);
            return _pingService.GetPingTimesForDomain(domain);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
