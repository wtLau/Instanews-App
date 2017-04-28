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
      $.each(data.results, function( index,value ){
      newsDisplayed += '<li><img src="'+value.multimedia[1]+'"/>'+  value.url+ value.abstract +'</li>'
    });
    $('.news').append(newsDisplayed);
    }).fail(function(){
        $('.news').append('<li>Sorry theres a problem!</li>');
      }).always(function(){
        $('#loader').remove();
      })
   })
});