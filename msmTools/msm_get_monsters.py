from urllib import request
from bs4 import BeautifulSoup
import pandas as pd

class BreakException(Exception):
    pass

class SkipException(Exception):
    pass

names, links, islands_lists, likes_lists, bios = [], [], [], [], []

url_starter = "https://mysingingmonsters.fandom.com"
resp = request.urlopen(url_starter + "/wiki/Monsters")
data = resp.read()
soup = BeautifulSoup(data, "html.parser")
tables = soup.find_all("table")

max_monsters = -1
monster_count = 0
parsed_epic_wubbox = False

try:
    for table in tables:
        if table.has_attr("class"):
            if len(table["class"]) == 1:
                table_rows = table.find_all("tr")

                for tr in table_rows:
                    table_datas = tr.find_all("td")

                    for td in table_datas:
                        # almost each td is a monster
                        # which has an image link, a text link, and may have a set of elements too
                        # so we only want the second a tag

                        try:
                            a_tags_all = td.find_all("a")
                            a_tags = []

                            for a_tag in a_tags_all:
                                if not a_tag.find_parents("span"):
                                    a_tags.append(a_tag)

                            if a_tags:
                                if len(a_tags) > 0:
                                    schmoney = a_tags[0]

                                    # get name
                                    monster_name = schmoney.text.strip()

                                    # get link
                                    link = url_starter + schmoney["href"].strip()

                                    if (monster_name == "Plant"):
                                        if (parsed_epic_wubbox):
                                            raise SkipException
                                        
                                        monster_name = "Epic Wubbox"
                                        link = url_starter + "/wiki/Epic_Wubbox"
                                        parsed_epic_wubbox = True
                                    
                                    if (monster_name == "Glowbes"):
                                        raise SkipException
                                        
                                    monster_count += 1
                                    print(monster_name)

                                    do_parse_stuff = False
                                    monster_resp = None

                                    while not do_parse_stuff:
                                        try:
                                            monster_resp = request.urlopen(link)
                                            do_parse_stuff = True
                                        except:
                                            print(">>>>http error")
                                    
                                    monster_data = monster_resp.read()
                                    monster_soup = BeautifulSoup(monster_data, "html.parser")

                                    # get islands
                                    island_string = ""

                                    island_div = monster_soup.find("div", attrs = {"data-source": "island(s)"})
                                    if not island_div: raise SkipException

                                    names.append(monster_name)
                                    links.append(link)

                                    island_links = island_div.find_all("a")

                                    for island_link in island_links[1::2]:
                                        if not island_link.text.strip().startswith("Mirror"):
                                            island_string += island_link.text.strip() + "&"
                                    
                                    islands_lists.append(island_string)

                                    # get likes on each island or polarity
                                    h2s = monster_soup.find_all("h2")
                                    likes_header = None
                                    likes_string = ""

                                    for h2 in h2s:
                                        spans = h2.find_all("span", recursive = False)
                                        if len(spans) == 2:
                                            if spans[0].text.strip() == "Likes":
                                                likes_list = h2.find_next("ul").find_next("ul")

                                                for li in likes_list.find_all("li"):
                                                    like_link_list = li.find_all("a")
                                                    like_link = like_link_list[0]
                                                    done_linkie = False

                                                    if len(like_link_list) > 1:
                                                        for linkie in like_link_list[1::]:
                                                            linkie_title = linkie["title"]
                                                            if linkie_title != "Experience" and linkie_title != "Mystery Likes":
                                                                likes_string += linkie_title + ":" + like_link.text.strip() + "&"
                                                                done_linkie = True

                                                    if not done_linkie:
                                                        likes_string += "All:" + like_link.text.strip() + "&"
                                                
                                                break
                                            elif spans[0].text.strip() == "Polarity":
                                                polarity_table = h2.find_next("table")

                                                for pol_td in polarity_table.find_all("td"):
                                                    like_link = pol_td.find_all("a")[1]
                                                    likes_string += like_link.text.strip() + "&"
                                    
                                    likes_lists.append(likes_string)

                                    # get bio
                                    bio_table = monster_soup.find("table", class_ = "quote")
                                    bio_tds = bio_table.find_all("td")
                                    bios.append(bio_tds[1].text.strip())
                            
                                    if (monster_count == max_monsters):
                                        raise BreakException
                        except SkipException:
                            pass
except BreakException:
    pass

df = pd.DataFrame({"name": names,
                    "link": links,
                    "islands": islands_lists,
                    "likes/polarity": likes_lists,
                    "bio": bios})

df.to_csv("./msmTools/monsterDataRaw.csv")
