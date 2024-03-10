This project was built for the Encode x Polkadot Hackathon, althought the hackathon has been concluded, we invite you to contribute to this project to build on our MVP.

# Setting Up Your Local Clone
Before you begin working on anything, make sure you follow these steps in order to set up a clone on your local machine:

Fork the repo you would like to work on to your own GitHub account. If you don't know how to do so, follow the GitHub documentation on how to fork a repo.

Clone the forked repo to your local machine with one of the commands below. Be sure the <your username> text is replaced with your actual GitHub username, and the <repo name> with the actual repo name. You can also read the GitHub documentation on cloning a repository.
```bash
# If you have SSH set up with Git:
git clone git@github.com:<your username>/<repo name>.git
# Otherwise for HTTPS:
git clone https://github.com/<your username>/<repo name>.git
```
cd into the directory of your local clone, then set the upstream remote so you can keep your local clone synced with TOP's original repo. The <repo name> below should be the same as the one you used when creating your local clone in the previous step.
```bash
# If you have SSH set up with Git:
git remote add upstream git@github.com:bolajahmad/<repo name>.git
# Otherwise for HTTPS:
git remote add upstream https://github.com/bolajahmad/<repo name>.git
```
Working on an Issue
Once you have the repo forked and cloned, and the upstream remote has been set, you can begin working on your issue:

Create a new branch, replacing the <your branch name> with an actual branch name that briefly explains the purpose of the branch in some way:
```bash
git checkout -b <your branch name>

# Some examples:
git checkout -b fix_link_text
Add commits as you work on your issue, replacing the <your commit message> text with your actual commit message:

git commit -m "<your commit message>"

# An example:
git commit -m "Update solution files"
```
Sync your work with the upstream remote every so often.

Push your branch to your forked repo, replacing the <your branch name> with the branch you've been working on locally:
```bash
git push origin <your branch name>

# An example:
git push origin flex_exercises
```
