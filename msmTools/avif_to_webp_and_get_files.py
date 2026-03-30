import os
import shutil
from pathlib import Path
from PIL import Image
import pillow_avif

def get_locallow_folder_path():
    local_appdata_path = os.getenv("LOCALAPPDATA")
    
    if local_appdata_path:
        appdata_root = os.path.dirname(local_appdata_path)
        locallow_path = os.path.join(appdata_root, "LocalLow")
        return locallow_path
    else:
        return None

LOCALLOW = get_locallow_folder_path()

PORTRAIT_FOLDER_IN = "C:/Program Files (x86)/Steam/steamapps/common/My Singing Monsters/data/gfx/book"
SQUARE_FOLDER_IN = "C:/Program Files (x86)/Steam/steamapps/common/My Singing Monsters/data/gfx/breeding"
SPORE_FOLDER_IN = "C:/Program Files (x86)/Steam/steamapps/common/My Singing Monsters/data/gfx"
MEMORY_FOLDER_IN = "C:/Program Files (x86)/Steam/steamapps/common/My Singing Monsters/data/audio/music"

PORTRAIT_FOLDER_IN_2 = os.path.join(LOCALLOW, "Big Blue Bubble Inc/My Singing Monsters/1/downloads/gfx/book")
SQUARE_FOLDER_IN_2 = os.path.join(LOCALLOW, "Big Blue Bubble Inc/My Singing Monsters/1/downloads/gfx/breeding")
SPORE_FOLDER_IN_2 = os.path.join(LOCALLOW, "Big Blue Bubble Inc/My Singing Monsters/1/downloads/gfx")
MEMORY_FOLDER_IN_2 = os.path.join(LOCALLOW, "Big Blue Bubble Inc/My Singing Monsters/1/downloads/audio/music")

PORTRAIT_FOLDER_OUT = "./msmTools/img/portrait"
SQUARE_FOLDER_OUT = "./msmTools/img/square"
SPORE_FOLDER_OUT = "./msmTools/img/spore"
MEMORY_FOLDER_OUT = "./msmTools/audio/memory"

PORTRAIT_FOLDER_WEBP = "./msmTools/webp/portrait"
SQUARE_FOLDER_WEBP = "./msmTools/webp/square"
SPORE_FOLDER_WEBP = "./msmTools/webp/spore"

def clear_and_remake_directory(dir):
    if os.path.exists(dir):
        shutil.rmtree(dir)
    os.makedirs(dir)

def copy_to_directory(input_folder, output_folder, substring = ""):
    for filename in os.listdir(input_folder):
        if substring in filename:
            source_file_path = os.path.join(input_folder, filename)

            destination_file_path = os.path.join(output_folder, filename)

            if os.path.isfile(source_file_path):
                try:
                    shutil.copy2(source_file_path, destination_file_path)

                    # quibble clause
                    if filename.lower().endswith("ad.avif"):
                        dest_filename = filename.replace(".avif", "_copy.avif")

                        shutil.copy2(source_file_path, os.path.join(output_folder, dest_filename))
                    
                    print(f"Copied: {filename}")
                except shutil.SameFileError:
                    print(f"Skipped: {filename} (source and destination are the same file)")
                except PermissionError:
                    print(f"Error: Permission denied for file {filename}")
                except Exception as e:
                    print(f"Error copying {filename}: {e}")

def convert_avif_to_webp(input_folder, output_folder):
    clear_and_remake_directory(output_folder)

    for file in os.listdir(input_folder):
        input_path = os.path.join(input_folder, file)

        if os.path.isfile(input_path) and file.lower().endswith(".avif"):
            rel_path_no_ext = os.path.splitext(file)[0]
            output_path = os.path.join(output_folder, rel_path_no_ext + ".webp")

            try:
                with Image.open(input_path) as im:
                    im.save(output_path, "WEBP", lossless=False, quality=85, method=6)
                    print(f"Converted: {input_path} → {output_path}")
            except Exception as e:
                print(f"Failed to convert {input_path}: {e}")

def list_files(directory, output_file):
    files = os.listdir(directory)
    
    filtered_files = [file for file in files if not file.endswith("_black.webp")]
    filtered_files = [file for file in filtered_files if not file.endswith("_copy.webp")]
    filtered_files = [file for file in filtered_files if not file.endswith("_gold_air.webp")]
    filtered_files = [file for file in filtered_files if not file.endswith("_gold_cold.webp")]
    filtered_files = [file for file in filtered_files if not file.endswith("_gold_earth.webp")]
    filtered_files = [file for file in filtered_files if not file.endswith("_gold_plant.webp")]
    filtered_files = [file for file in filtered_files if not file.endswith("_gold_water.webp")]
    
    with open(output_file, "w") as f:
        for file in filtered_files:
            f.write(f"{file}\n")

clear_and_remake_directory(PORTRAIT_FOLDER_OUT)
clear_and_remake_directory(SQUARE_FOLDER_OUT)
clear_and_remake_directory(SPORE_FOLDER_OUT)
clear_and_remake_directory(MEMORY_FOLDER_OUT)

copy_to_directory(PORTRAIT_FOLDER_IN, PORTRAIT_FOLDER_OUT)
copy_to_directory(SQUARE_FOLDER_IN, SQUARE_FOLDER_OUT)
copy_to_directory(SPORE_FOLDER_IN, SPORE_FOLDER_OUT, "spore")
copy_to_directory(MEMORY_FOLDER_IN, MEMORY_FOLDER_OUT, "Memory")

copy_to_directory(PORTRAIT_FOLDER_IN_2, PORTRAIT_FOLDER_OUT)
copy_to_directory(SQUARE_FOLDER_IN_2, SQUARE_FOLDER_OUT)
copy_to_directory(SPORE_FOLDER_IN_2, SPORE_FOLDER_OUT, "spore")
copy_to_directory(MEMORY_FOLDER_IN_2, MEMORY_FOLDER_OUT, "Memory")

convert_avif_to_webp(PORTRAIT_FOLDER_OUT, PORTRAIT_FOLDER_WEBP)
convert_avif_to_webp(SQUARE_FOLDER_OUT, SQUARE_FOLDER_WEBP)
convert_avif_to_webp(SPORE_FOLDER_OUT, SPORE_FOLDER_WEBP)

# write list of portrait filenames to txt file to be grabbed by web
list_files(PORTRAIT_FOLDER_WEBP, "./msmTools/monsterImgs.txt")

print("filtered file list has been written")
