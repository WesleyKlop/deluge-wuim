# Deluge WUIM

WUIM stands for _**W**eb **U**i **IM**proved_, I started this project because of my frustration from wanting to check up on my torrents from my phone but ending up fighting with the ui.

I'm also trying to make all the functions available (listed when calling `system.listMethods`) to me in the web ui but that will take a bit longer.

## Installing

Just your standard
```shell
git clone git@github.com:WesleyKlop/deluge-wuim.git && cd deluge-wuim
yarn install  # or npm install
```

## Configuration

Check out settings.json which looks like this
```json
{
  // Appended to react app url's so you stay inside the application
  "basename": "",
  // The location where the default deluge-web ui exists
  "delugeLocation": "https://deluge.mywebsite.io:8112"
}
```

To see more options check out the `webpack.config.babel.js` file which lists all used environment variables, right at the top

## Development

To start a dev server (webpack-dev-server) on port 8080 by default
```shell
yarn start # or npm start
```

Or build the application
```shell
yarn build:dev
```

## Production

Build the application by running
```shell
yarn build:prod
```

## TODO

There is a lot more that needs to happen still.

* Connection manager (Remove host, need to think about UX)
* Filters (~~name~~, state, label, tracker_host)
* Add torrents
* Remove torrents
* View torrent details
* Change torrent options
* Preferences
* Server info
* Most `core.*` calls
* Service worker (PWA)
