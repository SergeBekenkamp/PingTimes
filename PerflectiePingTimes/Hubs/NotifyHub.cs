using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace PerflectiePingTimes.Hubs
{
    public class NotifyHub : Hub<ITypedHubClient>
    {
        /// <returns>A <see cref="Task"/> that represents the asynchronous connect.</returns>
        public override Task OnConnectedAsync()
        {
            Debug.WriteLine("Something connected");
            return Task.CompletedTask;
        }
    }
}
