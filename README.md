# [The Shoppies (deployed on Heroku)](https://theshoppies-x-mn.herokuapp.com)

## Features
### Search for your movie in real time
The user is able to search a movie in real time. I'm using a debounce function in order to reduce the api call on changes of the input. 
The result will be displayed in a 5x2 format.

### Add a movie to the nomination list
The user can simply add a movie by clicking on it Upon hovering on the movie, a visual feedback will be display with a ribbon icon so the user know that he/she can add the movie. After adding it, the movie will become disabled while showing a 'Nominated' state. Also, the whole list will be disabled when the user has reached 5 nominated movies (full capacity). At that point, a message will be displayed notifying the user that he has reached the limit.

### Remove a movie from the nomination list
The user can simply remove a movie by clicking on a movie from the nominations list. A visual feedback will be display with an X icon. Similar to the add, but in reverse.

### Scroll to load more results
The user can load more results by scrolling to the bottom of the page. The api call loads 10 results at a time. 

### Share a nomination list
The user can share the nomination list after adding 5 movies. A share button will appear. Upon clicking the button, the shareable link will be copied to the user's clipboard.

### COVID-19
To help you go through, here's a suggestions of [movies](https://theshoppies-x-mn.herokuapp.com/?nominations=dHQwMTEwOTEyLHR0MzQ2MDI1Mix0dDEzNzU2NjYsdHQwOTkzODQ2LHR0MDA5OTc4NQ%3D%3D) to watch/rewatch. Enjoy :)

## Developer setup
This project was made with Vue.

Clone this project, considering you have npm installed, run this line:
```
npm install
```

### Compiles and hot-reloads for development (localhost:8080)
```
npm start
```

### API key from OMDB
Get your free API key [here](http://www.omdbapi.com/apikey.aspx) 

- Rename the '.env_sample' file to '.env'
- Change the 'YOUR_API_KEY_HERE' for your API key
- Save the file

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
