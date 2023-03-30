to inizialize or create the api project, we must follow the steps below:
1. create empty aruskas database on mysql
2. install all dependancies by using npm install
3. run on terminal <npx sequelize-cli db:migrate>
4. go to util folder and run association.js
5. go back to main dir
6. run on terminal <npx sequelize-cli db:seed --seed 20230316201006-add-roles.js>
7. run on terminal <npx sequelize-cli db:seed --seed 20230317061048-add-user.js>
8. run on terminal <npx nodemon app.js>
9. api is ready to use