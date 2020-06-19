const mode = (process.env.RENDEZVOUS_MODE || "local").toLowerCase();

function getEnv(variable, defaultForLocal) {
    if (process.env[variable]) {
        return process.env[variable];
    } else if (defaultForLocal !== undefined && mode === 'local') {
        return defaultForLocal;
    } else {
        throw `Environment variable "${variable}" is missing`;
    }
}

let config = {
    mode: mode,
};

// This function is used in index.js
config.isProductionMode = function () {
    // because stage should have the same behaviour as production
    return mode == "stage" || mode == "prod";
}
config.hostnames = {
    local: 'http://localhost:3000',
};
config.apiHostnames = {
    local: '',
};
// set hostname and api for current mode
config.hostname = config.hostnames[mode];
config.api = config.apiHostnames[mode];

// config.secret = getEnv('JWT_SECRET', 'aaa');

if (mode == 'local') {
    config.pathToKeys = './secrets/keys/';  
}

module.exports = config;