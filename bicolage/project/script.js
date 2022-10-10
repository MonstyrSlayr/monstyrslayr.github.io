class Source
{
    constructor(link, type)
    {
        this.link = link;
        this.type = type;
    }
}

let srcArr =
[
    //Before


    //Afro Past
    new Source("img/1-0.jpg",       "img"),
    new Source("audio/centralPark.wav",             "aud"),
    new Source("img/1-1.jpg",       "img"),
    new Source("img/1-2.jpg",       "img"),
    new Source("audio/centralParkAmbiance.wav",     "aud"),
    new Source("img/1-3.jpg",       "img"),
    new Source("img/1-4.jpg",       "img"),
    new Source("audio/123802.wav",                  "aud"),
    new Source("img/1-5.jpg",       "img"),
    new Source("img/1-6.jpg",       "img"),
    new Source("audio/125208.wav",                  "aud"),
    new Source("img/1-7.jpg",       "img"),
    new Source("audio/125237.wav",                  "aud"),
    new Source("img/1-8.jpg",       "img"),
    new Source("img/1-9.jpg",       "img"),
    new Source("audio/130139.wav",                  "aud"),
    new Source("img/1-10.jpg",      "img"),
    new Source("img/1-11.jpg",      "img"),
    new Source("audio/130154.wav",                  "aud"),
    new Source("img/1-12.jpg",      "img"),
];

//randomize image order
//shuffle(srcArr);
//NEVERMIND!!!! !

let sounds = [];

let imgDiv = document.getElementById("amstudImgs");

for (var i = 0; i < srcArr.length; i++)
{
    switch (srcArr[i].type)
    {
        case "img":
        {
            let newImg = document.createElement("img");

            newImg.src = srcArr[i].link;
            newImg.className = "amstudImg";
            newImg.style.width = 25 + (Math.random() * 25) + "vh";

            imgDiv.append(newImg);

            break;
        }

        case "txt":
        {
            let newTxt = document.createElement("div");

            newTxt.className = "amstudImg";
            newTxt.style.width = 50 + "vh";

            newTxt.innerHTML = srcArr[i].link;

            imgDiv.append(newTxt);
            break;
        }

        case "aud":
        {
            let newAud = document.createElement("button");

            newAud.className = "amstudImg";
            newAud.style.width = 20 + "vh";
            newAud.style.height = 20 + "vh";
            newAud.innerHTML = "Click to play audio";
            newAud.snd = srcArr[i].link;
            newAud.id = sounds.length;
            sounds.push(new Howl
                ({
                    src: newAud.snd,
                    html5: true,
                }));

            newAud.onclick = function()
            {
                for (var j = 0; j < sounds.length; j++)
                {
                    sounds[j].stop();
                }
                sounds[newAud.id].play();
            }

            imgDiv.append(newAud);
            break;
        }
    }
}

let cityArr =
[
    //After
    new Source("img/2-0.jpg",       "img"),
    new Source("img/2-1.jpg",       "img"),
    new Source("img/2-2.jpg",       "img"),
    new Source("img/2-3.jpg",       "img"),
    new Source("img/2-4.jpg",       "img"),
    new Source("<p>\“You go to these lands and take dominion on those lands and the savages that live on these lands and you are to convert the savages to Christianity,” said Zunigha, summarizing the practical implementation of the doctrine. “Those that won't convert, you kill.\”</p>",
                        "txt"),
    new Source("img/2-5.jpg",       "img"),
    new Source("img/2-6.jpg",       "img"),
    new Source("img/2-7.jpg",       "img"),
    new Source("img/2-8.jpg",       "img"),
    new Source("img/2-9.jpg",       "img"),
    new Source("img/2-10.jpg",      "img"),
    new Source("<p>Charles Dickens, American Notes for General Circulation (1842):</p> <p>\"There is one quarter, commonly called the Five Points, which in respect of filth and wretchedness, may be safely backed against Seven Dials, or any other part of famed St. Gile’s [a London slum]... These narrow ways, diverging to the right and left, and reeking everywhere with dirt and filth. Such lives as are led here, bear the same fruits here as elsewhere. The coarse and bloated faces at the doors, have counterparts at home, and all the wide world over. Debauchery has made the very houses prematurely old. See how the rotten beams are tumbling down, and how the patched and broken windows seem to scowl dimly, like eyes that have been hurt in drunken frays. Many of those pigs live here. Do they ever wonder why their masters walk upright in lieu of going on all fours? and why they talk instead of grunting?\"</p>",
                        "txt"),
    new Source("img/2-11.jpg",      "img"),
    new Source("img/2-12.jpg",      "img"),
    new Source("img/2-13.jpg",      "img"),
    new Source("img/2-14.jpg",      "img"),
    new Source("<p>Rcvd. 7 November 1626</p> <p>High and Mighty Lords, Yesterday the ship the Arms of Amsterdam arrived here. It sailed from New Netherland out of the Hudson River on the 23rd of September. They report that our people are in good spirits and live in peace. The women also have born some children there. They have purchased the Island of Manhattan from the Natives for the value of 60 . It is about 22,000 acres in size. They had all their grain sowed by the middle of May and harvested by the middle of August. They sent samples of these summer grains: wheat, rye, barley, oats, buckwheat, canary seed, beans and flax. The cargo of the aforesaid ship is:</p> <ul> <li>7246 Beaver skins</li> <li>178½ Otter skins</li> <li>675 Otter skins</li> <li>48 Mink skins</li> <li>36 Lynx skins</li> <li>33 Minks</li> <li>34 Muskrat skins</li> </ul> <p>Many oak timbers and nut wood. Herewith, High and Mighty Lords, be commended to the mercy of the Almighty, In Amsterdam, the 5th of November, 1626.</p> <p>Your High and Mightinesses' obedient,</p> <p>P. Schaghen</p>",
                        "txt"),
    new Source("img/2-15.jpg",      "img"),
    new Source("img/2-16.jpg",      "img"),
]

let cityHeight = 100; //in vh
let cityOffset = 0; //in vh
let cityAppearFactor = 0.7; //as exponent

let cityDiv = document.getElementById("cityImgs");

for (var i = 0; i < cityArr.length; i++)
{
    switch (cityArr[i].type)
    {
        case "img":
        {
            let newImg = document.createElement("img");

            newImg.src = cityArr[i].link;
            newImg.className = "cityImg";
            newImg.style.width = 25 + (Math.random() * 25) + "vh";

            cityDiv.append(newImg);

            break;
        }

        case "txt":
        {
            let newTxt = document.createElement("div");

            newTxt.className = "cityImg";
            newTxt.style.width = 40 + "vw";

            newTxt.innerHTML = cityArr[i].link;

            cityDiv.append(newTxt);
            break;
        }
    }
}

function shuffle(array)
{
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}