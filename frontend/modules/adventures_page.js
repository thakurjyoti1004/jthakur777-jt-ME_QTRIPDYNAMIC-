
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let queryParam = params.get("city");
  return queryParam;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let backendApi = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let backendJsonData = await backendApi.json();
    return backendJsonData;
    
  }
  catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
    adventures.forEach((data) =>{
      
    let divTile = document.createElement("div");
    divTile.classList.add("col-12");
    divTile.classList.add("col-sm-6");
    divTile.classList.add("col-md-3");
    divTile.classList.add("flex-card");
    document.getElementById("data").appendChild(divTile);

    let activityCardDiv= document.createElement("div");
    activityCardDiv.classList.add("card");
    activityCardDiv.classList.add("custom-card");

    divTile.appendChild(activityCardDiv);

    let anchorTag = document.createElement("a");
    anchorTag.classList.add("activity-card");
    let adventure_id =data.id;
    anchorTag.id=adventure_id;
    anchorTag.href="detail/?adventure="+adventure_id;
    
    activityCardDiv.appendChild(anchorTag);

    let image = document.createElement("img");
    image.src=data.image;
    anchorTag.appendChild(image);

    let categoryDiv=document.createElement("div");
    categoryDiv.classList.add("advCategory");
    let h5=document.createElement("h5");
    let category= data.category;
    h5.innerText=`${category}`;
    anchorTag.appendChild(categoryDiv);
    categoryDiv.appendChild(h5);

    let textDiv = document.createElement("div");
    anchorTag.appendChild(textDiv);

    let name =data.name;
    let costPerHead =data.costPerHead;
    let duration =data.duration;
    textDiv.style.width="100%";
    
    textDiv.innerHTML = `<span>${name}</span>
    <span class="float-end">₹${costPerHead}</span>
    <div><span>Duration</span>
    <span class="float-end">${duration} Hours</span></div>`

    }
    );
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
    
  let filteredDurationList = list.filter((elt) =>{
     return elt.duration >= low && elt.duration <= high;
    })

return filteredDurationList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
      
      
  let listFiltering = list.filter((elt) =>{
    return categoryList.indexOf(elt.category)>=0;
  })

  return listFiltering;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
     let categoryList = filters.category;
     let durationFilter = filters.duration;
     let filteredAdventure = list;

    if(categoryList.length){
      filteredAdventure = filterByCategory(list,categoryList);

    }
    if(durationFilter.length){
      let splitedArr = durationFilter.split("-");
      let low = splitedArr[0];
      let high = splitedArr[1];
      filteredAdventure= filterByDuration(filteredAdventure,low,high);
      
    }
    return filteredAdventure;
    //

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let getItem = window.localStorage.getItem("filters");
  if(getItem === null){
    return null;
  }else{
    return JSON.parse(getItem);
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filterPills = filters.category;
    filterPills.forEach((elem) =>{
      let h3 = document.createElement("h3");
      h3.innerText = elem;
      h3.classList.add("category-filter");
      document.getElementById("category-list").appendChild(h3);
    })


    let selectDuration = document.getElementById("duration-select");
    selectDuration.value= filters.duration;
    


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
