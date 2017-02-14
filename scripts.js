
$('.saveBtn').on('click', function() {
  var $titleInput = $('.userTitle').val();
  var $bodyInput = $('.userBody').val();
  console.log($titleInput);
  $('.ideaCards').prepend(
    `<div class="ideaCard">
        <div class="cardTop">
          <h2 class="ideaTitle">${$titleInput}</h2>
          <input class="deleteBtn icon" type="image" src="FEE-ideabox-icon-assets/delete.svg">
        </div>
        <p class="ideaBody">${$bodyInput}</p>
        <div class="cardBottom">
          <input class="upvote vote icon" type="image" src="FEE-ideabox-icon-assets/upvote.svg">
          <input class="downvote vote icon" type="image" src="FEE-ideabox-icon-assets/downvote.svg">
          <p class="quality">quality:
            <span class="quality">swill</span>
          </p>
        </div>
      </div>`)
  clearFields();
});

$('.ideaCards').on('click', '.deleteBtn', function() {
  $(this).parents().remove('.ideaCard');
});

function clearFields() {
  $('.userTitle').val("")
  $('.userBody').val("");
}
