// Create Dino Constructor
class Dino {
    constructor(species, weight, height, diet, where, when, fact, image) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }
}

// Fetch data from Dino JSON
const getDinoData = () => {
    
    fetch("./dino.json")
        .then((response) =>
            response.json()
        )
        .then((data) => {

            const dinoData = data.Dinos.map(dino => {
                let { species, weight, height, diet, where, when, fact } = dino;
                return new Dino(species, weight, height, diet, where, when, fact)
            });
            generateTiles(dinoData);
        })
        .catch((err) => 
            console.log("Fetch problem show: " + err.message)
        );
}

// Create Dino Object
let dino = new Dino();    


// Create Human Object
class Human {
    constructor(name, weight, height, diet) {
        this.species = name;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }
}

let human = new Human();


// Use IIFE to get human data from form
const getHumanDataFromForm = (() => {
    const getHumanData = () => {
        human.name = document.querySelector('#name').value;
        human.height = parseInt(document.querySelector('#feet').value) * 12 + parseInt(document.querySelector('#inches').value);
        human.weight = document.querySelector('#weight').value;
        human.diet = document.querySelector('#diet').value.toLowerCase();
    }

    return {
        human: getHumanData
    }
})();


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = () => {
    if (dino.weight > human.weight) {
        dino.fact = `${dino.species} 
            is ${dino.weight - human.weight} lbs heavier than you`;
        return dino.fact;    
    } else {
        dino.fact = `${dino.species} 
            is ${human.weight - dino.weight} lbs  lighter than you`;
        return dino.fact;    
    }
}


// Create Dino Compare Method 2
Dino.prototype.compareHeight = () => {
    if (dino.weight > human.weight) {
        dino.fact = `${dino.species} 
            is ${dino.weight - human.weight} inches taller than you`;
        return dino.fact;    
    } else {
        dino.fact = `${dino.species} 
            is ${human.weight - dino.weight} inches smaller than you`;
        return dino.fact;    
    }
}


// Create Dino Compare Method 3
Dino.prototype.compareDiet = () => {
    if (human.diet === dino.diet) {
        dino.fact = `${dino.species} 
            is ${dino.diet} like you`;
        return dino.fact;    
    } else {
        dino.fact = `${dino.species} 
            is ${dino.diet} but you is ${human.diet}`;
        return dino.fact;    
    }
}

// Create Dino fact
Dino.prototype.whereWhenFact = () => {
    dino.fact = `${dino.species}
        lived in ${dino.where} in the ${dino.when} Period`;
    return dino.fact;
}


// Generate Tiles for each Dino in Array
const generateTiles = (dinoData) => {
    let newDinoArr = [];

    // Shuffle dino array
    let shuffledArr = dinoData
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    shuffledArr.map((dinoItem, i) => {

        // Assign fetched array properties to global array properties.
        dino.species = dinoItem.species
        dino.height = dinoItem.height
        dino.weight = dinoItem.weight
        dino.diet = dinoItem.diet
        dino.where = dinoItem.where
        dino.when = dinoItem.when
        dino.fact = dinoItem.fact

        let randomNumber = Math.floor(Math.random() * 5) + 1;

        switch (randomNumber) {
            case 1:
                dino.compareHeight(dinoItem.fact);
                break;
            case 2:
                dino.compareWeight(dinoItem.fact);
                break;
            case 3:
                dino.compareDiet(dinoItem.fact);
                break;
            case 4:
                dino.whereWhenFact(dinoItem.fact);
                break;
            case 5:
                dino.fact;
                break;
            default:
                break;
        }

        newDinoArr.push(JSON.parse(JSON.stringify(dino)));
    });

    // Add human object 
    newDinoArr.splice(4, 0, human);

    const tileTemplate = newDinoArr.map((tile) => `
        <div class="grid-item">
            <h3>${tile.species || tile.name}</h3>
            <img src="images/${tile.species?.toLowerCase() || "human"}.png" alt="${tile.species || tile.name}">` +
            (tile.name  ? 
                    ''
                : tile.species === 'Pigeon' ?
                    `<p>All birds are Dinosaurs</p>`
                :
                    `<p>${tile.fact}</p>`
            ) + `
        </div>
    `)
    .join("");

    // Add tiles to DOM
    document.querySelector("#grid").innerHTML = tileTemplate;
}


const dinoCompareForm = document.querySelector('#dino-compare');

// Remove form from screen
function removeForm() {
    dinoCompareForm.style.display = "none";
}

// Validate Form
const inputName = document.querySelector('input#name');
const checkHumanName = () => {
    const humanName = document.querySelector('#dino-compare #name').value.trim();

    if (humanName === "") {
        inputName.style.border = "2px solid #dc3545";
    } else {
        inputName.style.border = "2px solid #28a745"; 
        return true;
    }
    return false;
};

const inputFeet = document.querySelector('input#feet');
const checkHumanFeet = () => {
    const feet = inputFeet.value;

    if (feet === "" || feet <= 0) {
        inputFeet.style.border = "2px solid #dc3545";
    } else {
        inputFeet.style.border = "2px solid #28a745"; 
        return true;
    }
    return false;
};

const inputInches = document.querySelector('input#inches');
const checkHumanInches = () => {
    const inches = inputInches.value;

    if (inches === "" || inches < 0) {
        inputInches.style.border = "2px solid #dc3545";
    } else {
        inputInches.style.border = "2px solid #28a745"; 
        return true;
    }
    return false;
};

const inputWeight = document.querySelector('input#weight');
const checkHumanWeight = () => {
    const weight = inputWeight.value;

    if (weight === "" || weight <= 0) {
        inputWeight.style.border = "2px solid #dc3545";
    } else {
        inputWeight.style.border = "2px solid #28a745"; 
        return true;
    }

    return false;
};


dinoCompareForm.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'name':
            checkHumanName();
            break;
        case 'feet':
            checkHumanFeet();
            break;
        case 'inches':
            checkHumanInches();
            break;
        case 'weight':
            checkHumanWeight();
            break;
    }
});


// On button click, prepare and display infographic
dinoCompareForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector('.error-msg');

    let isHumanNameValid = checkHumanName(),
        isHumanFeetValid = checkHumanFeet(),
        isHumanInchesValid = checkHumanInches(),
        isHumanWeightValid = checkHumanWeight();

    let isFormValid = isHumanNameValid && 
        isHumanFeetValid &&
        isHumanInchesValid &&
        isHumanWeightValid;

    if (isFormValid) {
        getDinoData();
        getHumanDataFromForm.human();
        removeForm();
    } else {
        errorMsg.textContent = "";
        errorMsg.textContent = "Please fill out all fields!";
    }
});



