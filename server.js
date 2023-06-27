const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const middlewares = jsonServer.defaults()

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const port = process.env.PORT || 8080;

const rules = auth.rewriter(JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json'))));

const cors = require('cors');


// /!\ Bind the router db to the app
app.db = router.db


// You must apply the auth middleware before the router
app.use(middlewares);
app.use(rules);
app.use(auth);
app.use(router);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
 });
app.listen(port, () => {
    console.log(`JSON Server is running in ${port}`);
});