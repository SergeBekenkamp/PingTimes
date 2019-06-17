using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Reactive.Threading.Tasks;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PerflectiePingTimes.Hubs;

namespace PerflectiePingTimes.Services
{
    public class PingRxService
    {
        private static IObservable<long> timer = Observable.Interval(TimeSpan.FromMilliseconds(1000));
        private static Dictionary<string, IObservable<PingTime>> pingTimes { get; set; } = new Dictionary<string, IObservable<PingTime>>();
        private static Dictionary<string, IDisposable> subscriptions { get; } = new Dictionary<string, IDisposable>();

        private readonly IHubContext<NotifyHub, ITypedHubClient> _hubContext;
        

        public PingRxService(IHubContext<NotifyHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task<IList<PingTime>> GetPingTimesForDomain(string domain)
        {
            if (!pingTimes.ContainsKey(domain)) pingTimes.Add(domain, GeneratePingEveryTimerTick(domain));
            return await pingTimes[domain].Take(TimeSpan.FromMilliseconds(100)).ToList().ToTask();
        }

        public IObservable<PingTime> GeneratePingEveryTimerTick(string domain)
        {
            var subj = new ReplaySubject<PingTime>(1000);
            if (!subscriptions.ContainsKey(domain))
            {
                subscriptions.Add(domain, timer.Select(x => PingAddress(domain)).Where(x => x != null)
                    .Subscribe((x) =>
                    {
                        subj.OnNext(x);
                        _hubContext.Clients.All.BroadcastMessage(x.Domain, x.TimeInMs.ToString(), x.DateTimePinged);
                    }));

            }

            return subj;
        }

        public PingTime PingAddress(string domain)
        {
            Debug.WriteLine($"Pinging {domain}");

            return new PingTime(domain, new Random().Next(0, 1000));
//            using (var p = new Ping())
//            {
//                var options = new PingOptions();
//                options.DontFragment = true;
//                string data = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
//                byte[] buffer = Encoding.ASCII.GetBytes(data);
//                int timeout = 120;
//                PingReply reply = p.Send(domain, timeout, buffer, options);
//                if (reply.Status == IPStatus.Success)
//                {
//                    Debug.WriteLine($"Ping took {reply.RoundtripTime}");
//                    return new PingTime(domain, reply.RoundtripTime);
//                }
//                return null;
//            }


        }

    }

    public class PingTime
    {
        public PingTime(string domain, long timeInMs)
        {
            Domain = domain;
            TimeInMs = timeInMs;
            _dateTimePinged = DateTimeOffset.Now;
        }


        public string Domain { get; }
        public long TimeInMs { get; }

        private DateTimeOffset _dateTimePinged;
        public DateTimeOffset DateTimePinged => _dateTimePinged;
    }
}
