$(document).ready(() => {
  const checkbox = $("input[type='checkbox']");
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
});
