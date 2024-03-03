import subprocess

def run_command(command):
    subprocess.run(command, shell=True)

if __name__ == "__main__":
    command = 'chmod +x tt.py && uvicorn main:app --reload --host 0.0.0.0'
    run_command(command)


# chmod +x tt.py && nohup python3 tt.py &