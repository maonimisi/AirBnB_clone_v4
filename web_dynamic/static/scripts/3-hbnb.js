function fillArticle (data, _) {
  const placesSection = $('section.places');
  for (const place of data) {
    const articleTag = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
        <div class="information">
          <div class="max_guest">
          <div class="icon"></div>
          ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
          </div>
          <div class="number_rooms">
          <div class="icon"></div>
          ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
          </div>
          <div class="number_bathrooms">
          <div class="icon"></div>
          ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
          </div>
        </div>
        <div class="description">
        ${place.description}
        </div>
      </article>
      `;
    placesSection.append(articleTag);
  }
}

function docReady () {
  const checkbox = $("input[type='checkbox']");
  const apiStatus = $('div#api_status');
  const jsonPost = {};

  let amenityIds = [];
  let amenityNames = [];

  checkbox.click(function () {
    const newId = $(this).attr('data-id');
    const newName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenityIds.push(newId);
      amenityNames.push(newName);
    } else {
      amenityIds = amenityIds.filter((id) => id !== newId);
      amenityNames = amenityNames.filter((name) => name !== newName);
    }
    $('.amenities h4').text(amenityNames.sort().join(', '));
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') { apiStatus.addClass('available'); } else { apiStatus.removeClass('available'); }
  });

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: JSON.stringify(jsonPost),
    contentType: 'application/json',
    success: fillArticle
  });
}

$(document).ready(docReady);
