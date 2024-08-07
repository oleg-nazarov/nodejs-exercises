import http, { IncomingMessage, ServerResponse } from 'http';

const { PORT = 3000 } = process.env;

const mainPageMarkup = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Список дел</title>
    <style>
      html, body {
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        height: 100%;
        width: 100%;
        display: flex;
        margin: 0;
      }

      input, button {
        border: none;
      }

      .container {
        width: 468px;
        margin: 0 auto;
        padding-top: 100px;
      }

      h1 {
        font-weight: bold;
      }

      .input {
        display: flex;
        justify-content: space-between;
      }

      .input__text {
        font-size: 0.8em;
        width: 310px;
        height: 50px;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 10px;
        box-sizing: border-box;
      }

      .input__elem_text::placeholder {
        color: #d3d3d3;
      }

      .input__btn {
        font-size: 0.8em;
        width: 150px;
        height: 50px;
        background-color: #ffdb4d;
        border-radius: 2px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <form class="container" action="submit" method="POST" enctype="text/plain">
      <h1>Список дел</h1>
      <div class="input">
        <input type="text" placeholder="Дело" class="input__text" name="item">
        <button class="input__btn input__btn_add">
          Добавить
        </button>
      </div>
    </form>
  </body>
  </html>
`;

const submitSuccessMarkup = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Список дел</title>
    <style>
      html, body {
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        height: 100%;
        width: 100%;
        display: flex;
        margin: 0;
      }

      .container {
        width: 468px;
        margin: 0 auto;
        padding-top: 100px;
      }

      h1 {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Форма успешно отправлена</h1>
    </div>
  </body>
  </html>
`;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/submit' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      res.writeHead(200, {
        'Content-Type': 'text/html, charset=utf-8'
      });

      res.end(submitSuccessMarkup, 'utf-8');
    });
  }

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    res.end(mainPageMarkup);
  }
});

server.listen(PORT);