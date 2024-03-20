# Welcome to Farm Tech Frontend 

## Follow the 3 Steps and your good to go. 

1: Clone the Project 

2: simply run the command 
   ### `npm install` 
   First to install all the packages
   
3: run the project using 
   ### `npm start`
   Start the web on http://localhost:3000/
   ---

## Git operations

1. before you start your work, you will go to the main branch and you will pull the latest main branch:
```bash
git checkout main
git fetch
git pull
```

2. pick a feature and create a branch. suppose dashboard
```bash
git checkout -b 'reza_dashboard'
git add .
git commit -m "completed dashboard"
```

3. then merge it with main
```bash
git checkout main
git fetch
git pull
git merge reza_dashboard
```
