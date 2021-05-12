var url = require('url');
var path = require('path');
var Downloader = require('mt-files-downloader');
var target_url =
  'https://mp4-a.udemycdn.com/2020-09-18_15-11-07-c3a4c1511d139b0f9ecb7ccdb1f73ba5/1/WebHD_720p.mp4?_JM-0slFGYy9XmBi0e6_mH2lHISNvRNRjwA908FBGt0xBpAw-ihH2PxiFxnZ-N_ChyFGSEuZEWzYoKArAab5E4ThYAL1L8WS6EPUVfZhZgrbKPY3tuP-TNfSprolUE52ZtrBiO3T4j5dVT3sSbMQ5okytiRB6NoRGPnb4aiIPJWYaZi3';

var downloader = new Downloader();
dl = downloader.download(target_url, 'demo.mp4');

dl.start();
dl.on('error', function (dl) {
  console.log('erorr', dl.status);
});

dl.on('start', function () {
  console.log('start');
});

dl.on('end', function () {
  console.log('end');
});
