const auth = "5d8d0f350c51c38d0174906526cc3a21";
const auth2 = "lnGbZdhXxlr7kaA3xc1DA6G7G8ep3szr";

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
const humidity = document.querySelector('.humidity');

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


const futureData = document.querySelector('.days-forecast');

let savedValue;

// Rotation image

const imageRotation = document.querySelectorAll('.container-images');

// Event Listeners

inputValue.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    
    detailsContainer.classList.add('active');
    e.preventDefault();
    displayData(savedValue);
    // Next 5 days forecast data (3, 6, 9, 12, 15, 18, 21, 0)

    nextDaysData(savedValue);
    futureData.innerHTML = '';
    
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
// Current day
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
    console.log(dataFetch);
    futureForecast(dataFetch);

    

}

function generateWidgets(data){

        // Current day forecast
        // Name of the country
        console.log(data);
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


    const dataTime = new Date(data.dt * 1000);
    const dataFormat = dataTime.toLocaleString();

    currentTime.children[0].innerHTML = dataFormat;

// Current weather condition
// Fetch icons based on the weather condition

    for(let i of data.weather){

        weatherCond.innerHTML = `<img src='./icons/${i.icon}.gif'> 
        <p>${i.description}</p>`;
        const description = i.description;
        changeImages(description);
    }


       
}

// Weather next days widget

function futureForecast(data){

// Display next day forecast 

   
    console.log(data);


    data.list.forEach((day, index) => {
        if(index > 0){
        
       
        
       // Get the future dates from the api forecast
       let dayname = new Date(day.dt * 1000);
       // Get hours from the generated future data
        const hours = dayname.getHours(); 
        // Get the day
        const dayNr = dayname.getDate();
        // Get name of the day
        const dayName = dayname.toLocaleDateString('en-US', {weekday: "long"});
        // If hours are equal to the 3PM, display all the days that has the 3PM in the composition
       // Unix needs to be converted into date and get only the hour
       // If the hour is equal to our chosen hour
       // Display only the days that equal that hour
        if(hours === 14){
        
        // Create one section of time display and one section of displaying the weather
        // Container 
            console.log(dayname)
            const date = document.createElement('div');
            date.classList.add('date');
            futureData.appendChild(date);

        // Data display
            const displayDay = document.createElement('h2');
            displayDay.classList.add('day');
            date.appendChild(displayDay);
            displayDay.innerHTML = `${dayNr} ${dayName}`;
        // Weather display

            const weatherDisplay = document.createElement('div');
            weatherDisplay.classList.add('weather-condtion');
            date.appendChild(weatherDisplay);

        // Weather temp
            const temp = document.createElement('h2');
            weatherDisplay.appendChild(temp);
            temp.innerHTML = `${day.main.temp}&deg`
        // Weather condition
            const weatherCond = document.createElement('p');
        // Loop over all images and select the one according to the weather conditions
            for(let i of day.weather){

                weatherCond.innerHTML = `<img class="weather-image" src='./icons/${i.icon}.gif'>`; 
                
        
            }
            
            weatherDisplay.appendChild(weatherCond);
           

            
        }
        
       
                
        

            

           
            
            

                  


            

            
            
            
        }
        


    })
    
       

    
    
    
    

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

    }

    // Display only the new added items
    // The rest need to stay on the location history
    // Push a new value inside the array only if it doesn't have already similar values in it
    


    if(save.indexOf(city) == -1){

         //add the value to the array
        save.push(city);
        // Set items in the in the local storage array and converts the values into JSON strings
        localStorage.setItem("locations",JSON.stringify(save));

        
    
    }

    

    

    


}



// Take the value of the input

function updateInput(e){

    savedValue = e.target.value;
    
    

}


// Function that checks the time and rotate images after a specific hour

function changeImages(name){
    
   // Look over each case inside the description from the api and display specific images according to the weather conditions 
   
    switch(name){
       
        case 'scattered clouds':
            document.body.style.backgroundImage = "url('./images/scattered-clouds.jpg')";
        break;
        case 'clear sky':
            document.body.style.backgroundImage = "url('./images/clear-sky.jpg')";
        break;
        case 'broken clouds':
            document.body.style.backgroundImage = "url('./images/broken-clouds.jpg')";
        break;
        case 'overcast clouds':
            document.body.style.backgroundImage = "url('./images/overcast-clouds.jpg')";
        break;
        case 'light rain':
            document.body.style.backgroundImage = "url('./images/clear-sky.jpg')";
        break;
        
        
        


    }
        

}

