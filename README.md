# mlb-scoreboard

> A Vue.js project for checking mlb stats

My first Project with Vue! This is a small project for me to familiarize with the Vue.js framework, as well as some ES6 syntax. 

Demo: http://scoreboard-project-2018.s3-website.ca-central-1.amazonaws.com/
### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

### Screens
##### Scoreboard - List View:
- Display a list of baseball games on a given day, with home/away team names and scores + statuses      
- Allow user to toggle between dates (next day, previous day) or select a day.
- Always showing up Toronro Blue Jays first in the list view since it is our favourite team!
- Display a message ("No games today") if there is no game playing on that date.
- Bold the name of the winning team (team with more runs).

##### Scoreboard - Detail View:
- Use the data from "{game_data_directory}/boxscore.json" to populate a detail screen for the game that user clicks.
- The detail screen displays a line score of the game (inning by inning). It also displays a list of batters and stats for each team and allows user to toggle between viewing either team's batters.  
- When user finishes viewing the details of the game, the screen can return to the list of games where user last left off.

### Additional Features
- Team Logo
- Favourite team selection drop-down

### Proposal for improvement
- The project does not save data in storage so it would lost the data about the state of favourite team after leaving the page :( A database and a user authentication system are needed to store user specific favourite team
- Better UI/UX: Animation for loading data, hover effects, etc. It would be great to integrate the project with vue-bootstrap 
- Bring in css preprocessor to add mixin and css variables and avoid redundant styles
- Testing tools and unit testings are needed to be done
