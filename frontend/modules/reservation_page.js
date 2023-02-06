import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let fetchReservationsApi = await fetch(`${config.backendEndpoint}/reservations/`);
    let fetchedJsonData = await fetchReservationsApi.json();
    console.log(fetchedJsonData);
    return fetchedJsonData;
  }
  catch(error){
    return null;
  }
  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
    let reservationTableParent = document.getElementById("reservation-table-parent");
    let noReservationBanner = document.getElementById("no-reservation-banner");
    if(reservations.length>0){
      reservationTableParent.style.display = "block";
      noReservationBanner.style.display ="none";
    }else{
      noReservationBanner.style.display = "block";
      reservationTableParent.style.display ="none";
    };
    reservations.map((elem) =>{
      let reservationTable = document.getElementById("reservation-table");
      let row = document.createElement("tr");
      reservationTable.appendChild(row);
      let tableData1 = document.createElement("td");
      tableData1.innerText = elem.id;
      row.appendChild(tableData1);

      let tableData2 = document.createElement("td");
      tableData2.innerHTML = elem.name;
      row.appendChild(tableData2);

      let tableData3 = document.createElement("td");
      tableData3.innerHTML = elem.adventureName;
      row.appendChild(tableData3);

      let tableData4 = document.createElement("td");
      tableData4.innerHTML = elem.person;
      row.appendChild(tableData4);

      let tableData5 = document.createElement("td");
      let date = elem.date;
      let newDate = new Date(date);
      let modifiedDate = newDate.toLocaleDateString("en-IN");
      tableData5.innerHTML = modifiedDate;
      row.appendChild(tableData5);

      let tableData6 = document.createElement("td");
      tableData6.innerHTML = elem.price;
      row.appendChild(tableData6);

      let tableData7 = document.createElement("td");
      let bookingTime = elem.time;
      let x = new Date(bookingTime);

      let newTime= x.toLocaleString("en-IN",{year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'2-digit',second:'2-digit' })
      let formatedTime = newTime.replace(" at",",");
      tableData7.innerHTML =formatedTime;
      row.appendChild(tableData7);

      let tableData8 = document.createElement("td");
      let visitButton = document.createElement("button");
      visitButton.classList.add("reservation-visit-button");
      visitButton.id =elem.id;
      row.appendChild(tableData8);

      let anchorTag = document.createElement("a");
      anchorTag.innerHTML ="Visit Adventure";
      anchorTag.href =`detail/?adventure=${elem.adventure}`;
      
      visitButton.append(anchorTag);
      tableData8.append(visitButton);
     
   


    })

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
