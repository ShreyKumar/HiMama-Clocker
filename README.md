# HiMama-Clockr

A Clock-in/Clock-out application for teachers at Daycare centers

## How to run
1. First clone this respository: <code>git clone https://github.com/ShreyKumar/HiMama-Clocker</code> <br>
2. <code>cd HiMama-Clocker</code> <br>
3. Install dependencies for the backend: <code>yarn</code>
4. Install dependencies for the client: <code>cd client && yarn</code> <br>
5. <code>cd ..</code> <br>
6. <code>yarn dev</code>

## Live Demo
https://himama-clockr.herokuapp.com/

## My Approach
### Backend
I first created a backend and created all the API routes using express. These can be found in <code>server.js</code>. I did not use a database, considering the 
scope of this application and Firebase was down when I needed it the most so I had to abandon it to get myself started. Instead, I created <code>user_manager.js</code> 
which would handle all user clock ins and outs and take care of all the different edge cases, all the while storing User objects in an array for now. 
More info of how I did things can be found in the file itself.

### Frontend
Since my strengths are in the front-end side of things, I used React to create components and wired them together in App.js. 
Specifically, I had created a Switch commponent to handle the clock in/out switch when a user wants to use the application. 
I also created a <code>Card.js</code> to represent each clock in/out and styled them with the stylesheets found in the scss folder. 
The UI components can be found under <code>client/src/components/ui</code>

## Further plans
I wanted to take this app a step further and add some of my own features that weren't included in the original document. 
I did manage to partly complete the first and second one but not completely since there are still some noticiable bugs which can be reproduced.
1. Animations for when someone is clocking in or out, also for edit or delete operations. 
2. Fully working edit feature. Double-click to enable edit mode and edit out the names and enter to save.
3. Paging: Limited clock in activity per page. Can be filtered at user's request
4. Multiple clock ins for different days: Ability to go to a previous day and view or make changes there. 
5. Multiple day care centers: Some day care centers might have different branches, so ability to control which day care 
center you are currently looking at
