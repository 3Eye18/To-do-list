fetch('https://dummyjson.com/posts/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'I am in love with someone.',
    userId: 9,
    /* other post data */
  })
})
.then(res => res.json())
.then(console.log);