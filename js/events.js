document.addEventListener("DOMContentLoaded", function() {
  var Tracker = window.Tracker;
  var updateChart = window.updateChart;
  var leftSide = document.getElementById('leftSide');
  var rightSide = document.getElementById('rightSide');
  leftSide.addEventListener('click', function() {
    Tracker.leftVotes++;
    var leftScore = document.getElementById('leftScore');
    leftScore.textContent = Tracker.leftVotes;
    Tracker.newImages();
    Tracker.updateChart();
  });
  rightSide.addEventListener('click', function() {
    Tracker.rightVotes++;
    var rightScore = document.getElementById('rightScore');
    rightScore.textContent = Tracker.rightVotes;
    Tracker.newImages();
    Tracker.updateChart();
  });
});
