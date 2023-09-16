import express, { json } from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import fs from 'fs';

const __dirname = path.resolve();

const app = express();

// file path
// my_app/data/writing.json
const filePath = path.join(__dirname, 'data', 'writing.json');

// body parser set
app.use(bodyParser.urlencoded({ extended: false })); // express 기본 모듈 사용
app.use(bodyParser.json());

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjuecks 자체에 대한 세팅
nunjucks.configure('views', { //첫번째는 템플릿엔진 사용할 때 어떤 위치에서 
  //그 파일을 찾을건지 경로를 입력. views폴더 안에는 템플릿 엔진으로 해석될 
  //템플릿을 넣어줌
  watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
  express: app //express 자체가 어떤 객체를 나타내는 지 const app = express();
})

// middleware
// main page GET
app.get('/',  (req, res) => {
  const fileData = fs.readFileSync(filePath);
  const wirtings = JSON.parse(fileData);


  res.render('main', {list: wirtings});
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', (req, res) => {
  //request 안에 있는 내용을 처리
  //request.body  
  const title = req.body.title;
  const contents = req.body.contents;
  const date = req.body.date;

  // 단순히 값만 넘길 때는 값이 저장되는 게 아니기 때문에 wirte 함수 앞에서 렌더를 해주기 전에
  // 값을 저장하는 것을 추가해줘야함.

  // 데이터 저장
  // data/wirting.json 안에 글 내용 저장
  const fileData = fs.readFileSync(filePath); // 파일 읽기
                                              // sync는 node.js가 비동기이기때문에 
                                              // 이 값들을 읽어오는 작업 다음에 다음 동작이 실행되게끔 readFileSync 사용

  const writings = JSON.parse(fileData); // 파일 변환
  
  // request 데이터를 저장
  writings.push({ // 글 하나당 하나의 객체로
    'title': title,
    'contents': contents,
    'date': date
  })

  //data/writing.json에 저장
  fs.writeFileSync(filePath, JSON.stringify(writings)) // 다시 버퍼형태로 저장해야 하기 때문에

  res.render('detail', { 'detail': { title: title, contents: contents, date: date } });
});

app.get('/detail', async (req, res) => {
    res.render('detail');
})

app.listen(3000, () => {
    console.log('Server is running');
});