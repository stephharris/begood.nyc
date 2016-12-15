let chalk = require('chalk');
let db = require('./server/db/models');
let Listing = db.Listing;
let Bluebird = require('bluebird');

let listings = [
  {
    status: 'active',
    title: 'UNION SETTLEMENT: Meals on Wheels',
    timeCommitment: 'Saturday, January 7',
    hours: '3.5 hours',
    neighborhood: 'east harlem',
    borough: 'manhattan',
    keyphrase: 'delivering meals to homebound seniors',
    location: 'Jefferson Senior Center, 2205 First Avenue (at E. 113th St.)',
    expires: '2017-01-07',
    times: '9am to 12:30pm',
    description: 'Volunteers will help pack hot and cold meals and then join staff on deliveries where they will get to hand out meals to our clients and interact with the East Harlem community. Email volunteers@unionsettlement.org with the subject line "Saturday, Jan. 7th Meals on Wheels Volunteer”.',
    moreInfoUrl: 'https://unionsettlement.org/programs/senior-services/',
    requirements: 'volunteers will be sent a short training video and brief quiz to help prepare them for participation.',
    tags: ['senior citizens'],
    author: 'Steph Harris',
    email: 'steph@steph.com'
  },
  {
    status: 'active',
    title: 'NYC Parks: Mulchfest! Maria Hernandez Park',
    timeCommitment: 'Saturday, January 7',
    hours: '2 hours',
    neighborhood: 'bushwick',
    borough: 'brooklyn',
    keyphrase: 'insulate young trees from the cold winter weather',
    location: 'Suydam Street & Knickerbocker Avenue',
    expires: '2017-01-07',
    times: '11am to 1pm',
    description: 'We\'re looking for volunteers to help by spreading mulch that is generated during MulchFest around young trees to insulate them from the cold winter weather, retain moisture, and provide a decorative addition to neighborhoods around the city. You can also pick up bags of mulch to take home with you and use on the trees on your street!',
    moreInfoUrl: 'https://www.nycgovparks.org/reg/stewardship/2696',
    tags: ['environment'],
    author: 'Steph Harris',
    email: 'steph@steph.com'
  },
   {
    status: 'active',
    title: 'NYC Parks: Mulchfest! McCarren Park',
    timeCommitment: 'Saturday, January 7',
    hours: '2 hours',
    neighborhood: 'williamsburg',
    borough: 'brooklyn',
    keyphrase: 'insulate young trees from the cold winter weather',
    location: 'Lorimer Street & Driggs Avenue',
    expires: '2017-01-07',
    times: '11am to 1pm',
    description: 'We\'re looking for volunteers to help by spreading mulch that is generated during MulchFest around young trees to insulate them from the cold winter weather, retain moisture, and provide a decorative addition to neighborhoods around the city. You can also pick up bags of mulch to take home with you and use on the trees on your street!',
    moreInfoUrl: 'https://www.nycgovparks.org/reg/stewardship/2696',
    tags: ['environment'],
    author: 'Steph Harris',
    email: 'steph@steph.com'
  },
  {
    status: 'active',
    title: 'Women\'s Prison Association (WPA)',
    timeCommitment: 'Ongoing',
    neighborhood: 'lower east side',
    borough: 'manhattan',
    keyphrase: 'teaching inmates beadwork, crafts, jewelry-making skills',
    location: 'Hopper Home, 110 2nd Avenue, New York, NY 10003',
    expires: '2017-06-17',
    description: 'WPA is seeking volunteers to help create a Beadwork Project. We are looking for volunteers with an extensive background in beadwork, jewelry design, or general arts and crafts that may lead to profit. Volunteers would be facilitating programming as well as work on securing resources for WPA.',
    moreInfoUrl: 'http://www.wpaonline.org/wpaassets/Beadwork_Volunteer.pdf',
    tags: ['women', 'education', 'social justice'],
    author: 'Steph Harris',
    email: 'steph@steph.com'
  }
];


function seedListings () {
  return Bluebird.map(listings, function(item){
    return Listing.create(item)
  });
}

Listing.sync({ force: true })
    .then(seedListings)
    .then(() => {
        console.log(chalk.green('Database seeded!'));
    })
    .catch(function(err){
        console.error(err)
    })
    .finally(() => {
        Listing.close(); // else, connection held ~10 secs. Does not return a promise.
        return null;
    })
