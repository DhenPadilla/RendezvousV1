const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const { issueJwt, verify, issueJWT } = require('./service/auth');
// const Pusher = require('pusher');

// GraphQL:
const ApolloServer = require('apollo-server-express').ApolloServer;
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// TypeDefs (Under: ./graphql/schema)
const typesArray = loadFilesSync(path.join(__dirname, './graphql/schema'));
const typeDefs = mergeTypeDefs(typesArray, { all: true });

// Resolvers (Under: ./graphql/resolvers)
const resolversArray = loadFilesSync(path.join(__dirname, './graphql/resolvers'));
const resolvers = mergeResolvers(resolversArray);

// Database config
const models = require('./models/index');

// Passport config
require('./config/passport')(passport);

const app = express();

// Middleware
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(passport.initialize());
app.use('/graphql', bodyParser.json(), function (req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) { 
            res.status(500).send({ "Must be logged in!": err }); 
            return; 
        }
        next();
    } )(req, res, next);
});

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
      res.sendFile('build/index.html', { root: __dirname })
  })
}

// ROUTES
require('./routes')(app); // configure our routes

// Apollo / GraphQL
const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => ({
        models,
        // Change this to JWT
        user: req.user
    })
});
apolloServer.applyMiddleware({ app });


const PORT = process.env.PORT || 5000;

// -- IN DEV ONLY --
// use: sync({ force:true }) to DROP all TABLES & REMAKE them
// This creates a fresh DB.
// You will need to create users again
models.sequelize.sync().then(() => {
// models.sequelize.sync({ force: true }).then(() => {
    console.log("Sequelize successfully synced with DB! ✅");
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
})


app.use(function(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        error: req.app.get('env') === 'dev' ? err : {}
    });
})