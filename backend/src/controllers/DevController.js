import axios from 'axios';
import Dev from '../models/Dev';
import Utils from '../utils/Utils';
import { findConnections } from '../websocket';

class DevController {
    async index(req, res){
        const devs = await Dev.find();
        return res.json(devs);
    }
    async store(req, res){
        const { github_username, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const { name = login, bio, avatar_url } = response.data;
    
        const techs = Utils.parseStringAsArray(req.body.techs);
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        
        dev = await Dev.create({
            name,
            github_username,
            bio,
            avatar_url,
            techs,
            location,
        })
        //protocolo socket e filtro de novos usuarios.
        const sendSocketMessageTo = findConnections(
            { latitude,longitude },
            techs,
        )
        console.log(sendSocketMessageTo);
        }
        
        return res.json(dev); 
    }
}

export default new DevController();