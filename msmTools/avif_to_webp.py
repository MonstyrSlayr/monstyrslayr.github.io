import os
import shutil
from pathlib import Path
from PIL import Image
import pillow_avif

IMG_FOLDER = "./msmTools/img"
OUTPUT_FOLDER = "./msmTools/webp"

def convert_avif_to_webp_preserving_structure():
    # Step 1: Delete existing webp folder
    if os.path.exists(OUTPUT_FOLDER):
        shutil.rmtree(OUTPUT_FOLDER)
    os.makedirs(OUTPUT_FOLDER)

    # Step 2: Walk through all files in IMG_FOLDER
    for root, _, files in os.walk(IMG_FOLDER):
        for file in files:
            if file.lower().endswith(".avif"):
                input_path = os.path.join(root, file)

                # Get relative path and build output path
                rel_path = os.path.relpath(input_path, IMG_FOLDER)
                rel_path_no_ext = os.path.splitext(rel_path)[0]
                output_path = os.path.join(OUTPUT_FOLDER, rel_path_no_ext + ".webp")

                # Ensure target subfolder exists
                os.makedirs(os.path.dirname(output_path), exist_ok=True)

                try:
                    with Image.open(input_path) as im:
                        im.save(output_path, "WEBP", lossless=False, quality=85, method=6)
                        print(f"Converted: {input_path} → {output_path}")
                except Exception as e:
                    print(f"Failed to convert {input_path}: {e}")

convert_avif_to_webp_preserving_structure()
