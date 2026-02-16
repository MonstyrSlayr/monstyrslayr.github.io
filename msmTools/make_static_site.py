import os
import csv
import shutil

def clean_subdirectories(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        return

    for name in os.listdir(directory):
        full_path = os.path.join(directory, name)
        if os.path.isdir(full_path):
            shutil.rmtree(full_path)

def load_codenames(csv_path):
    mapping = {}
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            base = row["monster"].strip()
            code = row["codename"].strip()
            mapping[base.lower()] = code
    return mapping

def parse_monster_name(full_name):
    parts = full_name.split(" ", 1)

    if parts[0] in ("Rare", "Epic", "Adult") and len(parts) > 1:
        return parts[1], parts[0]
    else:
        return full_name, None

def build_monsters(monster_csv, codename_csv, base_dir, template_file):
    codename_map = load_codenames(codename_csv)

    with open(template_file, "r", encoding="utf-8") as f:
        template_content = f.read()

    clean_subdirectories(base_dir)

    with open(monster_csv, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            raw_name = row["name"].strip()
            base_name, modifier = parse_monster_name(raw_name)

            codename = codename_map.get(base_name.lower())
            if not codename:
                print(f"WARNING: No codename for base monster '{base_name}'")
                continue

            folders_to_make = []

            if codename.startswith("i"):
                folders_to_make = [
                    f"{codename}_maj",
                    f"{codename}_min"
                ]
            elif codename.startswith("f"):
                folders_to_make = [
                    f"{codename}",
                    f"{codename}_rare",
                    f"{codename}_epic_plant",
                    f"{codename}_epic_cold",
                    f"{codename}_epic_air",
                    f"{codename}_epic_water",
                    f"{codename}_epic_earth",
                    f"{codename}_epic_firehaven",
                    f"{codename}_epic_fireoasis",
                    f"{codename}_epic_ethereal"
                ]
            else:
                if modifier is None:
                    folders_to_make = [codename]
                else:
                    folders_to_make = [f"{codename}_{modifier.lower()}"]

            for folder_name in folders_to_make:
                folder_path = os.path.join(base_dir, folder_name)
                os.makedirs(folder_path, exist_ok=True)

                replaced = template_content
                replaced = replaced.replace("{codename}", codename)
                replaced = replaced.replace("{name}", base_name)
                replaced = replaced.replace("{modifier}", modifier or "")

                with open(os.path.join(folder_path, "index.html"), "w", encoding="utf-8") as out:
                    out.write(replaced)

                print(f"Created folder: {folder_path}")

if __name__ == "__main__":
    build_monsters(
        monster_csv="./msmTools/monsterData.csv",
        codename_csv="./msmTools/codenames.csv",
        base_dir="./msmTools/monsters",
        template_file="./msmTools/monsters/template.html"
    )
