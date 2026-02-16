import os
import shutil
from pathlib import Path
from PIL import Image
import pillow_avif

IMG_FOLDER = "./msmTools/img"
OUTPUT_FOLDER = "./msmTools/webp"

def convert_avif_to_webp_preserving_structure():
    if os.path.exists(OUTPUT_FOLDER):
        shutil.rmtree(OUTPUT_FOLDER)
    os.makedirs(OUTPUT_FOLDER)

    for root, _, files in os.walk(IMG_FOLDER):
        for file in files:
            if file.lower().endswith(".avif"):
                input_path = os.path.join(root, file)

                rel_path = os.path.relpath(input_path, IMG_FOLDER)
                rel_path_no_ext = os.path.splitext(rel_path)[0]
                output_path = os.path.join(OUTPUT_FOLDER, rel_path_no_ext + ".webp")

                os.makedirs(os.path.dirname(output_path), exist_ok=True)

                try:
                    with Image.open(input_path) as im:
                        im.save(output_path, "WEBP", lossless=False, quality=85, method=6)
                        print(f"Converted: {input_path} → {output_path}")
                except Exception as e:
                    print(f"Failed to convert {input_path}: {e}")

def list_files(directory, output_file):
    files = os.listdir(directory)
    
    filtered_files = [file for file in files if not file.endswith('_black.webp')]
    filtered_files = [file for file in filtered_files if not file.endswith('_copy.webp')]
    filtered_files = [file for file in filtered_files if not file.endswith('_gold_air.webp')]
    filtered_files = [file for file in filtered_files if not file.endswith('_gold_cold.webp')]
    filtered_files = [file for file in filtered_files if not file.endswith('_gold_earth.webp')]
    filtered_files = [file for file in filtered_files if not file.endswith('_gold_plant.webp')]
    filtered_files = [file for file in filtered_files if not file.endswith('_gold_water.webp')]
    
    with open(output_file, 'w') as f:
        for file in filtered_files:
            f.write(f"{file}\n")

convert_avif_to_webp_preserving_structure()

directory_path = './msmTools/webp/portrait'
output_file_path = './msmTools/monsterImgs.txt'

list_files(directory_path, output_file_path)

print(f"Filtered file list has been written to {output_file_path}")