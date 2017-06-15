# gmail_scripts
Useful google scripts to filter your inbox

## Usage
1. Go to (https://script.google.com) and add a new project.
2. Copy the script from [BZStatusProcessor.gs](BZStatusProcessor.gs) to the new gs file.
3. In "Select function", select `processInbox` as the startup function
4. Click "Run" button to run the script
5. When presented, allow the script access to your inbox.
6. Go to your inbox and see the new tags added.
7. Now, that you are satisfied with the results, go to Edit -> Current projet's triggers
8. Click link to add new trigger
9. Select `processInbox` as the startup function
10. Select when the script should run. _Notice that the duration should be less than the interval specified in `newer_than` term_
11. Save the new trigger.

Enjoy!
