$(function() {
  var images = [];
  var names = ["Mittens","Whiskers","Mr. Bojangles","Patches","Samuel","Randall","Pat","Nancy","Laura","Tina","Alonzo","Snow","Eben","Titan"];
  var chart;
  var imagePaths = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg"];
  var Photo = function(url) {
    this.url = 'img/' + url;
    this.votes = 0;
    this.name = this.randomName();
  };
  //render expects a single Photo object from the images array
  Photo.prototype.render = function(photo) {
    var newTr = document.createElement('tr');
    var newTh = document.createElement('th');
    var newTd = document.createElement('td');
    newTh.textContent = photo.name;
    newTd.textContent = photo.votes;
    newTr.appendChild(newTh);
    newTr.appendChild(newTd);
    return newTr;
  };
  Photo.prototype.randomName = function() {
    var arrayNum = Math.floor(Math.random() * names.length);
    var newName = names[arrayNum];
    names.splice(arrayNum, 1);
    return newName;
  }
  var sortedImages;
  imagePaths.forEach(function(image) {
    images.push(new Photo(image));
  });
  var Tracker = {
    leftVotes: 0,
    rightVotes: 0,
    newLeftImage: 0,
    newRightImage: 0,
    randomImage: function() {
      return Math.floor(Math.random() * images.length);
    },
    newImages: function() {
      this.newLeftImage = this.randomImage();
      this.newRightImage = this.randomImage();
      while(this.newLeftImage === this.newRightImage) {
        this.newRightImage = this.randomImage();
      }
      $('#leftImage').html('<img src="' + images[this.newLeftImage].url + '" />');
      $('#rightImage').html('<img src="' + images[this.newRightImage].url + '"/>');
    },
    updateChart: function () {

      chart.segments[1].value = Tracker.leftVotes;
      chart.segments[0].value = Tracker.rightVotes;
      chart.update();
      this.sortImages(images);
      images.reverse();
      $('#KittyHoF').html('<tr><th>Kitty Name</th><th>Score</th><tr>');
      images.forEach(function (image) {
        $('#KittyHoF').append(image.render(image));
      });
    },
    //compare function from StackOverflow user Wogan http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
    sortImages: function (images) {
      images.sort(function(a,b) {
        if (a.votes < b.votes) {
          return -1;
        }
        if (a.votes > b.votes) {
          return 1;
        }
        return 0;
      });
    }
  };
  var scoreChart = document.getElementById('scoreChart').getContext('2d');
  var pieData = [
    {
      value : 1,
      color : "#FF0000",
      highlight: "#555555",
      label: "Right Kittens"
    },
    {
      value : 1,
      color : "#0000FF",
      highlight: "#555555",
      label: "Left Kittens"
    }
  ];
  var pieOptions = {
    segmentShowStroke : false,
    animateScale : false
  }
  chart = new Chart(scoreChart).Pie(pieData, pieOptions);
  Tracker.newImages();
  window.images = images;
  window.Tracker = Tracker;
});
