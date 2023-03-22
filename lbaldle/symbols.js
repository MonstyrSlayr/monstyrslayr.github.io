class Symbol
{
    constructor (name, rarity, coin, symbolCount, symbolApp, itemApp, image)
    {
        this.name = name;
        this.rarity = rarity;
        this.coin = coin;
        this.symbolCount = symbolCount;
        this.symbolApp = symbolApp;
        this.itemApp = itemApp;
        this.image = "./img/" + image;
    }
}

const RARITY =
{
    COMMON: 0,
    UNCOMMON: 1,
    RARE: 2,
    VERYRARE: 3,
    SPECIAL: 4
}

symbols =
[
    new Symbol("Amethyst", RARITY.RARE, 1, 0, 4, 1, "amethyst.png"),
    new Symbol("Anchor", RARITY.COMMON, 1, 0, 2, 0, "anchor.png"),
    new Symbol("Apple", RARITY.RARE, 3, 0, 6, 2, "apple.png"),
    new Symbol("Banana", RARITY.COMMON, 1, 1, 6, 3, "banana.png"),
    new Symbol("Banana Peel", RARITY.COMMON, 1, 1, 2, 1, "banana_peel.png"),
    new Symbol("Bar of Soap", RARITY.UNCOMMON, 1, 1, 0, 0, "bar_of_soap.png"),
    new Symbol("Bartender", RARITY.RARE, 3, 4, 2, 5, "bartender.png"),
    new Symbol("Bear", RARITY.UNCOMMON, 2, 2, 1, 6, "bear.png"),
    new Symbol("Beastmaster", RARITY.RARE, 2, 27, 2, 3, "beastmaster.png"),
    new Symbol("Bee", RARITY.COMMON, 1, 6, 1, 2, "bee.png"),
    new Symbol("Beehive", RARITY.RARE, 3, 1, 2, 1, "beehive.png"),
    new Symbol("Beer", RARITY.COMMON, 1, 0, 4, 3, "beer.png"),
    new Symbol("Big Ore", RARITY.UNCOMMON, 2, 8, 3, 4, "big_ore.png"),
    new Symbol("Big Urn", RARITY.UNCOMMON, 2, 1, 2, 2, "big_urn.png"),
    new Symbol("Billionaire", RARITY.UNCOMMON, 0, 2, 3, 5, "billionaire.png"),
    new Symbol("Bounty Hunter", RARITY.COMMON, 1, 2, 2, 5, "bounty_hunter.png"),
    new Symbol("Bronze Arrow", RARITY.UNCOMMON, 0, 1, 1, 1, "bronze_arrow.png"),
    new Symbol("Bubble", RARITY.COMMON, 2, 0, 5, 0, "bubble.png"),
    new Symbol("Buffing Capsule", RARITY.UNCOMMON, 0, 0, 0, 1, "buffing_powder.png"),
    new Symbol("Candy", RARITY.COMMON, 1, 0, 4, 2, "candy.png"),
    new Symbol("Card Shark", RARITY.RARE, 2, 5, 2, 3, "card_shark.png"),
    new Symbol("Cat", RARITY.COMMON, 1, 2, 2, 15, "cat.png"),
    new Symbol("Cheese", RARITY.COMMON, 1, 0, 7, 2, "cheese.png"),
    new Symbol("Chef", RARITY.RARE, 2, 21, 2, 3, "chef.png"),
    new Symbol("Chemical Seven", RARITY.UNCOMMON, 0, 0, 2, 4, "chemical_seven.png"),
    new Symbol("Cherry", RARITY.COMMON, 1, 0, 4, 2, "cherry.png"),
    new Symbol("Chick", RARITY.UNCOMMON, 1, 1, 3, 4, "chick.png"),
    new Symbol("Chicken", RARITY.RARE, 2, 2, 3, 6, "chicken.png"),
    new Symbol("Clubs", RARITY.UNCOMMON, 1, 6, 8, 4, "clubs.png"),
    new Symbol("Coal", RARITY.COMMON, 0, 1, 0, 1, "coal.png"),
    new Symbol("Coconut", RARITY.UNCOMMON, 1, 1, 4, 1, "coconut.png"),
    new Symbol("Coconut Half", RARITY.UNCOMMON, 2, 0, 4, 2, "coconut_half.png"),
    new Symbol("Coin", RARITY.COMMON, 1, 0, 3, 2, "coin.png"),
    new Symbol("Comedian", RARITY.RARE, 3, 6, 2, 5, "comedian.png"),
    new Symbol("Cow", RARITY.RARE, 3, 1, 2, 3, "cow.png"),
    new Symbol("Crab", RARITY.COMMON, 1, 1, 3, 2, "crab.png"),
    new Symbol("Crow", RARITY.COMMON, 2, 0, 2, 3, "crow.png"),
    new Symbol("Cultist", RARITY.COMMON, 0, 2, 7, 3, "cultist.png"),
    new Symbol("Dame", RARITY.RARE, 2, 10, 2, 3, "dame.png"),
    new Symbol("Diamond", RARITY.VERYRARE, 5, 1, 6, 1, "diamond.png"),
    new Symbol("Diamonds", RARITY.UNCOMMON, 1, 6, 8, 4, "diamonds.png"),
    new Symbol("Diver", RARITY.RARE, 2, 10, 2, 3, "diver.png"),
    new Symbol("Dog", RARITY.COMMON, 1, 25, 2, 3, "dog.png"),
    new Symbol("Dove", RARITY.RARE, 2, 0, 1, 3, "dove.png"),
    new Symbol("Dud", RARITY.SPECIAL, 0, 0, 0, 0, "dud.png"),
    new Symbol("Dwarf", RARITY.COMMON, 1, 2, 2, 5, "dwarf.png"),
    new Symbol("Egg", RARITY.COMMON, 1, 1, 11, 8, "egg.png"),
    new Symbol("Eldritch Creature", RARITY.VERYRARE, 4, 18, 3, 2, "eldritch_beast.png"),
    new Symbol("Emerald", RARITY.RARE, 3, 1, 5, 1, "emerald.png"),
    new Symbol("Empty", RARITY.SPECIAL, 0, 0, 6, 8, "empty_border.png"),
    new Symbol("Essence Capsule", RARITY.UNCOMMON, -12, 0, 0, 1, "essence_capsule.png"),
    new Symbol("Farmer", RARITY.RARE, 2, 20, 2, 3, "farmer.png"),
    new Symbol("Five-Sided Die", RARITY.UNCOMMON, 0, 0, 1, 3, "d5.png"),
    new Symbol("Flower", RARITY.COMMON, 1, 0, 6, 0, "flower.png"),
    new Symbol("Frozen Fossil", RARITY.RARE, 0, 10, 0, 1, "frozen_fossil.png"),
    new Symbol("Gambler", RARITY.COMMON, 1, 2, 2, 5, "gambler.png"),
    new Symbol("General Zaroff", RARITY.RARE, 1, 26, 2, 3, "general_zaroff.png"),
    new Symbol("Geologist", RARITY.RARE, 2, 5, 2, 3, "archaeologist.png"),
    new Symbol("Golden Arrow", RARITY.VERYRARE, 0, 1, 1, 1, "golden_arrow.png"),
    new Symbol("Golden Egg", RARITY.RARE, 4, 0, 5, 3, "golden_egg.png"),
    new Symbol("Goldfish", RARITY.COMMON, 1, 2, 2, 4, "goldfish.png"),
    new Symbol("Golem", RARITY.UNCOMMON, 0, 1, 0, 2, "golem.png"),
    new Symbol("Goose", RARITY.COMMON, 1, 1, 1, 4, "goose.png"),
    new Symbol("Hearts", RARITY.UNCOMMON, 1, 6, 8, 4, "hearts.png"),
    new Symbol("Hex of Destruction", RARITY.UNCOMMON, 3, 0, 4, 2, "hex_of_destruction.png"),
    new Symbol("Hex of Draining", RARITY.UNCOMMON, 3, 0, 4, 2, "hex_of_draining.png"),
    new Symbol("Hex of Emptiness", RARITY.UNCOMMON, 3, 0, 4, 2, "hex_of_emptiness.png"),
    new Symbol("Hex of Hoarding", RARITY.UNCOMMON, 3, 0, 4, 2, "hex_of_hoarding.png"),
    new Symbol("Hex of Midas", RARITY.UNCOMMON, 3, 1, 4, 3, "hex_of_midas.png"),
    new Symbol("Hex of Tedium", RARITY.UNCOMMON, 3, 0, 4, 2, "hex_of_tedium.png"),
    new Symbol("Hex of Thievery", RARITY.UNCOMMON, 3, 0, 4, 2, "hex_of_thievery.png"),
    new Symbol("Highlander", RARITY.VERYRARE, 6, 1, 1, 0, "highlander.png"),
    new Symbol("Honey", RARITY.RARE, 3, 0, 6, 1, "honey.png"),
    new Symbol("Hooligan", RARITY.UNCOMMON, 2, 6, 2, 3, "hooligan.png"), //HOOLIGAN SWEEP!!!
    new Symbol("Hustling Capsule", RARITY.UNCOMMON, -7, 0, 0, 1, "hustler.png"),
    new Symbol("Item Capsule", RARITY.UNCOMMON, 0, 0, 0, 1, "item_capsule.png"),
    new Symbol("Jellyfish", RARITY.UNCOMMON, 2, 0, 2, 2, "jellyfish.png"),
    new Symbol("Joker", RARITY.RARE, 3, 4, 3, 3, "joker.png"),
    new Symbol("Key", RARITY.COMMON, 1, 4, 6, 1, "key.png"),
    new Symbol("King Midas", RARITY.RARE, 1, 2, 2, 3, "king_midas.png"),
    new Symbol("Light Bulb", RARITY.COMMON, 1, 8, 0, 0, "light_bulb.png"),
    new Symbol("Lockbox", RARITY.COMMON, 1, 0, 3, 3, "lockbox.png"),
    new Symbol("Lucky Capsule", RARITY.UNCOMMON, 0, 0, 0, 1, "rarity_capsule.png"),
    new Symbol("Magic Key", RARITY.RARE, 2, 4, 0, 0, "magic_key.png"),
    new Symbol("Magpie", RARITY.COMMON, -1, 0, 1, 4, "magpie.png"),
    new Symbol("Martini", RARITY.RARE, 3, 0, 4, 2, "martini.png"),
    new Symbol("Matryoshka Doll", RARITY.UNCOMMON, 0, 1, 0, 1, "matryoshka_doll_1.png"),
    new Symbol("Matryoshka Doll", RARITY.SPECIAL, 1, 1, 1, 1, "matryoshka_doll_2.png"),
    new Symbol("Matryoshka Doll", RARITY.SPECIAL, 2, 1, 1, 1, "matryoshka_doll_3.png"),
    new Symbol("Matryoshka Doll", RARITY.SPECIAL, 3, 1, 1, 1, "matryoshka_doll_4.png"),
    new Symbol("Matryoshka Doll", RARITY.SPECIAL, 4, 0, 1, 0, "matryoshka_doll_5.png"),
    new Symbol("Mega Chest", RARITY.VERYRARE, 3, 0, 3, 3, "mega_chest.png"),
    new Symbol("Midas Bomb", RARITY.VERYRARE, 0, 0, 0, 0, "midas_bomb.png"),
    new Symbol("Milk", RARITY.COMMON, 1, 0, 6, 2, "milk.png"),
    new Symbol("Mine", RARITY.RARE, 4, 1, 0, 0, "mine.png"),
    new Symbol("Miner", RARITY.COMMON, 1, 4, 2, 3, "miner.png"),
    new Symbol("Monkey", RARITY.COMMON, 1, 3, 2, 3, "monkey.png"),
    new Symbol("Moon", RARITY.RARE, 3, 4, 0, 1, "moon.png"),
    new Symbol("Mouse", RARITY.COMMON, 1, 2, 1, 3, "mouse.png"),
    new Symbol("Mrs. Fruit", RARITY.RARE, 2, 6, 2, 3, "mrs_fruit.png"),
    new Symbol("Ninja", RARITY.UNCOMMON, 2, 1, 3, 6, "ninja.png"),
    new Symbol("Omelette", RARITY.RARE, 3, 5, 2, 3, "omelette.png"),
    new Symbol("Orange", RARITY.UNCOMMON, 2, 0, 5, 2, "orange.png"),
    new Symbol("Ore", RARITY.COMMON, 1, 8, 5, 4, "ore.png"),
    new Symbol("Owl", RARITY.COMMON, 1, 0, 3, 4, "owl.png"),
    new Symbol("Oyster", RARITY.COMMON, 1, 2, 2, 3, "oyster.png"),
    new Symbol("Peach", RARITY.UNCOMMON, 2, 1, 4, 2, "peach.png"),
    new Symbol("Pear", RARITY.RARE, 1, 0, 3, 2, "pear.png"),
    new Symbol("Pearl", RARITY.COMMON, 1, 0, 8, 1, "pearl.png"),
    new Symbol("Pirate", RARITY.VERYRARE, 2, 8, 2, 3, "pirate.png"),
    new Symbol("Piñata", RARITY.UNCOMMON, 1, 1, 2, 0, "pinata.png"),
    new Symbol("Present", RARITY.COMMON, 0, 0, 2, 3, "present.png"),
    new Symbol("Pufferfish", RARITY.UNCOMMON, 2, 0, 2, 2, "pufferfish.png"),
    new Symbol("Rabbit", RARITY.UNCOMMON, 1, 0, 2, 9, "rabbit.png"),
    new Symbol("Rabbit Flush", RARITY.UNCOMMON, 2, 0, 0, 6, "rabbit_fluff.png"),
    new Symbol("Rain", RARITY.UNCOMMON, 2, 2, 0, 1, "rain.png"),
    new Symbol("Removal Capsule", RARITY.UNCOMMON, 0, 0, 0, 1, "removal_capsule.png"),
    new Symbol("Reroll Capsule", RARITY.UNCOMMON, 0, 0, 0, 1, "reroll_capsule.png"),
    new Symbol("Robin Hood", RARITY.RARE, -4, 10, 2, 4, "robin_hood.png"),
    new Symbol("Ruby", RARITY.RARE, 3, 1, 5, 1, "ruby.png"),
    new Symbol("Safe", RARITY.UNCOMMON, 1, 0, 3, 3, "safe.png"),
    new Symbol("Sand Dollar", RARITY.UNCOMMON, 2, 0, 2, 2, "sand_dollar.png"),
    new Symbol("Sapphire", RARITY.UNCOMMON, 2, 0, 5, 1, "sapphire.png"),
    new Symbol("Seed", RARITY.COMMON, 1, 11, 5, 6, "seed.png"),
    new Symbol("Shiny Pebble", RARITY.COMMON, 1, 0, 5, 2, "shiny_pebble.png"),
    new Symbol("Silver Arrow", RARITY.RARE, 0, 1, 1, 1, "silver_arrow.png"),
    new Symbol("Sloth", RARITY.UNCOMMON, 0, 0, 1, 3, "sloth.png"),
    new Symbol("Snail", RARITY.COMMON, 0, 0, 2, 3, "snail.png"),
    new Symbol("Spades", RARITY.UNCOMMON, 1, 6, 8, 4, "spades.png"),
    new Symbol("Spirit", RARITY.RARE, 6, 0, 5, 3, "spirit.png"),
    new Symbol("Strawberry", RARITY.RARE, 3, 1, 4, 2, "strawberry.png"),
    new Symbol("Sun", RARITY.RARE, 3, 2, 0, 1, "sun.png"),
    new Symbol("Target", RARITY.UNCOMMON, 2, 0, 5, 2, "target.png"),
    new Symbol("Tedium Capsule", RARITY.UNCOMMON, 0, 0, 0, 3, "tedium_capsule.png"),
    new Symbol("Thief", RARITY.UNCOMMON, -1, 0, 6, 6, "thief.png"),
    new Symbol("Three-Sided Die", RARITY.COMMON, 0, 0, 1, 3, "d3.png"),
    new Symbol("Time Capsule", RARITY.UNCOMMON, 0, 1, 1, 1, "time_capsule.png"),
    new Symbol("Toddler", RARITY.COMMON, 1, 8, 3, 4, "toddler.png"),
    new Symbol("Tomb", RARITY.RARE, 3, 2, 2, 3, "tomb.png"),
    new Symbol("Treasure Chest", RARITY.RARE, 2, 0, 3, 4, "treasure_chest.png"),
    new Symbol("Turtle", RARITY.COMMON, 0, 0, 2, 4, "turtle.png"),
    new Symbol("Urn", RARITY.COMMON, 1, 1, 2, 2, "urn.png"),
    new Symbol("Void Creature", RARITY.UNCOMMON, 0, 2, 1, 6, "void_creature.png"),
    new Symbol("Void Fruit", RARITY.UNCOMMON, 0, 2, 3, 6, "void_fruit.png"),
    new Symbol("Void Stone", RARITY.UNCOMMON, 0, 2, 4, 6, "void_stone.png"),
    new Symbol("Watermelon", RARITY.VERYRARE, 4, 1, 4, 2, "watermelon.png"),
    new Symbol("Wealthy Capsule", RARITY.UNCOMMON, 0, 0, 0, 3, "lucky_capsule.png"),
    new Symbol("Wildcard", RARITY.VERYRARE, 0, 0, 1, 1, "wildcard.png"),
    new Symbol("Wine", RARITY.UNCOMMON, 2, 0, 4, 3, "wine.png"),
    new Symbol("Witch", RARITY.RARE, 2, 13, 5, 3, "witch.png"),
    new Symbol("Wolf", RARITY.UNCOMMON, 2, 0, 2, 4, "wolf.png"),
]

//console.log(symbols);

/*
IDENTICAL SYMBOLS:

    (common-0-0-2-3) present, snail

    (common-1-0-4-2) candy, cherry

    (common-1-2-2-5) bounty hunter, dwarf, gambler

    (uncommon-0-0-0-1) buffing capsule, item capsule, lucky capsule, removal capsule, reroll capsule

    (uncommon-0-0-0-3) tedium capsule, wealthy capsule

    (uncommon-0-0-1-3) five-sided die, sloth

    (uncommon-0-1-1-1) bronze arrow, time capsule

    (uncommon-1-6-8-4) all of the suits

    (uncommon-2-0-2-2) jellyfish, pufferfish, sand dollar

    (uncommon-2-0-5-2) orange, target

    (uncommon-3-0-4-2) all of the hexes except hex of midas

    (rare-2-5-2-3) card shark, geologist

    (rare-2-10-2-3) dame, diver

    (rare-3-1-5-1) emerald, ruby
*/