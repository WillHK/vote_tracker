$(function() {
  var Tracker = window.Tracker;
  var images = window.images;
  var updateChart = window.updateChart;
  $('#leftSide').on('click', function(e) {
    Tracker.leftVotes++;
    $('#leftScore').text(Tracker.leftVotes);
    images[Tracker.newLeftImage].votes++;
    Tracker.newImages();
    Tracker.updateChart();
  });
  $('#rightSide').on('click', function(e) {
    Tracker.rightVotes++;
    $('#rightScore').text(Tracker.rightVotes);
    images[Tracker.newRightImage].votes++;
    Tracker.newImages();
    Tracker.updateChart();
  });
});
