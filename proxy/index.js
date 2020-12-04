const express = require('express')

const cors = require('cors')
const app = express()
const port = 5000
app.use(cors())
var request = require('request');

app.all('*', (req, res) => {
    console.log(req.method, req.originalUrl)
    request({
        'method': req.method,
        'url': 'http://kf.kobo.local' + req.originalUrl,
        'headers': {
            "Content-Type": "application/json",
            'Cookie': 'csrftoken=RcMl1EBAnjoaUf3ox6fiGAJEOc47DYErK4NULKxmua9pasfL4DtPxZt7PFKyAWPD; kobonaut=sxmknfbto9opieh925bcu46bvknci5kp'
        }
    }, function (error, response) {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        } else {
            res.status(response.statusCode).json(JSON.parse(response.body))
        }
    });

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})