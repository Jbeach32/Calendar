
$(document).ready(function () {
    const currentDate = dayjs();
    const currentHour = currentDate.hour();
  
    
    $("#currentDay").text(currentDate.format("dddd, MMMM D, YYYY"));
  
    
    function updateTimeblockBackground() {
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
  
    
    updateTimeblockBackground();
  
    
    function loadEventsFromLocalStorage() {
      $(".time-block").each(function () {
        const timeblockId = $(this).attr("id");
        const eventText = localStorage.getItem(timeblockId);
  
        if (eventText) {
          $(this).find("textarea").val(eventText);
        }
      });
    }
  
    
    loadEventsFromLocalStorage();
  
    
    $(".saveBtn").on("click", function () {
      const timeblockId = $(this).parent().attr("id");
      const eventText = $(this).siblings("textarea").val();
  
      
      localStorage.setItem(timeblockId, eventText);
    });
  
    
    setInterval(updateTimeblockBackground, 60000);
  });