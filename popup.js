
let currentDate = new Date().toJSON().slice(0, 10);

const truncateNum = (num) => {
  return Math.trunc(num * 100) / 100;
}

const viewUsage = (currentUsage=[]) => {

  console.log("View usage:", currentUsage);

  if (currentUsage.length != []) {

    if(currentUsage[currentDate]) {
      document.getElementById("todayUsageText").innerHTML = truncateNum(currentUsage[currentDate] * 0.84);
    } else {  
      document.getElementById("todayUsageText").innerHTML = "0.0";
    }
    document.getElementById("lifetimeUsageText").innerHTML = truncateNum(currentUsage.AllTime * 0.84);
    document.getElementById("bottleEquivalentText").innerHTML = truncateNum(currentUsage[currentDate] * 0.84 / 16.9);
    document.getElementById("handEquivalentText").innerHTML = truncateNum(currentUsage[currentDate] * 0.84 / 67);
    
    
    document.getElementById("wav").setAttribute("style", "bottom: " + currentUsage[currentDate] * 20 + "px;");
    document.getElementById("blue").setAttribute("style", "height: " + (currentUsage[currentDate] + 1) * 20 + "px;");

  } else {
    usageElement.innerHTML = '<i class="row">No usage to show</i>';
  }

  return;
};


document.addEventListener("DOMContentLoaded", async () => {
    chrome.storage.sync.get(['Usage'], (data) => {
        const currentUsage = data['Usage'] ? JSON.parse(data['Usage']) : [];
        console.log("Current usage dom:", currentUsage);
        viewUsage(currentUsage);
    })
});