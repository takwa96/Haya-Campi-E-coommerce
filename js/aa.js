function validateAddEvent() {
    
  
    
  
    
    
    
    
  
    var d1= document.getElementById("arrivalDate");
    var date1 = d1.value.toString();
    var arrivalDate=convetDate(date1);
    console.log('d',arrivalDate);
    var d2= document.getElementById("departureDate");
    var date2 = d2.value.toString();
    var departureDate=convetDate(date2);
  
  
    var image = document.getElementById("eventImage").value;
    var eventImage = replaceCh(image);
    var verifEventImage = eventImage.length !== 0;
  
    if (verifEventImage) {
      document.getElementById("eventImageError").innerHTML = "";
    } else {
      document.getElementById("eventImageError").innerHTML = "Please choose the event image";
      document.getElementById("eventImageError").style.color = "red";
    }
  
    if (
      verifIfEventExist &&
      verifEventName &&
      verifEventPlace &&
      verifPrice &&
      verifParticipants &&
      verifEventImage
  
    ) {
      var idEvent = JSON.parse(localStorage.getItem("idEvent") || "1");
      var event = {
        id: idEvent,
        eventName: eventName,
        eventPlace: eventPlace,
        price: price,
        participants: participants,
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        image: eventImage
      };
  
      var events = JSON.parse(localStorage.getItem("events") || "[]");
      events.push(event);
      localStorage.setItem("events", JSON.stringify(events));
      localStorage.setItem("idEvent", idEvent + 1);
      location.reload();
    }
  }