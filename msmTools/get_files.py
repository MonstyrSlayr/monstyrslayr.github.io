import os

def list_files(directory, output_file):
    # Get a list of all files in the directory
    files = os.listdir(directory)
    
    # Filter out files that end with "_black.avif"
    filtered_files = [file for file in files if not file.endswith('_black.avif')]
    
    # Write the filtered list of files to the output file
    with open(output_file, 'w') as f:
        for file in filtered_files:
            f.write(f"{file}\n")

# Specify the directory path and output file path
directory_path = './img'
output_file_path = 'monsterImgs.txt'

# Call the function to list files and export them to a txt file
list_files(directory_path, output_file_path)

print(f"Filtered file list has been written to {output_file_path}")