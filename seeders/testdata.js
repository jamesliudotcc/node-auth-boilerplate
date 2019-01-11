var db = require('../models');

db.movie
  .create({
    title: 'Mission: Impossible',
    year: '1996',
    genre: 'Action',
    runtime: 110,
    tagline: 'If you choose to accept this mission...',
  })
  .then(createdMovie => {
    console.log('Successfully created movie', createdMovie);
  })
  .catch(err => {
    console.log('Error', err);
  });
