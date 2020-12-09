
var auth = 'elastic:6FQRWIm6BWsWkCrxtTNEOChQ';
var port = 9243;
var protocol = 'https';
var hostUrls = [
    'a1e932ce434c4946b0a81509c1143888.us-east-1.aws.found.io'
];

let hosts = hostUrls.map(function(host) {
    return {
        protocol: protocol,
        host: host,
        port: port,
        auth: auth
    };
});

let elasticSearch = require('elasticsearch')

export const client = new elasticSearch.Client({
    hosts: hosts
});
