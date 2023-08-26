// await语法
let response = await fetch(url, {
  method: "GET",
  headers: {
    Authentication: 'secret'
  }
});
let json = await response.json();

// promise语法
fetch(url).then(response => response.json()).then()