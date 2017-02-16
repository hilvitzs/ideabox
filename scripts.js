window.onload = function() {
  displayOnPageLoad();
}

$('.search').on('keyup', function() {
  $('.search').submit();
  var searchValue = $('.search').val().toLowerCase();
  var ideas = $('section').children('.ideaCard');
    // console.log(searchValue);
  ideas.each(function(i, idea) {
  var ideaText = $(idea).text().toLowerCase();
  var matched = ideaText.indexOf(searchValue) !== -1;
  $(idea).toggle(matched);
  });
});

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
    `<div class="ideaCard" id="${parsedIdea.id}">
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
  $(this).parents('.ideaCard').remove('.ideaCard');
  var $id = $(this).parents('.ideaCard').attr('id');
  localStorage.removeItem($id);
  });
}

$('.ideaCards').on('click', '.upvote', function() {
  var $quality = $(this).siblings('p').text();
  if ($quality === "quality: swill") {
    $(this).siblings('p').text("quality: plausible");
    $quality = "quality: plausible"
    updateQuality(this, $quality);
  }
  else if ($quality === "quality: plausible") {
    $(this).siblings('p').text("quality: genius")
    $quality = "quality: genius";
    updateQuality(this, $quality)
  }
})

$('.ideaCards').on('click', '.downvote', function() {
  var $quality = $(this).siblings('p').text();
  var $id = $(this).parents().siblings('.cardTop').attr('id');

  if ($quality === "quality: genius") {
    $(this).siblings('p').text("quality: plausible")
    $quality = "quality: plausible";
    updateQuality(this, $quality);
  }
  else if ($quality === "quality: plausible") {
    $(this).siblings('p').text("quality: swill")
    $quality = "quality: swill"
    updateQuality(this, $quality);
  }
})

function updateQuality(location, newQuality) {
    var $id = $(location).parent().parent('.ideaCard').attr('id');
    var grabObject = JSON.parse(localStorage.getItem($id));
    grabObject.quality = newQuality;
    localStorage.setItem($id, JSON.stringify(grabObject));
}
