service mongod start
pm2 start ./server/app.js --watch
cd ./web-app/
gnome-terminal -e "npm start"
cd ..
pm2 logs app

