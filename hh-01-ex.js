const express = require('express');
const app = express();

let count = 0,
    heart = true,
    computer = '';

app.get('/', (req, res) => {
    res.send('[숫자 야구 게임을 시작합니다.] http://localhost:3000/ <에 숫자를 적어보세요');
})


//재설정
app.get("/reset", (req, res) => {
    count = 0;
    heart = true;
    computer = '';

    arr1 = Math.floor(Math.random() * 10);
    arr2 = Math.floor(Math.random() * 10);
    arr3 = Math.floor(Math.random() * 10);

    for (let i = 0; arr1 === arr2; i++) {
        arr2 = Math.floor(Math.random() * 10);
    }

    for (let i = 0; arr1 === arr3 && arr2 === arr3; i++) {
        arr3 = Math.floor(Math.random() * 10);
    }

    computer = `${arr1}${arr2}${arr3}`;
    res.send(`다시 시작합니다.`)
});


//값 받아오기
app.get('/:input', (req, res) => {

    if (heart) {
        const { input } = req.params;
        if (input === "") {
        };
        if (isNaN(input) || input.length !== 3) {
            throw new Error('Bad Request');
        };

        let S = 0;
        let B = 0;

        count += 1;

        for (let i = 0; i < 3; i++) {
            if (computer.indexOf(input[i]) !== -1) {
                if (input[i] === computer[i]) {
                    S += 1;
                } else {
                    B += 1;
                };
            };
        };

        if(B === 3) {
            console.log(`${count}번째 시도 3B! 입력값: ${input} `);
            res.send(`${count}번째 시도 3B`);
        } else if(S === 3) {
            heart = false;
            console.log(`${count}번째 시도 3S! 입력값: ${input}, 정답 ${computer}`);
            res.send(`${count}번째 시도 3S! 정답입니다.`);
        } else {
            console.log(`${count}번째 시도, 입력값: ${input} ${B}B${S}S `);
            res.send(`${count}번째 시도, 입력값: ${input} ${B}B${S}S`);
        }

    } else {
        res.send(`이미 ${count}번째 시도로 성공하셨습니다. 정답 : ${computer}`);
    };
});


app.use((err, req, res, next) => {

    res.status(400).send(err);

});


app.listen(3000, () => {
    arr1 = Math.floor(Math.random() * 10);
    arr2 = Math.floor(Math.random() * 10);
    arr3 = Math.floor(Math.random() * 10);

    for (let i = 0; arr1 === arr2; i++) {
        arr2 = Math.floor(Math.random() * 10);
    }

    for (let i = 0; arr1 === arr3 && arr2 === arr3; i++) {
        arr3 = Math.floor(Math.random() * 10);
    }

    computer = `${arr1}${arr2}${arr3}`;
    console.log(`컴퓨터가 숫자를 생성했습니다. 정답 ${computer}`);
});

