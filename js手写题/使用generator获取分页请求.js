
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;
  
  while(url) { // 无限yield
    const response = await fetch(url, {
      headers: {'User-Agent': 'Our script'}, // github 需要任意的 user-agent header
    });
    const body = await response.json();

    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { 
      yield commit;
    }
  }
}

(async () => {
  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
    console.log(commit.author.login);

    if (++count == 100) { // 让我们在获取了 100 个 commit 时停止
      break;
    }
  }
})()