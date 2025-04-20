console.log("loaded");

let currentDate = new Date().toJSON().slice(0, 10);
console.log(currentDate);

const fetchUsage = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['Usage'], (obj) => {
            resolve(obj['Usage'] ? JSON.parse(obj['Usage']) : []);
        });
    });
};

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    increaseUsage();
    chrome.runtime.sendMessage('buttonClicked');
  }
});

const increaseUsage = async () => {
    let currentUsage = await fetchUsage();

    if(currentUsage == []) {
      chrome.storage.sync.set({ ['Usage']: JSON.stringify({Today: 1, AllTime: 1}) });
    } else if (currentDate in currentUsage) {

      const newUsageToday = currentUsage[currentDate] + 1;
      const newUsageAllTime = currentUsage.AllTime + 1;

      chrome.storage.sync.set({ ['Usage']: JSON.stringify({[currentDate]: newUsageToday, AllTime: newUsageAllTime}) });
    } else {

      console.log("new date");
      const newUsageAllTime = currentUsage.AllTime + 1;

      chrome.storage.sync.set({ ['Usage']: JSON.stringify({[currentDate]: 1, AllTime: newUsageAllTime}) });
    }
};




/*console.log("Content script loaded!");

const button = document.querySelector('#composer-submit-button');

button.addEventListener("click", () => alert("working"), false);

function myFunction(div_id) {
    console.log('makes div invisible');
    document.getElementById(div_id).style.display = 'none';
    return;
};

console.log(button);

if (!button) {
    console.log("Button not found!");
} else {
    console.log("Button found!");
}

*/
/*
setTimeout(function() {
    // Code to be executed after the delay

const targetNode = document.querySelector('.@thread-xl/thread:pt-header-height'); // Replace with your div's ID

console.log(targetNode);

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if nodes were added
      if (mutation.addedNodes.length > 0) {
        console.log('Nodes were added to the div:', mutation.addedNodes);
        // Perform actions on the added nodes here
      }
    }
  }
};

// Create a new observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// To stop observing, use:
// observer.disconnect();

}, 10000);

*/
