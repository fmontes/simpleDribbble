// Doing the request
var jsonObject,
    shots,
    myRequest = Ti.Network.createHTTPClient({
      onload: function(e) {
        jsonObject = JSON.parse(this.responseText);
        shots = jsonObject.shots;
        loadThumbnails();
      },
      onerror: function(e) {
        console.log(e.error);
      },
      timeout: 5000
    })

myRequest.open('GET', 'http://api.dribbble.com/shots/popular');
myRequest.send();




// Creatint the layout
var nav = Ti.UI.createWindow({
  backgroundColor: '#eee'
});

var content = Ti.UI.createWindow({
  backgroundColor: '#f2f2f2',
});

var splitWin = Ti.UI.iPad.createSplitWindow({
  masterView: nav,
  detailView: content,
  showMasterInPortrait: true,
});

splitWin.open();




// Creating the thumbnails
var scroll = Ti.UI.createScrollView({
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
});
nav.add(scroll);

function loadThumbnails() {
  for (var i = 0; i < shots.length; i++) {
    var thumb = Ti.UI.createImageView({
        image: shots[i].image_teaser_url,
        largeImage: shots[i].image_url,
        player: shots[i].player,
        height: 150,
        top: i * 170,
    });
    thumb.addEventListener('touchstart', function(e) {
      mainImage.image = e.source.largeImage;
      popover.title = e.source.player.name;
      profilePic.image = e.source.player.avatar_url;
      twitterName.text = e.source.player.twitter_screen_name;
      location.text = e.source.player.location;
    })
    scroll.add(thumb);
  }
}



// Creating main image
var mainImage = Ti.UI.createImageView({
  width: 400,
  height: 300,
});
content.add(mainImage);




// Adding the popover
var popover = Ti.UI.iPad.createPopover({
  width: 250,
  height: 110,
  arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN
});

mainImage.addEventListener('touchstart', function(e) {
  popover.show({
    view: mainImage
  })
})

var profilePic = Ti.UI.createImageView({
  width: 80,
  height: 80,
  left: 0,
})

var twitterName = Ti.UI.createLabel({
  width: 140,
  left: 120,
  color: '#fff',
  font: {fontSize: 16},
  top: 30,
  height: 30
})

var location = Ti.UI.createLabel({
  color: '#fff',
  font: {fontSize:16},
  left: 120,
  width: 140,
  top: 60,
  height: 30
})

popover.add(profilePic);
popover.add(twitterName);
popover.add(location);