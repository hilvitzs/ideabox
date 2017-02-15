window.onload = function() {
  displayOnPageLoad();
}

function displayOnPageLoad() {
  var keys = Object.keys(localStorage);
  for (var i = 0; i < localStorage.length; i++) {
    var parsedIdea = JSON.parse(localStorage[keys[i]]);
    prependNew(parsedIdea);
  }
}

function NewIdea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill" || quality;
}

function grabValues() {
  var $uniqueId = event.timeStamp;
  var $titleInput = $('.userTitle').val();
  var $bodyInput = $('.userBody').val();
  stringifyIdea($uniqueId, $titleInput, $bodyInput);
}

function stringifyIdea(id, title, body) {
  var newIdea = new NewIdea(id, title, body);
  var stringIdea = JSON.stringify(newIdea);
  localStorage.setItem(id, stringIdea);
  parseNewestIdea(id);
}

function parseNewestIdea(id) {
  var singleParse = JSON.parse(localStorage.getItem(id));
  prependNew(singleParse);
}

function prependNew(parsedIdea) {
  $('.ideaCards').prepend(
    `<div class="ideaCard">
        <div class="cardTop" id="${parsedIdea.id}">
          <h2 class="ideaTitle" contenteditable="true">${parsedIdea.title}</h2>
          <div class="deleteBtn icon">
          </div>
        </div>
        <p class="ideaBody" contenteditable="true">${parsedIdea.body}</p>
        <div class="cardBottom">
          <div class="upvote vote icon">
          </div>
          <div class="downvote vote icon">
          </div>
          <p class="quality">quality:
            <span class="quality qualityLevel">${parsedIdea.quality}</span>
          </p>
        </div>
      </div>`)
}

$('.saveBtn').on('click', function() {
  grabValues();
  // console.log(newIdea);

  clearFields();
});

function clearFields() {
  $('.userTitle').val("")
  $('.userBody').val("");

$('.ideaCards').on('click', '.deleteBtn', function() {
  $(this).parents().remove('.ideaCard');
  });
}

$('.ideaCards').on('click', '.upvote', function() {
  var $quality = $('.qualityLevel').html();
  if ($quality == "swill") {
    $('.qualityLevel').text("plausible")
  }
  else if ($quality === "plausible") {
    $('.qualityLevel').text("genius")
  }
  else {
    $('.qualityLevel').text("genius")
  }
})

$('.ideaCards').on('click', '.downvote', function() {
  var $quality = $('.qualityLevel').html();
  if ($quality == "genius") {
    $('.qualityLevel').text("plausible")
  }
  else if ($quality === "plausible") {
    $('.qualityLevel').text("swill")
  }
  else {
    $('.qualityLevel').text("swill")
  }
})
