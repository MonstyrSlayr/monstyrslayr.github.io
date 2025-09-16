import { classConditionals, rarityConditionals } from "../script.js";

for (const daDiv of document.getElementsByClassName("conditionalDropdown"))
{
    const daDropdown = document.createElement("ul");
    daDiv.appendChild(daDropdown);
        
        const rarityDropdown = document.createElement("li");
        daDropdown.appendChild(rarityDropdown);

            const rarityButton = document.createElement("button");
            rarityButton.textContent = "RARITY";
            rarityButton.classList.add("dropdownButton");
            rarityDropdown.appendChild(rarityButton);

            const rarityContent = document.createElement("ul");
            rarityContent.classList.add("dropdownContent");
            rarityDropdown.appendChild(rarityContent);

                for (const rarityConditional of rarityConditionals)
                {
                    const rarityListItem = document.createElement("li");
                    rarityContent.appendChild(rarityListItem);

                        const rarityLink = document.createElement("a");
                        rarityLink.href = "#";
                        rarityLink.textContent = rarityConditional.rarity.toUpperCase;
                        rarityListItem.appendChild(rarityLink);
                }
        
        const classDropdown = document.createElement("li");
        daDropdown.appendChild(classDropdown);

            const classButton = document.createElement("button");
            classButton.textContent = "CLASS";
            classButton.classList.add("dropdownButton");
            classDropdown.appendChild(classButton);

            const classContent = document.createElement("ul");
            classContent.classList.add("dropdownContent");
            classDropdown.appendChild(classContent);

                for (const classConditional of classConditionals)
                {
                    const classListItem = document.createElement("li");
                    classContent.appendChild(classListItem);

                        const classLink = document.createElement("a");
                        classLink.href = "#";
                        classLink.textContent = classConditional.name;
                        classListItem.appendChild(classLink);
                }
}

// script.js
document.querySelectorAll(".dropdownButton").forEach(btn =>
{
    btn.addEventListener("click", e =>
    {
        e.stopPropagation();

        const parentLi = btn.parentElement;

        // Close other open menus at the same level
        parentLi.parentElement.querySelectorAll("li.open").forEach(li =>
        {
            if (li !== parentLi) li.classList.remove("open");
        });

        // Toggle current
        parentLi.classList.toggle("open");
    });
});

// Close all dropdowns if clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll("li.open").forEach(li => li.classList.remove("open"));
});
