using Domain;
using persistence;

namespace Persistence;
public class Seed
{
    private readonly DataContext _dataContext;

    public Seed(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task SeedData()
    {
        if (_dataContext.Activities.Any()) return;
  
        var activities = new List<Activity>(){
            new Activity(){
                Title = "Past Activity 1",
                Date = DateTime.Now.AddMonths(-2),
                Description = "Activity 2 months ago",
                Category = "drinks",
                City = "London",
                Venue = "Pub",
            },
            new Activity(){
                Title = "Past Activity 2",
                Date = DateTime.Now.AddMonths(-1),
                Description = "Activity 1 month ago",
                Category = "culture",
                City = "Paris",
                Venue = "Louvre",
            },
            new Activity(){
                Title = "Future Activity 1",
                Date = DateTime.Now.AddMonths(1),
                Description = "Activity 1 month in future",
                Category = "culture",
                City = "London",
                Venue = "Natural History Museum",
            },
            new Activity(){
                Title = "Future Activity 2",
                Date = DateTime.Now.AddMonths(2),
                Description = "Activity 2 months in future",
                Category = "music",
                City = "London",
                Venue = "O2 Arena",
            },
            new Activity(){
                Title = "Future Activity 3",
                Date = DateTime.Now.AddMonths(3),
                Description = "Activity 3 months in future",
                Category = "drinks",
                City = "London",
                Venue = "Another pub",
            }};
            
        await _dataContext.Activities.AddRangeAsync(activities);
        _dataContext.SaveChanges();
    }
}
