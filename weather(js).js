
//get week days function
function weekdays(date, index) {
    let temp = (date.getDay() + index) % 7;
    if (temp == 0) {
        return ["sunday"]
    } else if (temp == 1) {
        return ["monday"]
    } else if (temp == 2) {
        return ["tuesday"]
    } else if (temp == 3) {
        return ["wednesday"]
    } else if (temp == 4) {
        return ["thursday"]
    } else if (temp == 5) {
        return ["friday"]
    } else if (temp == 6) {
        return ["saturday"]
    }
}

//set card's week days
let temp_date = new Date();


//add search activity & call set data function
let search_area = document.querySelector("#search-box");
let search_button = document.querySelector("#btn-search");

search_area.addEventListener("submit", e => {
    e.preventDefault();
    if (search_area.area.value) {
        set_data(search_area.area.value)
    }
})
search_button.addEventListener("click", e => {
    e.preventDefault();
    if (search_area.area.value) {
        set_data(search_area.area.value)
    }
})
// set data function
async function set_data(city) {
    let data = await fetch(`https://one-api.ir/weather/?token=875466:631fa485f0ca93.08765454&action=daily&city=${city}`);
    let days = await data.json();
    //get card
    let cards = document.querySelectorAll(".card");
    //get & set  city place
    let city_content=document.querySelector("#city");
    city_content.textContent=city;
 // set data with foreach function
    cards.forEach((card, index) => {
       // today weather
        if (index == 0) {
            card.innerHTML = ` \n <img src="https://one-api.ir/weather/?token=875466:631fa485f0ca93.08765454&action=icon&id=${days.result.list[index].weather[0].icon}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">today's weather</h5>
                <h5 class="card-title text-center">${days.result.list[index].weather[0].description}</h5>
                <p class="btn btn-primary ">${days.result.list[index].temp.min}</p>
                <p class="btn btn-success">${days.result.list[index].temp.day}</p>
                <p class="btn btn-danger">${days.result.list[index].temp.max}</p>`;
        } else {
            // console.log(index);
            console.log(days.result.list[index].weather.icon);
            card.innerHTML = `\n <img src="https://one-api.ir/weather/?token=875466:631fa485f0ca93.08765454&action=icon&id=${days.result.list[index].weather[0].icon}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">${weekdays(temp_date, index)}</h5>
                <h5 class="card-title text-center">${days.result.list[index].weather[0].description}</h5>
                <p class="btn btn-primary ">${days.result.list[index].temp.min}</p>
                <p class="btn btn-success">${days.result.list[index].temp.day}</p>
                <p class="btn btn-danger">${days.result.list[index].temp.max}</p>`;
        }

    })
}
// default city
set_data("کلاچای")

