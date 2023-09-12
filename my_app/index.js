import express from "express";
import path from 'path'; //__dirname 사용하기 위해 import
import nunjucks from 'nunjucks';

const __dirname = path.resolve(); //또한 이런식으로 이름을 정확히 명시해줘야 오류가 나지 않고 사용할 수 있음

const app = express();

//템플릿 엔진에서 편리하게 사용하기 위해 뷰엔진이라는 값을 설정
// view engine set
app.set('view engine', 'html'); // main -> main.html main만 써도 뒤에 html이 자동으로 붙음

// nunjuecks 자체에 대한 세팅
nunjucks.configure('views', { //첫번째는 템플릿엔진 사용할 때 어떤 위치에서 
                              //그 파일을 찾을건지 경로를 입력. views폴더 안에는 템플릿 엔진으로 해석될 
                              //템플릿을 넣어줌
  watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
  express: app //express 자체가 어떤 객체를 나타내는 지 const app = express();
})


// moddleware - 서버에서 동작하는 여러가지 동작을 여기에 적으면 됨.
// main page GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html'); // sendFile안에는 어떤 경로의 파일을 보낼건지 위치를 나타냄
});

app.get('/write', (req, res) => {
  res.render('write.html')
  // render는 서버에서 렌더링을 해준다는 것을 의미, ()안에는 내가 사용할 파일의 경로를 입력. 위에서 views라고 해줬기 때문에 그냥 파일명만 쓰면 됨
})

app.listen(3000, () => {
  console.log('Server is running');
});