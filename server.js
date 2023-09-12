import { createServer } from 'http';
// 내가 원하는 변수에 http라는 기본 모듈을 가져와서 사용할 수 있게 됨
// 위의 명령어 한 줄로 이미 구성되어 있는 http 서버 객체를 생성하게 됨

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
