const express = require('express');
const router = express.Router();
const fs = require('fs');
const dataPath = './data/buildings.json';


// Get all buildings
router.get('/', (req, res) =>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        res.send(JSON.parse(data));
    });
});

//Get building by Attribute
router.get('/attributes', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const buildings = JSON.parse(data);
        if(req.query.adress){
            return res.json(buildings.filter(building => building.adress === req.query.adress));
        }else if(req.query.full_name){
            return res.json(buildings.filter(building => building.full_name === req.query.full_name));
        }else if(req.query.phone){
            return res.json(buildings.filter(building => building.phone === req.query.phone));
        }else if(req.query.boiler_id){

            return res.json(buildings.filter(building =>
                building.boiler_id.includes(parseInt(req.query.boiler_id))));
        }else{
            res.status(400).json({msg: `Attribute incompatible with buildings`})
        }
        return res.json('');
    });
});

//Get building by ID
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const buildings = JSON.parse(data);
        const found = buildings.some(building => building.id === parseInt(req.params.id));

        if(found){
            return res.json(buildings.filter(building => building.id === parseInt(req.params.id)));
        }
        res.status(400).json({msg: `No buildings found with id  ${req.params.id}`});
    });
});

//Delete building
router.delete('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const buildings = JSON.parse(data);
        const found = buildings.some(building => building.id === parseInt(req.params.id));
        if(found){
            const newJson = buildings.filter(building => building.id !== parseInt(req.params.id));
            fs.writeFile(dataPath, JSON.stringify(newJson), 'utf8', function(err) {
                if (err)
                    return res.status(500).json({msg: 'Imposible to re-write the buildings'});
                return res.json(newJson)
            });
        }
        res.status(400).json({msg: `No buildings found whit id: ${req.params.id}`})
    });
});

module.exports = router;