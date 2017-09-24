var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
  	var countryName = $('#country-name').val();
    if(!countryName.length) countryName = 'Poland';
    $.ajax({
  		url: url + countryName,
  		method: 'GET',
  		success: showCountriesList
  	});
}

function showCountriesList(resp) {
  countriesList.empty();
  resp.forEach(function(item) {
      $('<li>').html('<h3>' + item.name + '</h3>'
                            + "<img src='" + item.flag + "'/>"
                            + '<p>Capital: ' + item.capital +  '</p>'
                            + '<p>Region: ' + item.region +  '</p>'
                            + '<p>Population: ' + item.population +  '</p>'
                            + '<p>Currency: ' + item.currencies[0].name + ", " + item.currencies[0].code + '</p>').appendTo(countriesList);
  });
}
