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
  this.quality = "quality: swill" || quality;
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
          <p class="qualityLevel">${parsedIdea.quality}</p>
        </div>
      </div>`)
}

$('.saveBtn').on('click', function() {
  grabValues();
  clearFields();
});

function clearFields() {
  $('.userTitle').val("")
  $('.userBody').val("");

$('.ideaCards').on('click', '.deleteBtn', function() {
  $(this).parents().remove('.ideaCard');
  var $id = $(this).parents().attr('id');
  localStorage.removeItem($id);
  });
}

$('.ideaCards').on('click', '.upvote', function() {
  var $quality = $(this).siblings('p').text();
  var $id = $(this).parents().siblings('.cardTop').attr('id');
  if ($quality === "quality: swill") {
    $(this).siblings('p').text("quality: plausible")
  }
  else if ($quality === "quality: plausible") {
    $(this).siblings('p').text("quality: genius")
  }
  else {
    $(this).siblings('p').text("quality: genius")
  }

})

$('.ideaCards').on('click', '.downvote', function() {
  var $quality = $(this).siblings('p').text();
  var $id = $(this).parents().siblings('.cardTop').attr('id');
  console.log($id)
  if ($quality === "quality: genius") {
    $(this).siblings('p').text("quality: plausible")
  }
  else if ($quality === "quality: plausible") {
    $(this).siblings('p').text("quality: swill")
  }
  else {
    $(this).siblings('p').text("quality: swill")
  }
})
