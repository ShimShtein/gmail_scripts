# gmail_scripts
Useful google scripts to filter your inbox

## Usage
1. Go to (https://script.google.com) and add a new project.
2. Copy the script from [BZStatusProcessor.gs](BZStatusProcessor.gs) to the new gs file.
3. Save the script (File -> Save).
4. In "Select function", select `processInbox` as the startup function
5. Click "Run" button to run the script
6. When presented, allow the script access to your inbox.
7. Go to your inbox and see the new tags added.
8. Now, that you are satisfied with the results, go to Edit -> Current projet's triggers
9. Click link to add new trigger
10. Select `processInbox` as the startup function
11. Select when the script should run. _Notice that the duration should be less than the interval specified in `newer_than` term_
12. Save the new trigger.

## Alternative usage

You can install [chrome extension](https://github.com/leonhartX/gas-github) that enables you to sync github and google scrips directly. Just clone the script to your git repo, sync your local repo with google scripts and follow the guidelines from earlier.

Enjoy!
