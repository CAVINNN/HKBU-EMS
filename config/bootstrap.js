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

  if (await Event.count() > 0) {
    sails.log("bootstrap >0");
    return done();
  }

  sails.log("bootstrap =0");
  await Event.createEach([
    {eventName:"Extreme Programming",shortDesc:"Write your best code and finish a perfect program in a limited time! Your program will be show in the school website and scored by the professor of the computer science department.",fullDesc:"Write your best code and finish a perfect program in a limited time! Your program will be show in the school website and scored by the professor of the computer science department. Just join us and do your best!",imageURL:"http://articles.csdn.net/uploads/allimg/121206/156_121206105341_1.jpg",organizer:"IT and Data Analysis Studies",eventDate:"2018-11-07",time:"13:00 - 17:00",venue:"SWT 601",quota:120,isHighlight:true},
    {eventName:"Dance Dance",shortDesc:"Move your body and dance! Here is a dance party during this week! Show your talent and your handsome step!",fullDesc:"Move your body and dance! Here is a dance party during this week! Show your talent and your handsome step! We are waiting for you in the OEE 1017.",imageURL:"https://i2.pickpik.com/photos/554/536/940/dancing-dance-ballroom-elegance-preview.jpg",organizer:"Art and Performance Studies",eventDate:"2018-10-25",time:"16:00 - 20:00",venue:"SWT 503",quota:150,isHighlight:true},
    {eventName:"Festival Talk",shortDesc:"Are you interested in the birth of the festival? Do you want to know more about the formation and development of the festival? Join us and you will get the knowledge you want!",fullDesc:"Are you interested in the birth of the festival? Do you want to know more about the formation and development of the festival? Join us and you will get the knowledge you want! XDDDDDDDDDDDDDDDDD!",imageURL:"http://www.roseonly.com.cn/upload/mobile_index_image/20160707/1467862040145036687.jpg",organizer:"Culture and History Studies",eventDate:"2018-11-15",time:"09:00 - 11:00",venue:"SWT 505",quota:50,isHighlight:false},
    {eventName:"Political system seminar",shortDesc:"On today's planet, all countries follow their own political system. Do you want to know the political system in different countries? Do you want to know the strengths and weaknesses of different political systems? Join our seminar and you can learn a lot!",fullDesc:"On today's planet, all countries follow their own political system. Do you want to know the political system in different countries? Do you want to know the strengths and weaknesses of different political systems? Join our seminar and you can learn a lot! We are waiting for you here!!!",imageURL:"https://en.idi.org.il/media/4222/reforming_israel-s_political_system_cover.jpg",organizer:"Government and International Studies",eventDate:"2018-11-23",time:"12:00 - 15:00",venue:"SWT 603",quota:200,isHighlight:true},
    {eventName:"English Speech",shortDesc:"Come to the English Speech activity! Make your English speaking and listening better and better! There are a lot of fun here!",fullDesc:"Come to the English Speech activity! Make your English speaking and listening better and better! There are a lot of fun here! You can join in this activity by internet.",imageURL:"http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/7/7pdvv65l9w0jeb7.jpg",organizer:"Art and Performance Studies",eventDate:"2018-10-30",time:"19:00 - 20:00",venue:"SWT 501",quota:80,isHighlight:true}
  ]);

  return done();

};
