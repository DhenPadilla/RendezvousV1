const authService = require('../../service/auth');

module.exports = {
    Query: {
        isAuthenticated: async (parents, args, { models, user }) => {
            if(!user) {
                return {
                    success: false,
                    errors: [{
                        path: 'graphql/isAuthenticated',
                        message: 'No user - unauthorized access'
                    }]
                };
            }
            return {
                success: true,
                message: 'User authentication success!'
            }
        }
    }    
};
