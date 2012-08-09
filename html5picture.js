function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return ('PIC' + S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var HTML5Picture = function(args) {

};

HTML5Picture.prototype.init = function init(args) {
  var pictureNodes = this.getPictureNodes(),
      pictureNodesLength = pictureNodes.length,
      i;

  for (i = 0; i < pictureNodesLength; i++) {
    this.initializePictureNode(pictureNodes[i]);
  }  
};

HTML5Picture.prototype.getPictureNodes = function getPictureNodes() {
  return document.getElementsByTagName('picture');
};

HTML5Picture.prototype.initializePictureNode = function initializePictureNode(node) {
  var sourceChildren = node.getElementsByTagName('source'),
      imgChildren = node.getElementsByTagName('img'),
      imgIndex,
      imgLength = imgChildren.length,
      sourceElem,
      sourceIndex,
      sourceLength = sourceChildren.length,
      mql,
      img,
      styleNode,
      pictureAlt = node.getAttribute('alt');
  
  
  for (imgIndex = 0; imgIndex < imgLength; imgIndex++) {
    imgChildren[imgIndex].style.display = 'none';
  }
  
  for (sourceIndex = 0; sourceIndex < sourceLength; sourceIndex++) {
    sourceElem = sourceChildren[sourceIndex];
    mql = window.matchMedia('(' + sourceElem.media + ')');
        
    if (mql.media !== 'invalid') {
      console.log(mql);
      
      // Create IMG element next to source element, set display to none, give unique id
      img = document.createElement('img');
      img.id = guidGenerator();
      img.src = sourceElem.src;
      img.alt = pictureAlt;
      img.style.display = 'none';
      sourceElem.parentNode.appendChild(img);
      
      // Write CSS media query to stylesheet, flag unique ID as display block (or whatever display for neighbor source block is)
      styleNode = document.createElement('style');
      styleNode.type = 'text/css';
      styleNode.innerHTML = '@media ' + mql.media + ' { #' + img.id + ' { display: block !important; } }';
      document.getElementsByTagName('head')[0].appendChild(styleNode);
    }
  }
};