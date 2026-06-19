import shutil
from urllib import request, error
from bs4 import BeautifulSoup
import pandas as pd
import requests
import os

class BreakException(Exception):
    pass

class SkipException(Exception):
    pass

names, links, descriptions, images, level_available, x_size, y_size = [], [], [], [], [], [], []

url_starter = "https://mysingingmonsters.fandom.com"
headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) "
        "Gecko/20100101 Firefox/121.0"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}
resp = None
requested = False

while not requested:
    try:
        req = request.Request(url_starter + "/wiki/Decorations", headers=headers)
        resp = request.urlopen(req)
        requested = True
    except error.HTTPError as e:
        print(">http error")

data = resp.read()
soup = BeautifulSoup(data, "html.parser")
tables = soup.find_all("table")

print("beginning parsage")

# clear image folder
def clear_and_remake_directory(dir):
    if os.path.exists(dir):
        shutil.rmtree(dir)
    os.makedirs(dir)
clear_and_remake_directory("./msmTools/img/decorations")

max_decorations = -1 # for testing, set to -1 to process all decos
has_started = False
decoration_count = 0

try:
    for table in tables:
        if table.has_attr("class"):
            if len(table["class"]) == 3 and not "navbox" in table["class"]:
                table_rows = table.find_all("tr")

                for tr in table_rows:
                    # only the first td has the link we want
                    da_table_data = tr.find("td")

                    if da_table_data:
                        try:
                            a_tag = da_table_data.find("a")

                            if a_tag:
                                if a_tag.has_attr("title"):
                                    # get name
                                    deco_name = a_tag["title"].strip()

                                    # get link
                                    link = url_starter + a_tag["href"].strip()

                                    decoration_count += 1
                                    print(deco_name)

                                    if deco_name == "Obstacles":
                                        raise SkipException

                                    do_parse_stuff = False
                                    deco_resp = None

                                    while not do_parse_stuff:
                                        try:
                                            deco_req = request.Request(link, headers=headers)
                                            deco_resp = request.urlopen(deco_req)
                                            do_parse_stuff = True
                                        except:
                                            print("    >http error")
                                    
                                    deco_data = deco_resp.read()
                                    deco_soup = BeautifulSoup(deco_data, "html.parser")

                                    names.append(deco_name)
                                    links.append(link)

                                    is_trophy = False

                                    # download images be cool
                                    card_img = deco_soup.find(class_="pi-image-thumbnail")
                                    # trophies have reward then trophy
                                    # so skip the reward
                                    # they are also always 1x1
                                    if card_img["alt"].strip() == "Reward":
                                        card_img = card_img.find_next(class_="pi-image-thumbnail")
                                        is_trophy = True
                                    img_data = requests.get(card_img["src"]).content

                                    img_name = "./msmTools/img/decorations/" + a_tag["href"].strip().replace("/wiki/", "").replace("%27", "") + ".png"
                                    os.makedirs(os.path.dirname(img_name), exist_ok=True)
                                    with open(img_name, 'wb') as handler:
                                        handler.write(img_data)
                                    images.append(a_tag["href"].strip().replace("/wiki/", "").replace("%27", "") + ".png")

                                    level_db = deco_soup.find("div", attrs = {"data-source": "available"})
                                    if level_db:
                                        level_available.append(level_db.find("div").text.strip().split(", ")[0].replace("Level ", "").replace("Colossingum ", ""))
                                    else:
                                        level_available.append("")
                                    
                                    space_db = deco_soup.find("div", attrs = {"data-source": "size"})
                                    if space_db:
                                        x_size.append(space_db.find("b").text.strip().split("x")[0].strip())
                                        y_size.append(space_db.find("b").text.strip().split("x")[1].strip())
                                    elif is_trophy:
                                        x_size.append(1)
                                        y_size.append(1)
                                    else:
                                        x_size.append("")
                                        y_size.append("")
                                    
                                    # get bio
                                    bio_table = deco_soup.find("table", class_ = "quote")
                                    if bio_table:
                                        bio_tds = bio_table.find_all("td")
                                        for br in bio_tds[1].find_all("br"):
                                            br.replace_with("\n")
                                        descriptions.append(bio_tds[1].get_text().strip())
                                    else:
                                        descriptions.append("")

                                    if (decoration_count == max_decorations):
                                        raise BreakException
                        except SkipException:
                                pass
except BreakException:
    pass

df = pd.DataFrame({"name": names,
                    "link": links,
                    "image": images,
                    "description": descriptions,
                    "level_available": level_available,
                    "x_size": x_size,
                    "y_size": y_size})

df.to_csv("./msmTools/decorationData.csv")
