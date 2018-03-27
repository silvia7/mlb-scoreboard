# mlb-scoreboard

> A Vue.js project for checking mlb stats

My first Project with Vue! This is a small project for me to get familiarize with the Vue.js framework, as well as some ES6 syntax. 

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
- A list of baseball games is displayed for a given day, with home/away team names and scores + statuses, allows user to toggle between dates (next day, previous day) or select a day
- Because the Toronto Blue Jays is our favourite team, we want them to show up first in the list view every time
- If there are no games on that date make sure to display a message ("No games today")
- Bold the winning team (team with more runs)

##### Scoreboard - Detail View:
- Using the data from "{game_data_directory}/boxscore.json" populate a detail screen for the game when you click the game
- The detail screen should display a linescore of the game (inning by inning)
- It should also display a list of batters and stats for each team, and allow you to toggle between viewing either team's batters
- When you're done viewing the details of the game, you should be able to go back to the list of games where you last left off

### Additional Features
- Team Logo
- Favourite team selection drop-down

### Proposal for improvement
- The state of favourite team is not stored anywhere so it would get lost after leaving the page :(, to store user 
specific favourite team. A data base and a user authentication system is needed.
- Better UI/UX: Animation for loading data, hover effects, etc. It would be great to integrate the project with vue-bootstrap 
- Bring in css preprocessor to add mixin and css variables and avoid redundant styles
- Testing tools and unit testings needed to be done
