var jsonLink = 'https://api.myjson.com/bins/vbhia';

$(function() {
  'use strict';

  resetContent();

  $('#search').on('keyup', function() {
    $('.row').html('');
    var input = this.value.toLowerCase();
    $.getJSON(jsonLink, function(data) {
      var deck = '';
      $.each(data, function(key, val) {
        if (val.name.toLowerCase().indexOf(input) > -1) {
          deck += addCard(val.name, val.link, val.logo);
          $('.row').html(deck);
        } else if (input == '') {
          resetContent();
        }
      });
    });
  });
});

function addCard(name, link, logo) {
  return `<div class="col s3">
  <a href="${link}" class="card waves-effect w-100" target="_blank">
    <div class="card-image">
      <img src="${logo}" alt="${name}" class="m-auto responsive-img">
    </div>
    <div class="card-content">
      <span class="card-title uppercase black-text">${name}</span>
    </div>
  </a>
</div>`;
}

function resetContent() {
  $.getJSON(jsonLink, function(data) {
    var deck = '';
    $.each(data, function(key, val) {
      deck += addCard(val.name, val.link, val.logo);
      $('.row').html(deck);
    });
  });
}