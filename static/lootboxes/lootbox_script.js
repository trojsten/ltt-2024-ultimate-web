document.addEventListener("DOMContentLoaded", () => {
    const waiting_time = 1000;
    let click_counter = 0;
    chest_ready_for_click = true;

    function chest_clicked(){
        if (!chest_ready_for_click) return;

        chest_ready_for_click = false;
        setTimeout(() => { chest_ready_for_click = true }, waiting_time);

        click_counter++;
        if (click_counter >= 3){
            openChest();
            setTimeout(displayOverlay, waiting_time * 4);
        }
        else {
            shakeChest();
            setTimeout(resetChest, waiting_time);
        }
    }

    function setOverlayText(text){
        document.getElementById("lootbox-reward-overlay-text").innerHTML = text;
    }

    function setOverlayPicture(address){
        document.getElementById("lootbox-reward-overlay-picture").src = address;
    }

    function updateOverlayText(reward){
        let rewardType = reward.lootboxType;
        let rewardValue = reward.itemValue;
        if (rewardType == "lootbox"){
            if (rewardValue == 1) setOverlayText("Vyhrávaš 1 lootbox!");
            else if (rewardValue <= 3) setOverlayText("Vyhrávaš " + rewardValue + " lootboxy!");
            else setOverlayText("Vyhrávaš " + rewardValue + " lootboxov!");
            setOverlayPicture("/static/chest.png");
        }
        else if (rewardType == "money"){
            setOverlayPicture("/static/money_bag.png")
            setOverlayText("Vyhrávaš peniaze! (" + rewardValue + ")");

            if (rewardValue >= 10){ // Uncommon
                document.getElementById("lootbox-reward-overlay-text").style.color = "silver";
            }
            if (rewardValue >= 100){ // Rare
                document.getElementById("lootbox-reward-overlay-text").style.color = "gold";
            }
            if (rewardValue >= 1000){ // Legendary
                document.getElementById("lootbox-reward-overlay-text").style.color = "purple";
            }
        }
        else if (rewardType == "nothing"){
            setOverlayPicture("/static/pou.png");
            setOverlayText("Smola, nič nedostaneš! Hehe!")
        }
        else {
            let imageLink = reward.imageLink;
            setOverlayPicture(imageLink);
            setOverlayText("Wow, vyhrávaš predmet: " + rewardType + "!");

            if (rewardValue >= 1){ // Uncommon
                document.getElementById("lootbox-reward-overlay-text").style.color = "silver";
            }
            if (rewardValue >= 2){ // Rare
                document.getElementById("lootbox-reward-overlay-text").style.color = "gold";
            }
            if (rewardValue == 3){ // Legendary
                document.getElementById("lootbox-reward-overlay-text").style.color = "purple";
            }
        }
    }

    function displayOverlay(){
        document.getElementById("lootbox-reward-overlay").style.display = "flex";
        document.getElementById("lootbox-reward-overlay").style.opacity = "1";
    }
    
    function getReward(){
        const data = new FormData();
        //data.set();

        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/shop/reward', true);
        xhr.send(data);
        xhr.onload = () => {
            let reward = JSON.parse(xhr.responseText);
            console.log(reward);
            updateOverlayText(reward);
        }
    }

    document.getElementById("chest-wrap").onclick = chest_clicked;
    document.getElementById("lootbox-reward-overlay").onclick = () => { location.href = "/" };

    getReward();
})
