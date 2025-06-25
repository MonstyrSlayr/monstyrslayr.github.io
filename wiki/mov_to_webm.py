import os
import subprocess

# Folder containing the videos
video_folder = "wiki/video"

# Ensure the folder exists
if not os.path.exists(video_folder):
    print(f"Folder '{video_folder}' not found.")
    exit()

# Loop through all .mov files in the folder
for filename in os.listdir(video_folder):
    if filename.lower().endswith(".mov"):
        mov_path = os.path.join(video_folder, filename)
        webm_path = os.path.join(video_folder, os.path.splitext(filename)[0] + ".webm")

        # Ensure existing webm file is deleted before conversion
        if os.path.exists(webm_path):
            os.remove(webm_path)
            print(f"Deleted existing {os.path.basename(webm_path)} to replace it.")

        # FFmpeg command
        command = [
            "ffmpeg", "-i", mov_path,
            "-c:v", "libvpx-vp9",
            "-pix_fmt", "yuva420p",
            webm_path
        ]

        print(f"Converting {filename} to {os.path.basename(webm_path)}...")
        subprocess.run(command, check=True)

        # Delete the original .mov file
        os.remove(mov_path)
        print(f"Deleted {filename}")

print("Conversion complete!")
