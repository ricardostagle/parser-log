const {Router} = require('express');
const { lookup } = require('geoip-lite');
var parser = require('ua-parser-js');
const router = Router();

router.get('/', (req, res) => res.json({ message:'Hello world'}).end(JSON.stringify(ua, null, '  ')));
router.get('/someroute', (req,res) => {
    var ua = parser(req.headers['user-agent']);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip); // ip address of the user
    console.log(lookup(ip)); // location of the user
  });


module.exports =  router;