//esm 모드
import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); //응답 헤드부분
  res.write('hello node.js'); //응답 바디부분
  res.end(); // 요청에 응답할 때는 항상 요청을 다 처리했다는 응답을 끝내주는 코드로 마무리해야함
});

//server를 응답할 수 있는 상태, 돌아가는 상태로 만들어 줘야함
server.listen(3000, () => {
  //노드는 일반적으로 3000번 포트를 사용(처음에 포트를 적어줘야 함
  console.log('Server is listening on port 3000');
});

//index.js와 차이 (index.js는 express 사용)