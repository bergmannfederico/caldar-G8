const boilersData = require('../../data/boilers-data.json');

// Get all boilers
exports.findAll = (require, response) => {
    response.json(boilersData)
};

// Get boiler by ID
exports.findById = (require, response) => {
    const idFilter = (require) => (boiler) => boiler.id === parseInt(require.params.id);
    const element = boilersData.some(idFilter(require));

    if(element == true) {
        response.json(boilersData.filter(idFilter(require)));
    } else {
        response.status(400).json({ msg: `No boiler found with the id ${require.params.id}`});
    }
};

// Get boiler by attribute: typeID
exports.findByTypeId = (require, response) => {
    const idFilter = (require) => (boiler) => boiler.typeId === parseInt(require.params.typeId);
    const element = boilersData.some(idFilter(require));

    if (element == true) {
        response.json(boilersData.filter(idFilter(require)));
    } else {
        response.status(400).json({ msg: `No boiler found with the skillsId ${require.params.typeId}`})
    }
};

// Get boiler by attribute: maintenance_rate
exports.findByMaintenanceRate = (require, response) => {
    const idFilter = (require) => (boiler) => boiler.maintenance_rate === (require.params.maintenance_rate);
    const element = boilersData.some(idFilter(require));

    if (element == true) {
        response.json(boilersData.filter(idFilter(require)));
    } else {
        response.status(400).json({ msg: `No boiler found with the description ${require.params.maintenance_rate}`})
    }
};

//Delete boiler by id
exports.delete = (require, response) => {
    const idFilter = (require) => (boiler) => boiler.id === parseInt(require.params.id);
    const element = boilersData.some(idFilter(require));
  
    if (element == true) {
      response.json({
        msg: "Boiler deleted",
        boilersData: boilersData.filter((boiler) => !idFilter(require)(boiler)),
      });
    } else {
      response.status(400).json({ msg: `No bolier with the id of ${require.params.id}` });
    }
  };
