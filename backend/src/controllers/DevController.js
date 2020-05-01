const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        if (devs.length > 0) {
            return response.json(devs);
        }
        else {
            return response.status(204).send();
        }
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (dev) {
            response.status(409).send({ message: "dev github username already exists" });
        }
        else {
            try {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

                const { name = login, avatar_url, bio } = apiResponse.data;

                const techsArray = parseStringAsArray(techs);

                const location = {
                    type: 'Point',
                    coordinates: [latitude, longitude]
                };

                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                });

                const sendSocketMessageTo = findConnections(
                    { latitude, longitude },
                    techsArray
                );

                sendMessage(sendSocketMessageTo, 'new-dev', dev);

                return response.status(200).json(dev);
            }
            catch (err) {
                return response.status(err.response.status).send({ message: "dev github username not found" });
            }
        }
    },

    async update(request, response) {
        const { github_username } = request.params;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            return response.status(404).send({ message: "dev github username not found" })
        }
        else {
            const name = request.body.name || dev.name;
            const bio = request.body.bio || dev.bio;
            const avatar_url = request.body.avatar_url || dev.avatar_url;
            const latitude = request.body.latitude || dev.latitude;
            const longitude = request.body.longitude || dev.longitude;
            let techs = dev.techs;
            if (request.body.techs) {
                techs = parseStringAsArray(request.body.techs);
            }

            dev = await Dev.findByIdAndUpdate(dev._id, { name, bio, avatar_url, techs, latitude, longitude }, {upsert: true, new: true});

            return response.status(200).json(dev);
        }
    },

    async destroy(request, response) {
        const { github_username } = request.params;

        let res = await Dev.deleteOne({ github_username });

        if (res.n && res.ok && res.deletedCount) {
            return response.status(200).send({ message: "ok" });
        }
        else {
            return response.status(404).send({ message: "dev github username not found" });
        }
    }
}