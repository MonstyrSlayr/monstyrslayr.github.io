import {getCookie, setCookie} from "./utils.js";

class Update
{
    constructor (updateName, desc)
    {
        this.updateName = updateName;
        this.desc = desc;
    }
}

let updates =
[
    new Update("Game Release", ["The game has been released!"]),
    new Update("Duplicate Symbol Log", ["Added a duplicate symbol log. Some symbols have exactly the same stats, hopefully the log will clarify that. A notification will show up when you submit a duplicate symbol.", "Also added update emails. These emails should disappear when you reload, but if they keep popping up, be sure to message me!"]),
    new Update("Saving Game Progress", ["In preparation for the Daily, your game will save when you reload the page now :) be sure to report any bugs"]),
]

export let emailUpdates = [];

for (var i = 0; i < updates.length; i++)
{
    var daUpdate = updates[i];
    var isUpdate = getCookie("update" + daUpdate.updateName.toLowerCase().replace(/\s/g, ''), false);

    if (isUpdate == "")
    {
        emailUpdates.push(daUpdate);
        setCookie("update" + daUpdate.updateName.toLowerCase().replace(/\s/g, ''), "true", 365, false);
    }
}

if (getCookie("darkMode", false) == "")
{
    setCookie("darkMode", "light", 365, false);
}