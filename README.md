# RaspberryiPi

Repository for tracking, backing, and enabling rebuilding of Eric's primary domestic Pi.

---

## Usage

To get into the pi, right now, we've got an id_rsa that may or may not be backed up ...
With it installed, we can get in using

`ssh -i ~/.ssh/id_rsa pi@rpi4.local`

---

## LLM-Assisted Workflow and Copilot Tools

This repository has been expanded to support LLM-assisted workflow with copilot tools. The `.github` and `.vscode` folders contain copilot prompt augmentation instructions to guide the LLM for home server projects.

---

## Project Structure and Working Patterns

This repository is intended for operating a home server off of a Raspberry Pi. It contains scripts and configurations for various services and tools. The repository is structured to be used across multiple devices, making it easier to migrate where and how the various services are hosted.

### Folder Structure

- `.github/`: Contains GitHub-specific files, including copilot prompt augmentation instructions.
- `.vscode/`: Contains VS Code-specific files, including settings to enhance copilot prompt augmentation.
- `cambox/`: Contains scripts related to the cambox service.
- `html/`: Contains HTML files for the web interface.
- `scripts/`: Contains various scripts for setting up and managing the home server.
- `TVRemote/`: Contains files related to the TV remote control service.

### Working Patterns

- Use the provided scripts and configurations to set up and manage the home server services.
- Follow the copilot prompt augmentation instructions in the `.github` and `.vscode` folders to enhance the LLM-assisted workflow.
- Refer to the documentation and examples provided in the repository for guidance on using the scripts and configurations.
- Ensure that any dependencies or prerequisites for the services and tools are met.
- Troubleshoot any potential issues using the provided troubleshooting steps.

---

## Multi-Device Usage

This repository is designed to be used across multiple devices, making it easier to migrate where and how the various services are hosted. The scripts and configurations are intended to be flexible and adaptable to different environments.
