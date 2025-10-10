import os
import shutil


def list_files(directory, output_file):
    # Get a list of all files in the directory
    files = os.listdir(directory)
    with open(output_file, 'w') as f:
        for file in files:
            f.write(f"{file}\n")
    return files

if __name__ == "__main__":
    # 1. list all files in data
    files = list_files("./msmsudoku/data", "./msmsudoku/data_files.txt")

    # 2. make a folder for each
    os.makedirs("./msmsudoku/play", exist_ok=True)

    for file_name in files:
        folder_path = os.path.join("./msmsudoku/play", file_name.replace(".sud", ""))

        # Delete if it already exists
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path)

        # Recreate folder
        os.makedirs(folder_path)

        # Always save as index.html
        dest_file = os.path.join(folder_path, "index.html")

        # Copy template
        shutil.copyfile("./msmsudoku/play/template.html", dest_file)

        print(f"Created folder: {folder_path}")

    # 3. copy unique stuff in
    # soon
