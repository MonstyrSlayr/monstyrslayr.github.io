import os
import shutil
import pandas as pd

def duplicate_folder_contents_to_monster_folders(source_folder, csv_file_path):
    """
    Duplicate the contents of a folder into new subfolders named after the "monster" column in a CSV file.

    Parameters:
    source_folder (str): The path to the folder whose contents will be duplicated.
    csv_file_path (str): The path to the CSV file containing the "monster" column.

    Returns:
    None
    """
    # Read the CSV file
    try:
        df = pd.read_csv(csv_file_path)
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return

    # Check if "monster" column exists
    if "monster" not in df.columns:
        print("Error: The CSV file does not have a 'monster' column.")
        return

    # Get unique folder names from the "monster" column
    monster_names = df["monster"].dropna().unique()

    # Iterate over each monster name
    for monster in monster_names:
        # Create a new folder named after the monster in lowercase
        monster_folder = os.path.join(source_folder, monster.lower())
        
        # Skip if the folder already exists
        if os.path.exists(monster_folder):
            print(f"Skipping existing folder: {monster_folder}")
            continue

        try:
            os.makedirs(monster_folder)
            print(f"Created folder: {monster_folder}")
        except Exception as e:
            print(f"Error creating folder {monster_folder}: {e}")
            continue

        # Copy only files from source folder to the new monster folder
        for item in os.listdir(source_folder):
            source_item = os.path.join(source_folder, item)
            destination_item = os.path.join(monster_folder, item)

            try:
                if os.path.isfile(source_item):
                    shutil.copy2(source_item, destination_item)
                    print(f"Copied {source_item} to {destination_item}")
            except Exception as e:
                print(f"Error copying {source_item} to {destination_item}: {e}")

# Example usage
duplicate_folder_contents_to_monster_folders("reese", "../monsterData.csv")
