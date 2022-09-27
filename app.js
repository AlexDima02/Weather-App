const auth = "5d8d0f350c51c38d0174906526cc3a21";

// API Key

// Global variables

const container = document.querySelector('.widget-city');
const form = document.querySelector('.search-form');
const inputValue = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');

// Parameter values

const detailsContainer = document.querySelector('.weather-details');
const temperature = document.querySelector('.temp-standard');
const clouds = document.querySelector('.clouds');
const temperatureMin = document.querySelector('.temp-min');
const temperatureMax = document.querySelector('.temp-max');
const feelsLike = document.querySelector('.feels-like');
const countryName = document.querySelector('.country-name');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity')

// Open slider 

const openBtn = document.querySelector('.open-slide');
const widgetContainer = document.querySelector('.widget-container');

// Main widget parameters

const currentTemp = document.querySelector('.current-temperature');
const currentLoc = document.querySelector('.location');
const currentTime = document.querySelector('.current-time');
const weatherCond = document.querySelector('.weather-type');
const infoSection = document.querySelector('.info-section');
const savedLocations = document.querySelector('.saved-locations');

// Weather widget prediction

const daysContainer = document.querySelectorAll('.days');
const daysCondition = document.querySelector('.weather-condtion');
const futureData = document.querySelector('.days-forecast');

let savedValue;



// Event Listeners

inputValue.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    
    detailsContainer.classList.add('active');
    e.preventDefault();
    displayData(savedValue);
    // Next 5 days forecast data (3, 6, 9, 12, 15, 18, 21, 0)

    nextDaysData(savedValue);
    
    
});

// Open slider

openBtn.addEventListener('click', () => {

    widgetContainer.classList.toggle('active');
    openBtn.classList.toggle('active');

});

// Getting info from the server once we click on the city saved





// Function that takes the data from the api and convert data into a JSON Object

async function fetchApi(url){

    const dataKey = await fetch(url, {
        method: "GET",
        headers: {}
        })

    const data = await dataKey.json();
    

    return data;

     

}



// Displaying all the data in a widget

async function displayData(city){

// Fetch all data from the server for a specific city

    const fetchLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${auth}&units=metric`;

    const dataFetch = await fetchApi(fetchLink);

// For every city object create a widget that takes the next data:
// Widget details: temp_max, temp_min, temp, clouds, hummidity, feels_like

    generateWidgets(dataFetch);
    widgetData(dataFetch);
    
    

    saveToLocal(dataFetch.name, dataFetch);
    

}

async function nextDaysData(city){

    const fetchLink = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${auth}&units=metric`;

    const dataFetch = await fetchApi(fetchLink);

    futureForecast(dataFetch);

    

}

function generateWidgets(data){

        // Current day forecast
        // Name of the country
        
        countryName.innerHTML = data.name;

        // Insert data automatically into the right parameter
        
        // Temp

        temperature.children[0].innerHTML = `${data.main.temp} &deg`;

        // Temp_min

        temperatureMin.children[0].innerHTML = `${data.main.temp_min} &deg`;

        // Temp_max
        
        temperatureMax.children[0].innerHTML = `${data.main.temp_max} &deg`;
        
        // Feels_like

        feelsLike.children[0].innerHTML = `${data.main.feels_like} &deg`;

        // Clouds
        
        clouds.children[0].innerHTML = `${data.clouds.all} %`;
        
        // Hummidity
        
        humidity.children[0].innerHTML = `${data.main.humidity} %`;

        // Wind speed

        wind.children[0].innerHTML = `${data.wind.speed} km/h`;

        inputValue.value = '';


    
    
}

 function widgetData(data){


// Current temp

    currentTemp.children[0].innerHTML = `${data.main.temp} &deg`;

// Current location

    currentLoc.children[0].innerHTML = data.name;


// Current date-time
// Obtain current city offset in seconds and convert it to miliseconds
// Obtain current timezone and convert it to miliseconds
// Convert the result to a readable format


    const dataTime = new Date(data.dt * 1000 - (data.timezone * 1000));
    const dataFormat = dataTime.toLocaleString();

    currentTime.children[0].innerHTML = dataFormat;

// Current weather condition
// Fetch icons based on the weather condition

    for(let i of data.weather){

        weatherCond.innerHTML = `<img src='./icons/${i.icon}.png'> 
        <p>${i.description}</p>`;

    }


       
}

// Weather next days widget

