exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world!',
    }),
  }
}

/*
    fetch(
      'https://pictures.hinchfamily.com/ws.php?format=rest&method=pwg.categories.getImages',
      {
        mode: 'no-cors',
      },
    ).then(response => console.log(response.body))
*/
