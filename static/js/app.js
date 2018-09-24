let dataSet; // Stores our current dataset
let txtColor; // Text colour that should be used
let trainerRGB = {};
let theme = 'light'; // Default is light
let output = document.getElementById('output');


const network = new brain.NeuralNetwork();

const getData = () => {
    axios.get('/dataset')
    .then(response => {
        dataSet = response.data;
        document.getElementById('dataset').innerHTML = JSON.stringify(dataSet)
    })
    .catch(error => {
        console.error(error);
    });
};

getData(); // Grab the data

let trainNetwork = (trainerRGB) => {
    const {r,g,b} = trainerRGB;

    // If an empty array, add a valid empty object for brain until data submitted.
    if(dataSet < 1) dataSet = {input: {}, output: {}};
    network.train(dataSet);
    let result = brain.likely({r,g,b}, network);
    txtColor = result === 'dark' ? 'white' : 'black';

};

let lightOrDark = (event) => {
    theme = event.target.id;
}

const pickr = Pickr.create({
    el: '.color-picker',
    default: '1b1b1b',
    comparison: false,
    components: {
        preview: true,
        hue: true,
        interaction: {
            input: true
        }
    },
    onChange(hsva, instance) {

        trainerRGB = {
            r: (hsva.toRGBA()[0] / 255).toFixed(2) * 100 / 100,
            g: (hsva.toRGBA()[1] / 255).toFixed(2) * 100 / 100,
            b: (hsva.toRGBA()[2] / 255).toFixed(2) * 100 / 100
        };
        
        trainNetwork(trainerRGB);
        output.style.background = `rgb(${hsva.toRGBA()[0]}, ${hsva.toRGBA()[1]}, ${hsva.toRGBA()[2]})`;
        output.style.color = txtColor;
    }
});

const sendData = () => {
    const whatTheme = {
        light: theme === 'light' ? 1 : 0,
        dark: theme === 'dark' ? 1 : 0
    };
    // Check if the color picker has been used to set needed data for training.
    if(Object.keys(trainerRGB)[0]) {
        axios.post('/train', {trainerRGB, whatTheme})
        .then(response => {
            if(response.data.success) console.log(`Successfully added data to dataset ${JSON.stringify(trainerRGB)}, ${JSON.stringify(whatTheme)}.`);        
            getData(); // get newest dataset.
        })
        .catch(error => {
            throw error;
        });
    } else {
        console.warn('Please select a colour.')
    }
    
}

const clearData = () => {
    document.getElementById('dataset').innerHTML = '[]';

    axios.put('/train', [])
    .then(response => {
        if(response.data.success) console.log('Successfully cleared the dataset.');
    })
    .catch(error => {
        console.log(error);
    });
}