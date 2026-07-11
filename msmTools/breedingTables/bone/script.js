import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Bone");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Bone"),
                                    stringToElementSigil("Water"),
                                    stringToElementSigil("Earth"),
                                    stringToElementSigil("Fire")]));
