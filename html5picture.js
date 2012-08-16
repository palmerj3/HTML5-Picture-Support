var HTML5Picture = function(args) {
  this.pictureNodes = this.getPictureNodes();
  this.mediaQueryToSourceNodes = {};
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

HTML5Picture.prototype.onMediaQueryMatch = function onMediaQueryMatch(mql) {
  var matchingNodes = this.mediaQueryToSourceNodes[mql.media],
      matchingNodesLength = matchingNodes.length,
      i,
      matchingNode;
      
  for (i = 0; i < matchingNodesLength; i++) {
    matchingNode = matchingNodes[i];
    
    matchingNode.img.src = matchingNode.src;
  }
};

HTML5Picture.prototype.initializePictureNode = function initializePictureNode(node) {
  var sourceChildren = node.getElementsByTagName('source'),
      imgChildren = node.getElementsByTagName('img'),
      imgElem = null,
      imgLength = imgChildren.length,
      sourceElem,
      sourceIndex,
      sourceLength = sourceChildren.length,
      mql;
  
  // Ensure picture node has an IMG element
  if (imgLength < 1) {
    imgElem = document.createElement('img');
    node.appendChild(imgElem);
  } else {
    imgElem = imgChildren[0];
  }
  
  // Build index and attach listeners for media query matches
  for (sourceIndex = 0; sourceIndex < sourceLength; sourceIndex++) {
    sourceElem = sourceChildren[sourceIndex];
    mql = window.matchMedia('(' + sourceElem.media + ')');
        
    if (mql.media !== 'invalid') {      
      if (this.mediaQueryToSourceNodes[mql.media] === undefined) {
        this.mediaQueryToSourceNodes[mql.media] = [];
      }
      
      this.mediaQueryToSourceNodes[mql.media].push({
        img : imgElem,
        src : sourceElem.src
      });

      if (mql.matches === true) {
        this.onMediaQueryMatch(mql);
      }
      
      mql.addListener(this.onMediaQueryMatch.bind(this));
    }
  }
};