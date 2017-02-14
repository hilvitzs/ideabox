
$('.saveBtn').on('click', function() {
  var $titleInput = $('.userTitle').val();
  var $bodyInput = $('.userBody').val();
  var $uniqueId = event.timeStamp;
  $('.ideaCards').prepend(
    `<div class="ideaCard">
        <div class="cardTop" id="${$uniqueId}">
          <h2 class="ideaTitle" contenteditable="true">${$titleInput}</h2>
          <input class="deleteBtn icon" type="image" src="FEE-ideabox-icon-assets/delete.svg">
        </div>
        <p class="ideaBody" contenteditable="true">${$bodyInput}</p>
        <div class="cardBottom">
          <input class="upvote vote icon" type="image" src="FEE-ideabox-icon-assets/upvote.svg">
          <input class="downvote vote icon" type="image" src="FEE-ideabox-icon-assets/downvote.svg">
          <p class="quality">quality:
            <span class="quality qualityLevel">swill</span>
          </p>
        </div>
      </div>`)
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
