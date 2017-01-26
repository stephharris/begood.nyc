let chalk = require('chalk');
let db = require('./server/db/models');
let Listing = db.Listing;
let Bluebird = require('bluebird');

let listings = [
    {
    status: 'active',
    author: 'Steph Harris',
    personalEmail: 'steph@steph.com',
    title: 'Women\'s Prison Association (WPA)',
    briefDescription: 'combat recidivism by teaching inmates beadwork & jewelry making skills for profit',
    timeCommitment: 'Weekly',
    neighborhood: 'East Village',
    borough: 'manhattan',
    meetingLocation: 'Hopper Home, 110 2nd Avenue',
    tags: ['women', 'education', 'social justice'],
    fullDescription: 'WPA is seeking volunteers to help create a Beadwork Project. We are looking for people with an extensive background in beadwork, jewelry design, or general arts and crafts that may lead to profit. Volunteers would be facilitating programming as well as work on securing resources for WPA.',
    requirements: 'deep knowledge of beadwork, jewlery design or profitable arts, able to facilitate instructions to groups, must be patient/reliable',
    moreInfoUrl: 'http://www.wpaonline.org/wpaassets/Beadwork_Volunteer.pdf',
    contactEmail: 'srice@wpaonline.org',
    expires: '2017-01-01'
  },
  {
    status: 'active',
    author: 'Steph Harris',
    personalEmail: 'steph@steph.com',
    title: 'Union Settlement: Meals on Wheels',
    briefDescription: 'Help pack and deliver meals to homebound seniors in the East Harlem community',
    timeCommitment: 'saturday, january 7',
    hours: '9am to 12:30pm',
    neighborhood: 'east harlem',
    borough: 'manhattan',
    meetingLocation: 'Jefferson Senior Center, 2205 First Avenue (at E. 113th St.)',
    tags: ['senior services'],
    fullDescription: 'We provide Meals on Wheels to East Harlem\'s elderly residents, many of whom are economically struggling and living alone. Come help us pack up meals & then join our staff in delivering food while interacting with our grateful clients! Just email us with the subject line Saturday, Jan. 7th Meals on Wheels Volunteer”.',
    requirements: 'Volunteers will be sent a short training video and brief quiz to help prepare them for participation.',
    moreInfoUrl: 'https://unionsettlement.org/programs/senior-services/',
    contactEmail: 'volunteers@unionsettlement.org',
    expires: '2017-01-28'
  },
   {
    status: 'active',
    author: 'Steph Harris',
    personalEmail: 'steph@steph.com',
    title: 'Debug Politics Hackathon',
    briefDescription: 'transform your dissatisfaction with the 2016 election cycle into a unique idea',
    timeCommitment: 'January 13-15',
    hours: '7pm Friday to 5pm Sunday',
    neighborhood: 'flatiron',
    borough: 'manhattan',
    meetingLocation: '118 W 22nd St. (between 6th & 7th Avenue)',
    tags: ['tech', 'policy/gov', 'meetups/events'],
    fullDescription: 'Debug Politics is a hackathon for anyone dissatisfied with the state of our politics. Let’s use our talents as developers, designers, marketers, entrepreneurs, etc. to find innovative ways to make a real difference. Let’s roll up our sleeves and get to work!',
    requirements: 'To participate, register here: https://www.eventbrite.com/e/debug-politics-1st-nyc-hackathon-tickets-29492120727',
    moreInfoUrl: 'http://www.debugpolitics.com/',
    contactEmail: 'hello@debugpolitics.com',
    expires: '2017-01-28'
  },
   {
    status: 'pending',
    author: 'Steph Harris',
    personalEmail: 'steph@steph.com',
    title: 'NYC Parks: Mulchfest! Maria Hernandez Park',
    briefDescription: 'insulate young trees from the cold winter weather',
    timeCommitment: 'Saturday, January 7',
    hours: '11am to 1pm',
    neighborhood: 'bushwick',
    borough: 'brooklyn',
    meetingLocation: 'Suydam Street & Knickerbocker Avenue',
    tags: ['environment'],
    fullDescription: 'We\'re looking for volunteers to help by spreading mulch that is generated during MulchFest around young trees to insulate them from the cold winter weather, retain moisture, & provide a decorative addition to neighborhoods around the city. You can also pick up bags of mulch to take home w/ you to use on trees on your street!',
    moreInfoUrl: 'https://www.nycgovparks.org/reg/stewardship/2696',
    expires: '2017-01-28'
  },
     {
    status: 'pending',
    author: 'Steph Harris',
    personalEmail: 'steph@steph.com',
    title: 'NYC Parks: Mulchfest! McCarren Park',
    briefDescription: 'insulate young trees from the cold winter weather',
    timeCommitment: 'Saturday, January 7',
    hours: '11am to 1pm',
    neighborhood: 'bushwick',
    borough: 'brooklyn',
    meetingLocation: 'Lorimer Street & Driggs Avenue',
    tags: ['environment'],
    fullDescription: 'We\'re looking for volunteers to help by spreading mulch that is generated during MulchFest around young trees to insulate them from the cold winter weather, retain moisture, & provide a decorative addition to neighborhoods around the city. You can also pick up bags of mulch to take home w/ you to use on trees on your street!',
    moreInfoUrl: 'https://www.nycgovparks.org/reg/stewardship/2696',
    expires: '2017-01-28'
  }
];


function seedListings () {
  return Bluebird.map(listings, function(item){
    return Listing.create(item)
  });
}

Listing.sync({})
    .then(seedListings)
    .then(() => {
        console.log(chalk.green('Database seeded!'));
    })
    .catch(function(err){
        console.error(err)
    })
    // .finally(() => {
    //     //Listing.close(); // else, connection held ~10 secs. Does not return a promise.
    //     return null;
    // })
