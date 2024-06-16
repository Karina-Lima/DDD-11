document.getElementById('search-button').addEventListener('click', function() {
    clearHighlights();
    const input = document.getElementById('search-bar');
    const words = input.value.trim();
    if (words) {
      highlightText(words);
    }
  });
  
  function highlightText(text) {
    const bodyText = document.body;
    const searchRegex = new RegExp(`(${text})`, "gi");  // Use capturing group to preserve the text
  
    let nodes = [];
    const walker = document.createTreeWalker(bodyText, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
  
    nodes.forEach(node => {
      if (searchRegex.test(node.nodeValue)) {
        const spanWrapper = document.createElement('span');
        node.parentNode.replaceChild(spanWrapper, node);
        node.nodeValue.split(searchRegex).forEach((part, index, array) => {
          if (index % 2 === 0) {  // Non-matching text
            spanWrapper.appendChild(document.createTextNode(part));
          } else {  
            const highlight = document.createElement('span');
            highlight.classList.add('highlight');
            highlight.textContent = part;
            spanWrapper.appendChild(highlight);
          }
        });
      }
    });
  }
  
  function clearHighlights() {
    const highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach(node => {
      const textNode = document.createTextNode(node.textContent);
      node.parentNode.replaceChild(textNode, node);
    });
  }
  