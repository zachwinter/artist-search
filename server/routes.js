module.exports = (app, api) => {
  app.get('/', (req, res) => {
    res.send('Last.fm Artist Search')
  })

	app.get('/artist/:artist', (req, res) => {
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    
		api.artistInfo({ name: req.params.artist }, (err, artist) => {
      if (err) {
        console.log(err)
      } else {
        res.send(artist)
      }		})
	})

  app.get('/artist/:artist/similar', (req, res) => {
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')

    api.artistSimilar({
      name: req.params.artist,
      limit: 50
    }, (err, artist) => {
      if (err) {
        console.log(err)
      } else {
        res.send(artist)
      }
    })
  })

  app.get('/artist/:artist/tags', (req, res) => {
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    
    api.artistTopTags({ name: req.params.artist }, (err, tags) => {
      if (err) {
        console.log(err)
      } else {
        res.send(tags)
      }
    })
  })
}