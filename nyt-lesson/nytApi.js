var https = require('https');

const nytApiKey = '80xA0tBragGQqDxOt2EMePRw2ZkIpQ1W';
const nytSecretKey = '2GtRum6pBJtu3OAH';
const nytApiBaseUrl = 'https://api.nytimes.com/svc';

// this function will take a metric and optional period
function getMostPopularArticles(metric, period, shareType) {
    let url = `${nytApiBaseUrl}/mostpopular/v2`;

    if (metric === 'emailed' || metric === 'viewed') {
        url += `/${metric}`;
        if (typeof period === 'number' || typeof period === 'string') {
            url += `/${period}.json`;
        }
    } else if (metric === 'shared') {
        if (typeof period === 'number' || typeof period === 'string') {
            url += `/${period}`;
            if (!!shareType && shareType === 'facebook') {
                url += '/facebook'
            }
            url += '.json';
        }
    } else {
        throw new Error(`Invalid Metric: ${metric}. Valid options: emailed, viewed, shared`)
    }

    url += `?api-key=${nytApiKey}`;

    console.log(url);


    https.get(url, (res) => {
        var body = '';

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            var nytData = JSON.parse(body);
            console.log("Got a response: ", nytData);
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    })
}

getMostPopularArticles('viewed', 1);