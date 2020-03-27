import Dev from '../models/Dev'
import Utils from '../utils/Utils';


class SearchControoler {
    async index(req, res){  
        // Buscar todos os devs  num raio de 10km
        // Filtrar por tecnologias 
        const techs = Utils.parseStringAsArray(req.query.techs);
        const { latitude, longitude } = req.query;


        const devs = await  Dev.find({
            techs: {
                $in: techs,
            },
            location: {
                $near:{
                    $geometry: {
                        type: 'Point',
                        coordinates: [ longitude, latitude],
                    },
                    $maxDistance: 1000,
                }
            },
        });

        return  res.json({"devs": devs});
    }
}

export default new SearchControoler();