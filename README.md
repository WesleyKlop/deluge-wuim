# Deluge WUIM

WUIM stands for _**W**eb **U**i **IM**proved_, I started this project because of my frustration from wanting to check up on my torrents from my phone but ending up fighting with the ui.

I'm also trying to make all the functions available (listed when calling `system.listMethods`) to me in the web ui but that will take a bit longer.

# Installing

Just your standard
```shell
git clone git@github.com:WesleyKlop/deluge-wuim.git && cd deluge-wuim
yarn install  # or npm install
# Build the app, you can overwrite the build location with the BUILD_DIR environment variable
yarn build # or npm run build
```

To see more options check out the webpack.config.babel.js file which lists all used environment variables, right at the top

# TODO

There is a lot more that needs to happen still.

* Connection manager
* Filters (name, state, label, tracker_host)
* Add torrents
* Remove torrents
* View torrent details
* Change torrent options
* Preferences
* Server info
* Most `web.*` calls
* Service worker

What would be really cool but not something I can do as I haven't learned python (yet) is if the api could be rewritten to be a websocket and the login call would use credentials so I can use the credentials api :^)
