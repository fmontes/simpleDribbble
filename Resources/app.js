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
  backgroundColor: '#eee',
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
  for (var i = 0; i < shots.lenght; i++) {
    var thumb = Ti.UI.createImageView({
        image: shots[i].image_teaser_url,
        lageImage: shots[i].image_url,
        player: shots[i].player,
        height: 150,
        top: 1 * 170,
    });
    scroll.add(thumb);
  }
}