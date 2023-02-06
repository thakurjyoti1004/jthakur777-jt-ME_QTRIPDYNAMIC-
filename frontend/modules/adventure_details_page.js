import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
    let adventureUrl = new URLSearchParams(search);
    let adventureIdFromUrl = adventureUrl.get("adventure");

  // Place holder for functionality to work in the Stubs
    return adventureIdFromUrl;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let adventureDetailsByApiCall = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    let adventuredesApiJsonData = await adventureDetailsByApiCall.json();
    return adventuredesApiJsonData;
  }
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // console.log(adventuredesApiJsonData,"data");
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML 
  
  let advName = document.getElementById("adventure-name");
  advName.innerHTML = adventure.name;
  let advSubtitile = document.getElementById("adventure-subtitle");
  advSubtitile.innerHTML = adventure.subtitle;
  let images = adventure.images;
  images.forEach((ele) =>{
    let photoGallery = document.getElementById("photo-gallery");
    let div = document.createElement("div");
    photoGallery.appendChild(div);
    let img = document.createElement("img");
    img.src =ele;
    img.classList.add("activity-card-image");
    div.appendChild(img);
  });
  let advContent = document.getElementById("adventure-content");
  advContent.innerHTML= adventure.content;
 }

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery = document.getElementById("photo-gallery");  
  gallery.innerHTML= `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div id="carouselInner" class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`
  images.forEach((ele, index) =>{
    let carouselItemDiv = document.createElement("div");
    carouselItemDiv.classList.add("carousel-item");
    let carouselInnerDiv = document.getElementById("carouselInner")
    carouselInnerDiv.append(carouselItemDiv);
    let carouselImage = document.createElement("img");
    carouselImage.src = ele;
    carouselImage.classList.add("d-block");
    carouselImage.classList.add("w-100");
    carouselImage.classList.add("activity-card-image");
    carouselImage.setAttribute("alt","...");
    carouselInnerDiv.querySelector("div").classList.add("active");
    carouselItemDiv.appendChild(carouselImage);
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available==true){
    let reservationPanelSoldOut = document.getElementById("reservation-panel-sold-out");
    reservationPanelSoldOut.style.display="none";
    let reservationPanel = document.getElementById("reservation-panel-available");
    reservationPanel.style.display="block";

    let reservationPerCost = document.getElementById("reservation-person-cost");
    reservationPerCost.innerHTML= adventure.costPerHead;
  }
  else{
    let hideReservationPanel = document.getElementById("reservation-panel-available");
    hideReservationPanel.style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costBasedOnPersons = persons*adventure.costPerHead;
  let reservationCost = document.getElementById("reservation-cost");
  reservationCost.textContent = costBasedOnPersons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
  let form = document.getElementById("myForm");
  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let personName = form.elements["name"].value;
    let reservationDate = form.elements["date"].value;
    let numberOfPerson = form.elements["person"].value;
    
    let url =`${config.backendEndpoint}/reservations/new`;
    fetch(url,{
      method:"POST",
      body: JSON.stringify(
        { 
          name:personName,
          date:reservationDate,
          person:numberOfPerson,
          adventure:adventure.id
        }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json()).then(res => {
      if(res.success== false){
        alert("Failed!");
      }else{
        alert("Success!");
        window.location.reload();
      }
  });
    
    });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner");
    if(adventure.reserved == true){
    reservedBanner.style.display="block";
    }else{
      reservedBanner.style.display="none";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
