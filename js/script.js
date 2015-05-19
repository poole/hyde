var userFeed = new Instafeed({
   get: 'user',
   limit:12,
   sortBy:'most-recent',
   resolution:'low_resolution',
   userId: 234667372,
   accessToken: '234667372.467ede5.77f67d7c1e5141f9985d13ff78d75367',
   template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
});
userFeed.run();

