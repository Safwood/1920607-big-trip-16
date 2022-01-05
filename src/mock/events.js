export const possibleDurationTimeMinutes = {
  'Taxi': 120,
  'Bus': 180,
  'Train': 180,
  'Ship': 2880,
  'Drive': 2880,
  'Flight': 2880,
  'Check-in': 60,
  'Sightseeing': 300,
  'Restaurant': 120
};


export const possibleEventPrice = {
  'Taxi': {
    min: 50,
    max: 100
  },
  'Bus': {
    min: 20,
    max: 50
  },
  'Train': {
    min: 100,
    max: 200
  },
  'Ship': {
    min: 300,
    max: 500
  },
  'Drive': {
    min: 500,
    max: 600
  },
  'Flight': {
    min: 600,
    max: 1000
  },
  'Check-in': {
    min: 0,
    max: 0
  },
  'Sightseeing': {
    min: 50,
    max: 250
  },
  'Restaurant': {
    min: 50,
    max: 150
  },
};

export const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

export const offersTypes = [
  {
    'type': 'Taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'id': 2,
        'title': 'Choose the radio station',
        'price': 60,
      },
      {
        'id': 3,
        'title': 'Order Uber',
        'price': 20,
      },
    ]
  },
  {
    'type': 'Bus',
    'offers': []
  },
  {
    'type': 'Train',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'id': 2,
        'title': 'Order breakfast',
        'price': 60,
      }
    ]
  },
  {
    'type': 'Ship',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'id': 2,
        'title': 'Order breakfast',
        'price': 60,
      }
    ]
  },
  {
    'type': 'Drive',
    'offers': [
      {
        'id': 1,
        'title': 'Rent a car',
        'price': 200,
      },
      {
        'id': 2,
        'title': 'Rent a car with a driver',
        'price': 500,
      }
    ]
  },
  {
    'type': 'Flight',
    'offers': [
      {
        'id': 1,
        'title': 'Add luggage',
        'price': 50,
      },
      {
        'id': 2,
        'title': 'Switch to comfort',
        'price': 80,
      }
    ]
  },
  {
    'type': 'Check-in',
    'offers': []
  },
  {
    'type': 'Sightseeing',
    'offers': []
  },
  {
    'type': 'Restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'Book a table',
        'price': 5,
      },
      {
        'id': 2,
        'title': 'Order romantic dinner',
        'price': 500,
      }
    ]
  },
];
