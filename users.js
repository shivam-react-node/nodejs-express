const session = require('express-session')
const FileStore = require('session-file-store')(session);
const uuid = require('uuid-v4')

const userRoutes = (app, fs) => {
    const url = '/api/proxy/';
    app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuid() 
    },
    store: new FileStore(),
    secret: 'demo key',
    resave: false,
    saveUninitialized: true
  }))

 //=====================api/proxy
    if (url.startsWith('/pub/proxy') || url.startsWith('/api/proxy')){
        app.all(url ,(req, res) => {
        console.log('Inside the homepage callback function')
        console.log(req.sessionID)
            res.send(`You hit valid  page!\n`)
        })
    }

////post request and read json data from the file
    
    fs.readFile('C:/Users/Shivam Malhotra/Downloads/react/server/id.json', handleFile)
    var obj;
    function handleFile(err, data) {
        if (err) throw err;
        obj = JSON.parse(data)
        console.log(obj.id)
        app.post('/save/'+ obj.id, (req, res) => {
            readFile(data => {
                const newUserId = data;
                newUserId = req.body;
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('new data saved');
                });
            },
                true);
        });
    }
}

module.exports = userRoutes;