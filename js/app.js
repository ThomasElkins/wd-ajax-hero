(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  $('button').click(function() {
      event.preventDefault();
      movies.length = 0;
      if ($('#search').val()) {
        var searchedMovie = $('#search').val()
        $.get("http://www.omdbapi.com/?s=" + searchedMovie + "&apikey=702b3bb5", function(data) {
          var searchArr = data["Search"]

          for (var i = 0; i < searchArr.length; i++) {
            var movieObj = {};
            movieObj["id"] = searchArr[i]["imdbID"];
            movieObj["poster"] = searchArr[i]["Poster"];
            movieObj["title"] = searchArr[i]["Title"];
            movieObj["year"] = searchArr[i]["Year"]
            movies.push(movieObj);
                var mPlot = searchArr[i]["imdbID"]
                $.get("http://www.omdbapi.com/?i=" + mPlot +"&apikey=702b3bb5", function(plotData){
                  var moviePlots = {};
                  moviePlots["plot"] = plotData["Plot"];
                  console.log(moviePlots);
                  renderMovies();
                  movies.push(moviePlots);
                })
                renderMovies();
          }
        });
      }
    });

})();
