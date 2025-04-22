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
