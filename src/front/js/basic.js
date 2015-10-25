export function basic() {
  fetch('/api/basic')
    .then((res) => {
      console.log('Content-Type:' + res.headers.get('Content-Type'));
      console.log('Date: ' + res.headers.get('Date'));
      console.log('status: ' + res.status);
      console.log('statusText: ' + res.statusText);
      console.log('type: ' + res.type);
      console.log('url: ' + res.url);

      return res.json();
    })
    .then((data) => {
      alert(JSON.stringify(data));
    }).catch((err) => {
      console.log(err);
    });
}

export function post() {
  fetch('/api/post', {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: 'foo=bar&lorem=ipsum'
  }).then(status)
    .then(json)
    .then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log('Request failed', err);
    });
}

export function cors() {
  fetch('https://nodejs.org/api/index.json')
    .then(status)
    .then(json)
    .then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log('Request failed', err);
    });
}

////////////////////////////////////
// Utils
////////////////////////////////////

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

