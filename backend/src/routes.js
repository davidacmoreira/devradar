const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' })
});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/update/:github_username', DevController.update);
routes.put('/devs/destroy/:github_username', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
