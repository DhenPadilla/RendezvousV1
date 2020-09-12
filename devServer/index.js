const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const authService = require('./service/auth');
// const Pusher = require('pusher');

// --- GraphQL:
const { ApolloServer, PubSub } = require('apollo-server-express');
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
const app = express();


// Middleware
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
      res.sendFile('build/index.html', { root: __dirname })
  })
}

// ROUTES
require('./routes')(app); // configure our routes

// -- GraphQL --

// PubSub Instance
const pubSub = new PubSub();

const handleAuth = (token) => {
    try {
        const accessToken = token.replace("Bearer ", "");
        // sub == user_id
        const { sub } = authService.authenticate(accessToken);
        return sub;
    } catch (err) {
        return null;
    }
}

// Apollo / GraphQL middleware init
const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    subscriptions: {
        onConnect: (connectionParams) => {
            if (connectionParams.authorization) {
                const id = handleAuth(connectionParams.authorization)
                return {
                    user: id
                }
            }

            throw new Error('Missing auth token!');
        },
    },
    context: ({ req, res, connection }) =>  {
        let currentUser = null;
        if (connection) {
            // check connection for metadata (through WebSocket/Subscriptions)
            currentUser = connection.user;
        } 
        else {
            if (req.headers['authorization']) {
                const id = handleAuth(req.headers['authorization'])
                currentUser = id;
            }
            else {
                // Throw?                
            }
        }
        return {
            res,
            models,
            pubSub,
            user: currentUser
        }
    }
});

const httpServer = http.createServer(app);
apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(httpServer);


const PORT = process.env.PORT || 5000;

// -- IN DEV ONLY --
// use: sync({ force:true }) to DROP all TABLES & REMAKE them
// This creates a fresh DB.
// You will need to create users again
models.sequelize.sync().then(() => {
// models.sequelize.sync({ force: true }).then(() => {
    console.log("Sequelize successfully synced with DB! ✅");
    httpServer.listen(PORT, () => {
        console.log(
          `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
        );
        console.log(
          `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`,
        );
    });
})


app.use(function(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        error: req.app.get('env') === 'dev' ? err : {}
    });
})