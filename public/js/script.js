$(function() {
  var images = [];
  var names = ["Mittens","Whiskers","Mr. Bojangles","Patches","Samuel","Randall","Pat","Nancy","Laura","Tina","Alonzo","Snow","Eben","Titan"];
  var chart;
  var Photo = function(url) {
    this.url = url;
    this.votes = 0;
    this.name = this.randomName();
  };
  //render expects a single Photo object from the images array
  Photo.prototype.render = function(photo) {
    var $td = $('<td></td>').text(photo.votes);
    var $th = $('<th></th>').text(photo.name);
    var $tr = $('<tr></tr>').append($th).append($td);
    return $tr[0];
  };
  Photo.prototype.randomName = function() {
    var arrayNum = Math.floor(Math.random() * names.length);
    var newName = names[arrayNum];
    names.splice(arrayNum, 1);
    return newName;
  }
  var sortedImages;
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
      $('#leftImage').html('<h1>'+ images[this.newLeftImage].name +'</h1><img src="' + images[this.newLeftImage].url + '" />');
      $('#rightImage').html('<h1>'+ images[this.newRightImage].name +'</h1><img src="' + images[this.newRightImage].url + '"/>');
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
  var getAJAXCats = function() {
    $.ajax({
      url: 'https://api.imgur.com/3/album/DDoWy/images',
      headers: {'Authorization': 'Client-ID f47ba00c94ba70d'}
    })
    .done(function(data) {
      console.log(data.data);
      data.data.forEach(function(image) {
        images.push(new Photo(image.link));
      });
      Tracker.newImages();
    });

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
  getAJAXCats();
  chart = new Chart(scoreChart).Pie(pieData, pieOptions);
  window.images = images;
  window.Tracker = Tracker;
});
