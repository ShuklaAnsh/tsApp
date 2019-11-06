interface Campaign {
    id : string,
    name : string,
    worldTime : Date,
    description ?: string,
    userId ?: string
}

/**
 * Generates the campaign card DOMs
 * @param {Campaign[]} campaigns - campaigns recieved from server
 */
function generateCards(campaigns : Campaign[]){
    var addCardButton: HTMLDivElement = <HTMLDivElement>document.getElementById('add-button');
    var id = 0;
    campaigns.forEach(campaign => {
        var card: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        card.className = 'campaign-card';
        card.id = 'campaign-card-' + id;
        
        // name
        var name: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        name.className = 'campaign-card-name';
        name.id = 'campaign-card-name-' + id;
        name.innerText = campaign.name;
        

        // world time
        var worldTime: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        worldTime.className = 'campaign-card-world-time';
        worldTime.id = 'campaign-card-world-time-' + id;
        //TODO format Date
        worldTime.innerHTML = "<p><span>World Time: </span>" + campaign.worldTime.toString() + "</p>";
        card.appendChild(worldTime);
        
        card.appendChild(name);
        // description
        if(campaign.description != undefined){
            var description: HTMLDivElement = <HTMLDivElement>document.createElement('div');
            description.className = 'campaign-card-description';
            description.id = 'campaign-card-description-' + id;
            description.innerText = campaign.description;
            card.append(description);
            // card.appendChild(description);
        }
        card.appendChild(worldTime);

        card.onclick = () => {
            var getReq : string = '/campaign/' + campaign.id + '&' + campaign.name;
            window.location.href = getReq;
        };
        
        addCardButton.before(card);
        id++;
    });
}

function openCreateCampaginForm(){
    document.getElementById('create-campaign-form-container')!.style.display = 'flex';
}

function cancelCreateCampaign(){
    document.getElementById('create-campaign-form-container')!.style.display = 'none';
}
