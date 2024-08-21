
//יוצר טבלה עם כל הנתונים
function createFlightTable(Type) {
   
    document.getElementById("myTable").innerHTML = "";

   
    for (let key in jsonFlights) {
        let flight = jsonFlights[key];
        let row = document.createElement("tr");

        //הוספת ערך לשורה עפי פרטי טיסה
        row.innerHTML = `
            <td>${flight.airport}</td>
            <td>${flight.number}</td>
            <td>${flight.schedueTime.replace('T' , ' ')}</td>
            <td>${flight.actualTime.replace('T', ' ') }</td>
            <td>${flight.type == 'D' ? `<img src="images/liftoff1.png" width="48px" height="48px"/>` : `<img src="images/landing1.png" width="72px" height="72px" />`}</td>
            <td>${flight.terminal}</td>
            <td>${flight.country}</td>
            <td>${flight.city}</td>
            <td>${flight.status}</td>`;

        //קביעת צבע רקע לפי סוג טיסה
        row.style.color = flight.schedueTime != flight.actualTime ? "red" : "";
        row.style.backgroundColor = flight.type == 'A' ? "lightcyan" : "azure";

        //בודק אם סוג הטיסה תקין
        if (Type) {
            if ((Type == 'D' && flight.type == 'D') || (Type == 'A' && flight.type == 'A')) {
                document.getElementById("myTable").appendChild(row);
            }
        } else {
            document.getElementById("myTable").appendChild(row);
        }
        //אירוע להצגת פרטי הטיסה בלחיצה על השורה
        row.addEventListener('click', function () {  
            openFlightDetails(flight);
        });
    }
}

// יופיעו רק טיסות ממריאות
function dtype() {
    createFlightTable('D');
}

// יופיעו רק טיסות נוחתות
function atype() {
    createFlightTable('A');
}

// יוצר את הטבלה עם כל הנתונים
createFlightTable();

function openFlightDetails(flight) {
    var detailsContent = document.getElementById('detailsContent');
    detailsContent.innerHTML = ''; //ניקוי


    //יוצר עבור כל שדה פסקה וערך השדה נקבע עפי השורה 
    Object.keys(flight).forEach(function (key) {
        var detailItem = document.createElement('p');
        detailItem.textContent = key + ': ' + flight[key];
        detailsContent.appendChild(detailItem);
    });

    //הצגת פרטי טיסה
    document.getElementById('flightDetails').style.display = 'block';
}

// סגירת פרטי הטיסה
function closeFlightDetails() {
    document.getElementById('flightDetails').style.display = 'none';
}

//  בעת לחיצה על שורה בטבלה פרטי הטיסה יוצגו
function searchFlights() {
    var number = document.getElementById('number').value.trim();
    var startDateInput = document.getElementById('startDate').value.trim();
    var endDateInput = document.getElementById('endDate').value.trim();
    var country = document.getElementById('country').value.trim();
    var city = document.getElementById('city').value.trim();

    var startDateParts = startDateInput.split('-');
    var endDateParts = endDateInput.split('-');

    var startDate = startDateParts[2] + '-' + startDateParts[1] + '-' + startDateParts[0];
    var endDate = endDateParts[2] + '-' + endDateParts[1] + '-' + endDateParts[0];

    document.getElementById("myTable").innerHTML = ""; // ניקוי טבלת התוצאות

    for (let key in jsonFlights) {
        let flight = jsonFlights[key];

        // בודק אם הפרטים נכונים
        if ((number == '' || flight.number.toString() == number) &&
            (startDateInput == '' || flight.schedueTime >= startDate) &&
            (endDateInput == '' || flight.schedueTime <= endDate) &&
            (country == '' || flight.country.includes(country)) &&
            (city == '' || flight.city.includes(city))) {

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${flight.airport}</td>
                <td>${flight.number}</td>
                <td>${flight.schedueTime.replace('T' , ' ')}</td>
                <td>${flight.actualTime.replace('T', ' ') }</td>
                <td>${flight.type == 'D' ? `<img src="images/liftoff1.png" width="48px" height="48px"/>` : `<img src="images/landing1.png" width="72px" height="72px" />`}</td>
                <td>${flight.terminal}</td>
                <td>${flight.country}</td>
                <td>${flight.city}</td>
                <td>${flight.status}</td>`;

            //לאחר החיפוש יופי פרטי הטיסה בלחיצה על שורה
            row.addEventListener('click', function () {
                openFlightDetails(flight);
            });
            //במעבר על השורה צבע הרקע ישתנה
            row.addEventListener("mouseover", function () {
                this.style.backgroundColor = "lightgreen";
            });
            //רקע הצבע יוגדר בהתאם לסוג טיסה
            row.addEventListener("mouseout", function () {
                this.style.backgroundColor = flight.type == 'A' ? "lightcyan" : "azure";
            });

            document.getElementById("content-table").appendChild(row);
        }
    }
}



