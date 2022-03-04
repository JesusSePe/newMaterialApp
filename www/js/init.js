(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.tabs').tabs({"swipeable":true});

  }); // end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('deviceready', onDeviceReady, false);


function searchChar() {
  let name = $('#charName').val().split(" ").join("+").toLowerCase();
  $.ajax({
    method: "GET",
    url: "https://xivapi.com/character/search?name=" + name,
    dataType: "json",
  }).done(function(msg){
    showResults(msg);
  }).fail(function(){
    alert("Ajax Error");
  });
}


function showResults(result) {
  $('.collection:first-of-type').empty();
  var characters = result.Results;
  console.log(result);
  for (let index = 0; index < characters.length; index++) {
    const character = characters[index];
    $('.collection:first-of-type').append('<li charid="'+character["ID"]+'" class="collection-item" style="display: flex;align-items: center;"><img src="'+character['Avatar']+'" class="circle responsive-img">'+character["Name"]+'<a href="#!" class="secondary-content right"><i class="material-icons">send</i></a></li>');
  };

  $('.secondary-content').click(function() {
    // Save the parent node in a variable
    varParent = $(this).parent();
    // Clone parent, delete children and get the inner text
    parentText = varParent.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var tabsInstance = M.Tabs.getInstance(tabs);
    tabsInstance.select("test-swipe-2");
    
    // Print artist info on second screen
    $.ajax({
      method: "GET",
      url: "https://xivapi.com/character/"+varParent.attr("charid"), // Character ID
      dataType: "json",
    }).done(function(msg){
      showDetails(msg);
    }).fail(function(){
      alert("Ajax Error");
    });

    M.updateTextFields();
        
  });
}

function showDetails(info) {
  
  $('#char-img').attr('src', info.Character.Avatar);
  $('#char-name').text(info.Character.Name);
  $('#bio').attr('value', info.Character.Bio);
  $('#nameday').attr('value', info.Character.Nameday);
  $('#job').attr('value', info.Character.ActiveClassJob.UnlockedState.Name);
  $('#lvl').attr('value', info.Character.ActiveClassJob.Level);
  $('#character').attr('src', info.Character.Portrait);

  M.updateTextFields();

  $('#char-img').on('click', function() {
    var tabs = document.getElementById("tabs");
    var tabsInstance = M.Tabs.getInstance(tabs);
    tabsInstance.select("test-swipe-3");
  });

}




function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');

    // Add event listeners to search.
    $('#search-icon').on('click', searchChar);
    $('#charName').on('keypress',function(e) {
      if(e.which == 13) {
        searchChar;
      }
    });

}