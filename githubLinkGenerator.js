const = GITHUB_URL = 'https://github.com/appogeehr/appogeehr/compare/'

let getParameterByName = function(name) {
    // yoinked from Stack Overflow as didnt want to use Jquery
    url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let addTextToElement = function(element, insertText, linkTextBox) {
  // yoinked from Stack Overflow as didnt want to use Jquery
  // pastes text into the provided elemtent without loosing place

  if (linkTextBox){
      element.value = insertText
      return
  }
  let originalContent = element.innerHTML;

  let selection = document.getSelection();
  let range = selection.getRangeAt(0);

  let originalStart = range.startOffset;
  let originalEnd = range.endOffset;

  let front = originalContent.substring(0, originalStart);
  let back = originalContent.substring(originalEnd, originalContent.length);

  element.innerHTML = front + insertText + back;
}

let pasteGithubLink = function () {
    // Get the Jira issue number and then build the github link...
    let jiraIssueNum = getParameterByName('selectedIssue');
    let githubLink = '' + jiraIssueNum;

    // Not currenlty working in Jira, jira issue. Not mine :)
    let jiraTextLink = '[Github|'+githubLink+']';

    // Get the <p> element by the activeElements...
    let textBox = document.activeElement.getElementsByTagName('p')[0];
    let linkTextBox = false;

    if (!textBox) {
        textBox = document.activeElement;
        linkTextBox = true;
    }

    // Render this link to the page...
    addTextToElement(textBox, githubLink, linkTextBox);
}
chrome.extension.onMessage.addListener(function (message, sender, callback) {
    // Listen for the callback from the background script and then call the function...
    if (message.functiontoInvoke == "pasteGithubLink") {
        pasteGithubLink();
    }
});
