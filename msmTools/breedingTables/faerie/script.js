import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Faerie");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Faerie"),
                                    stringToElementSigil("Cold"),
                                    stringToElementSigil("Earth"),
                                    stringToElementSigil("Fire")]));
