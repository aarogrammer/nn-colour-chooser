const router        = require('express').Router();
const fs            = require('fs');
const path          = require('path');
const datasetFile   = 'dataset.json';

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

// Clear the dataset file to be an empty array. This could be done better...
router.put('/train', (req, res) => {
    fs.writeFile(datasetFile, JSON.stringify([]), (err) => {
        if (err) {
            res.json({success: false});
            throw err;
        }
        console.log('The dataset has been modified to be empty.');
        res.json({success: true});
    });
});

// Add an input and output object to dataset file with the data submitted.
router.post('/train', (req, res) => {
    let outputData;
    
    if(req.body.whatTheme.dark === 1) outputData = 'dark'
    if(req.body.whatTheme.light === 1) outputData = 'light';

    fs.readFile(datasetFile, (err, data) => {
        if (err) throw err;
        let currentFileData = JSON.parse(data);

        currentFileData.push({
            input: {
                r: req.body.trainerRGB.r,
                g: req.body.trainerRGB.g,
                b: req.body.trainerRGB.b,
            },
            output: {
                [outputData]: 1
            }
        });
        
        fs.writeFile(datasetFile, JSON.stringify(currentFileData), (err) => {
            if (err) throw err;
            console.log('Data saved to dateset.');
            res.json({success: true});
        });
    });

    
});

router.get('/dataset', (req, res) => {
    res.sendFile(path.join(__dirname, datasetFile));
});

module.exports = router;