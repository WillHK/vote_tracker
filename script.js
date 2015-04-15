document.addEventListener("DOMContentLoaded", function() {
  var images = [];
  var imagePaths = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg"];
  var Photo = function(url) {
    this.url = 'img/' + url;
    this.votes = 0;
  };
  imagePaths.forEach(function(image) {
    images.push(new Photo(image));
  });
  var Tracker = {
    leftVotes: 0,
    rightVotes: 0,
    randomImage: function() {
      return images[Math.floor(Math.random() * images.length)];
    },
    newImages: function() {
      var leftImage = document.getElementById("leftImage");
      var rightImage = document.getElementById("rightImage");
      var newLeftImage = this.randomImage();
      var newRightImage = this.randomImage();
      while(newLeftImage === newRightImage) {
        newRightImage = this.randomImage();
      }
      leftImage.innerHTML = '<img src="' + newLeftImage.url + '" />';
      rightImage.innerHTML = '<img src="' + newRightImage.url + '"/>';
    },
    voteLeft: function() {
      this.leftVotes++;
      var leftScore = document.getElementById('leftScore');
      leftScore.textContent = this.leftVotes;
    },
    voteRight: function() {
      this.rightVotes++;
    },
    updateChart: function () {
    var chart;
    pieData[0].value = Tracker.leftVotes;
    pieData[1].value = Tracker.rightVotes;
    chart = new Chart(scoreChart).Pie(pieData, pieOptions);
  }
  };
  var scoreChart = document.getElementById('scoreChart').getContext('2d');
  var pieData = [
    {
      value : 20,
      color : "#878BB6"
    },
    {
      value : 40,
      color : "#4ACAB4"
    }
  ];
  var pieOptions = {
    segmentShowStroke : false,
    animateScale : false
  }
  Tracker.newImages();
  Tracker.updateChart();
  window.Tracker = Tracker;
});
