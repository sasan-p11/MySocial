using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using persistence;

namespace Application.Activities;
public class List
{
    public class Query : IRequest<List<Activity>>
    {
    }
    public class Handler : IRequestHandler<Query, List<Activity>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);
            return activities;
        }
    }
}
