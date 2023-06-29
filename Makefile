startserver: 
	cd server && yarn start

installserverdependencies: 
	cd server && yarn

startclient: 
	cd client && yarn run dev

installclientdependencies:
	cd client && yarn

.PHONY: startserver	startclient installserverdependencies installclientdependencies