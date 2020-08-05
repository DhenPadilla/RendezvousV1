module.exports = `
    type Auth {
        success: Boolean!
        message: String
        errors: [Error!]
    }

    type Query {
        isAuthenticated: Auth!
    }
`;
