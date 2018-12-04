/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  sails.bcryptjs = require('bcryptjs');

  if (await Event.count() > 0) {
    return done();
  }

  await Event.createEach([
    {eventName:"Extreme Programming",shortDesc:"Write your best code and finish a perfect program in a limited time! Your program will be show in the school website and scored by the professor of the computer science department.",fullDesc:"Write your best code and finish a perfect program in a limited time! Your program will be show in the school website and scored by the professor of the computer science department. Just join us and do your best!",imageURL:"http://articles.csdn.net/uploads/allimg/121206/156_121206105341_1.jpg",organizer:"IT and Data Analysis Studies",eventDate: new Date('2018/11/25'),time:"13:00 - 17:00",venue:"OEE",quota:120,isHighlight:true},
    {eventName:"Dance Dance",shortDesc:"Move your body and dance! Here is a dance party during this week! Show your talent and your handsome step!",fullDesc:"Move your body and dance! Here is a dance party during this week! Show your talent and your handsome step! We are waiting for you.",imageURL:"https://i2.pickpik.com/photos/554/536/940/dancing-dance-ballroom-elegance-preview.jpg",organizer:"Art and Performance Studies",eventDate: new Date('2018/11/20'),time:"16:00 - 20:00",venue:"AC Hall",quota:150,isHighlight:true},
    {eventName:"Festival Talk",shortDesc:"Are you interested in the birth of the festival? Do you want to know more about the formation and development of the festival? Join us and you will get the knowledge you want!",fullDesc:"Are you interested in the birth of the festival? Do you want to know more about the formation and development of the festival? Join us and you will get the knowledge you want! XDDDDDDDDDDDDDDDDD!",imageURL:"http://www.roseonly.com.cn/upload/mobile_index_image/20160707/1467862040145036687.jpg",organizer:"Culture and History Studies",eventDate: new Date('2018/12/03'),time:"09:00 - 11:00",venue:"SWT501",quota:50,isHighlight:false},
    {eventName:"Political system seminar",shortDesc:"On today's planet, all countries follow their own political system. Do you want to know the political system in different countries? Do you want to know the strengths and weaknesses of different political systems? Join our seminar and you can learn a lot!",fullDesc:"On today's planet, all countries follow their own political system. Do you want to know the political system in different countries? Do you want to know the strengths and weaknesses of different political systems? Join our seminar and you can learn a lot! We are waiting for you here!!!",imageURL:"https://en.idi.org.il/media/4222/reforming_israel-s_political_system_cover.jpg",organizer:"Government and International Studies",eventDate: new Date('2018/12/11'),time:"12:00 - 15:00",venue:"AAB",quota:200,isHighlight:true},
    {eventName:"English Speech",shortDesc:"Come to the English Speech activity! Make your English speaking and listening better and better! There are a lot of fun here!",fullDesc:"Come to the English Speech activity! Make your English speaking and listening better and better! There are a lot of fun here! You can join in this activity by internet.",imageURL:"http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/7/7pdvv65l9w0jeb7.jpg",organizer:"Art and Performance Studies",eventDate: new Date('2018/12/16'),time:"19:00 - 20:00",venue:"OEM",quota:80,isHighlight:true}
  ]);

  const hash = await sails.bcryptjs.hash('123456', 10);

  await User.createEach([
    { username: "Young", password: hash, role: "admin" },
    { username: "Ethel", password: hash, role: "student" },
    { username: "Mike", password: hash, role: "student" },
    // etc.
  ]);

  // user
  const hxy = await User.findOne({ username: "Ethel" });
  const jsy = await User.findOne({ username: "Mike" });

  // event
  const programming = await Event.findOne({ eventName: "Extreme Programming" });
  const dance = await Event.findOne({ eventName: "Dance Dance" });
  const speech = await Event.findOne({ eventName: "English Speech" });

  await User.addToCollection(hxy.id, 'register').members([programming.id, dance.id]);
  await User.addToCollection(jsy.id, 'register').members(speech.id);

  await Event.update(programming.id).set({
    quota: (programming.quota - 1)
  }).fetch();

  await Event.update(dance.id).set({
    quota: (dance.quota - 1)
  }).fetch();

  await Event.update(speech.id).set({
    quota: (speech.quota - 1)
  }).fetch();

  return done();

};
