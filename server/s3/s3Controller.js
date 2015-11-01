/***

  User Controller

  Save or retreive the existing user to/from the database

***/

// External Resources
var Utils = require('../config/utility.js'),
    AWS = require('aws-sdk'),
    BUCKET = 'crashninja';

module.exports = {
/***
  POST
***/

  /***
    Uploading images to AWS S3
  ***/
  upload : function(req, res, next){
    // Console Log
    console.log('Upload images to AWS...');
    // AWS Config
    AWS.config.update({accessKeyId: 'AKIAJ2WOCLBOOX4UQWBA', secretAccessKey: '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'});
    AWS.config.update({region: 'us-west-1'});
    // Define AWS S3 Bucket
    var s3Bucket = new AWS.S3({ params : { Bucket : BUCKET }});
    // Create Buffer
    var imageBuffer = new Buffer(req.body.imageData.replace(/^data:image\/\w+;base64,/, ""),'base64');
    // Define Upload Params
    var data = {
      Key: req.body.imgName + new Date() + '.png',
      Body: imageBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    };
    // S3 Bucket Upload
    s3Bucket.upload(data, function(err, data){
      if (err) {
        // Propogate Error to Client
        res.status(404).send({error : err.message});
      } else {
        // Console Log
        console.log('S3 image url : ', data.Location);
        // Propogate Success to Client
        res.json({ imageURL : data.Location });
      }
    });
  }

};