function futureForecast(data){

// Display next day forecast 

    // let dataFormat = new Date(data.dt * 1000 - (data.city.timezone * 1000));
    // daysContainer.children[0].innerHTML = dataFormat.toLocaleString();

    data.list.forEach((day) => {
        
       switch(day.dt){
           default:
            
            daysContainer.forEach((day) => {

                day.classList.add('active');

            })

            break;

            case 1664204400:    

             // Obtain current city offset in seconds and convert it to miliseconds
            // Obtain current timezone and convert it to miliseconds
            // Convert the result to a readable format

                const dayTime1 = document.getElementById('0');
                let day1 = new Date(day.dt * 1000 - (data.city.timezone * 1000));
                dayTime1.children[0].innerHTML = day1.toLocaleDateString('en-us', { weekday:"long", day: "numeric"});
               
            // Getting the average temperature for the next day and weather condition
                
                const tempId0 = document.getElementById('day0');

                tempId0.children[0].innerHTML = `${day.main.temp} &deg`;
                tempId0.children[1].innerHTML = `${day.weather[0].description}`;
                
            break;

            case 1664290800:

           

             // Obtain current city offset in seconds and convert it to miliseconds
            // Obtain current timezone and convert it to miliseconds
            // Convert the result to a readable format

                const dayTime2 = document.getElementById('1');
                
                let day2 = new Date(day.dt * 1000 - (data.city.timezone * 1000));
                dayTime2.children[0].innerHTML = day2.toLocaleDateString('en-us', { weekday:"long", day: "numeric"});
            
            // Getting the average temperature for the next day and weather condition

                const tempId1 = document.getElementById('day1');

                tempId1.children[0].innerHTML = `${day.main.temp} &deg`;
                tempId1.children[1].innerHTML = `${day.weather[0].description}`;
                
            break;

            case 1664377200:


           

             // Obtain current city offset in seconds and convert it to miliseconds
            // Obtain current timezone and convert it to miliseconds
            // Convert the result to a readable format

                const dayTime3 = document.getElementById('2');
                let day3 = new Date(day.dt * 1000 - (data.city.timezone * 1000));
                dayTime3.children[0].innerHTML = day3.toLocaleDateString('en-us', { weekday:"long", day: "numeric"});
            
            // Getting the average temperature for the next day and weather condition

                const tempId2 = document.getElementById('day2');

                tempId2.children[0].innerHTML = `${day.main.temp} &deg`;
                tempId2.children[1].innerHTML = `${day.weather[0].description}`;
                
            break;

            case 1664463600:


            // Obtain current city offset in seconds and convert it to miliseconds
            // Obtain current timezone and convert it to miliseconds
            // Convert the result to a readable format

                const dayTime4 = document.getElementById('3');
                let day4 = new Date(day.dt * 1000 - (data.city.timezone * 1000));
                dayTime4.children[0].innerHTML = day4.toLocaleDateString('en-us', { weekday:"long", day: "numeric"});
           
            // Getting the average temperature for the next day and weather condition

                const tempId3 = document.getElementById('day3');

                tempId3.children[0].innerHTML = `${day.main.temp} &deg`;
                tempId3.children[1].innerHTML = `${day.weather[0].description}`;
                
            break;

       }
        
    });
    
   
    

       

    
    
    
    

}

// Save local input value
// Function take the savedValue from the input
// When we submit the form, savedValue is saved in local storage

function saveToLocal(city, data){

// Check if there is a value in the storage

    let save;
    let index = data.id;
    

    if(localStorage.getItem('locations') === null){


        save = [];
        


    }else {

       

        save = JSON.parse(localStorage.getItem('locations'));

        // Avoid duplicates by applying a filtering in the save array after it parses the values 
        
        save = save.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id && t.name === value.name
            
        ))
        );

    // Create a container to display the items saved in the local storage
    // Check if there is an item with the same id and in case it is, return nothing to avoid duplicates 
        
        const cityName = document.createElement('h1');
        cityName.classList.add('locations');
        savedLocations.appendChild(cityName);
        cityName.innerHTML = city;

    // Store the latest cities searched in a container 
    // When i click on each city searched, display the data about it
        
        let stored = city;
        
    cityName.addEventListener('click', () => {
        
         displayData(stored);
         nextDaysData(stored);
         cityName.innerHTML = '';
         
    })
        


    }
    

    save.push(data);

    


    

    localStorage.setItem('locations', JSON.stringify(save));

}

// Remove duplicates inside the array



// Take the value of the input

function updateInput(e){

    savedValue = e.target.value;
    
    

}





// Problems 
// Avoid displaying duplicates in the location history
// Next 5 days identifying a property whom values can display the next 5 days forecast
