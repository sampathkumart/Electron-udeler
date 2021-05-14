var Downloader = require('mt-files-downloader');
const homedir = require('os').homedir();

var downloader = new Downloader();

// export default function download(url, name) {
dl = downloader.download(
  'https://mp4-a.udemycdn.com/2019-07-11_20-48-34-8cfea8626652141b0fc703966dba716d/WebHD_480.mp4?NaFbPi1WpcOcoOuBueV2XzzpoNKFRuC1N-BM1O4pilo_868T7j3Rw23iIoc7kCZwP6AqFqxlJS5vEJhDBMSE02sKFUORr-zJGLqSfzhDbOGMQzlNZjhVMBmtOv1uvoDzFHlhMLQ2nFGU1_GSytwNKwaRQxm0LAZLiq1COSyZh7gP',
  homedir + '/Downloads/' + '1.mp4'
);

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
// }
