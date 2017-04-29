$(function (){

  $('#selections').on('change', function(event){
    $('.loader').before('<img src="images/ajax-loader.gif" id="loader" alt="ajax-loader"/>')
    event.preventDefault();
    $('.news').empty();
    var newsType = this.value;
    var newsDisplayed = '';
    var url = 'https://api.nytimes.com/svc/topstories/v2/'+newsType+'.json';
    url += '?' + $.param({
      'api-key': '42d06aecd02547e4928b57cbcaa6b5fa'
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
        var imagesTrue = data.results.filter(function(imagesFilter){
      return imagesFilter.multimedia.length;
    }).slice(0,12)
    $.each(imagesTrue, function(index, value){
      newsDisplayed += '<li class="listed-news"><img src="' + value.multimedia[4].url + '"/>' + value.abstract + '</li>'
    })    
    $('.news').append(newsDisplayed);
    }).fail(function(){
        $('.news').append('<li>Sorry theres a problem!</li>');
      }).always(function(){
        $('#loader').remove();
      })
  })
});