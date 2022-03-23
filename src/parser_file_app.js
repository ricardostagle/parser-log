const geoip = require('geoip-lite');
const parser = require('ua-parser-js');
const fastcsv = require('fast-csv');

var fs = require('fs')
    , es = require('event-stream');

var lineNr = 0;

var logMemoryUsage = (line) => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    //console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}

var data = [];

var s = fs.createReadStream('gobankingrates.com.access.log')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        s.pause();

        lineNr += 1;

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        //logMemoryUsage(lineNr);

        var lastOccurence = line.lastIndexOf('"'); // This will give you last occurence of + in your string
        if (lastOccurence > -1) {
            var secondLastOccurence = line.lastIndexOf('"', lastOccurence -1);
        }
        /*
        var line = line.substring(line.indexOf('"Mozilla'));
        var line = line.substring(line.indexOf('"msnbot-'));
        var line = line.substring(line.indexOf('"Twitterbot'));
        var line = line.substring(line.indexOf('"Pingdom.com_bot_version'));
        var line = line.substring(line.indexOf('"-" "'));
        var line = line.substring(line.indexOf('"Feedly'));
        */
       
        var UserAgent = line.substring(secondLastOccurence,line.lastIndexOf('"') +1);
        var ua = parser(UserAgent);
        var ip= line.substr(0, line.indexOf(' - - '));
        var geo = geoip.lookup(ip);

        if (geo){
            data.push({
                country: geo.country,
                region: geo.region,
                os: ua.os.name,
                browser: ua.browser.name,
                UserAgent: UserAgent
            })
        }

        // resume the readstream, possibly from a callback
        s.resume();
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        //https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
        console.log(data);
        console.log('Read entire file.')
        const ws = fs.createWriteStream("out.csv");
        fastcsv
        .write(data, { headers: true })
        .pipe(ws);
    })
);