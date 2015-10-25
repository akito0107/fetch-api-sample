import {$} from 'zepto-browserify';

let contentLength = 0;
let fetchedLength = 0;
let buf;

// export function stream() {
fetch('/images/large.jpg')
  .then((res) => {
    contentLength = res.headers.get('Content-Length');
    buf = new Uint8Array(contentLength);
    return pump(res.body.getReader());
  }).catch((err) => {
    console.log('Request failed', err);
  });
// }


function pump(reader) {
  return reader.read().then((data) => {
    console.log(data.done);
    if (data.done) {
      return finished();
    }
    const chunk = data.value;
    updateProgress(chunk);
    return pump(reader)
  });
}

function updateProgress(chunk) {
  buf.set(chunk, fetchedLength);
  fetchedLength += chunk.byteLength;
  $('#count-target').html(`${fetchedLength} byte / ${contentLength} byte`);
}

function finished() {
  const blob = new Blob([buf], {'type': 'image/jpeg'});
  const url = window.URL.createObjectURL(blob);

  const img = $('<img>');
  img.width(150);
  img.height(150);
  img.attr('src', url);

  $('#target-div').append(img);
}
