$(document).ready(function () {
    
    function createTimeBlocks() {
      const container = $(".container-lg");
      const currentHour = dayjs().hour();
  
      for (let hour = 9; hour <= 17; hour++) {
        const timeblock = $("<div>")
          .attr("id", `hour-${hour}`)
          .addClass("row time-block")
          .addClass(hour < currentHour ? "past" : hour === currentHour ? "present" : "future");
  
        const hourCol = $("<div>")
          .addClass("col-2 col-md-1 hour text-center py-3")
          .text(`${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "PM" : "AM"}`);
  
        const descriptionCol = $("<textarea>")
          .addClass("col-8 col-md-10 description")
          .attr("rows", "3");
  
        const saveBtn = $("<button>")
          .addClass("btn saveBtn col-2 col-md-1")
          .attr("aria-label", "save")
          .html('<i class="fas fa-save" aria-hidden="true"></i>');
  
        
        timeblock.append(hourCol, descriptionCol, saveBtn);
  
        
        container.append(timeblock);
      }
    }
  
    
    createTimeBlocks();
  
    
    function updateTimeblockBackground() {
      const currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        const timeblockHour = parseInt($(this).attr("id").split("-")[1]);
  
       
        if (timeblockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (timeblockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
    function loadEventsFromLocalStorage() {
      $(".time-block").each(function () {
        const timeblockId = $(this).attr("id");
        const eventText = localStorage.getItem(timeblockId);
  
        if (eventText) {
          $(this).find("textarea").val(eventText);
        }
      });
    }
  
    
    updateTimeblockBackground();
  
    
    loadEventsFromLocalStorage();
  
    
    $(".saveBtn").on("click", function () {
      const timeblockId = $(this).parent().attr("id");
      const eventText = $(this).siblings("textarea").val();
  
      
      localStorage.setItem(timeblockId, eventText);
    });
  
    
    function refreshTimeblockColors() {
      updateTimeblockBackground();
      setTimeout(refreshTimeblockColors, 60000);
    }
  
    
    refreshTimeblockColors();
  });