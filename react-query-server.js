const express = require('express');
const app = express();
const cors = require("cors");
const oracledb = require('oracledb');
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"]
}));

const server = app.listen(3355, () => {
    console.log("Server started on http://localhost:3355");
});

app.get('/recipe/find', async (req, res) => {
    const fd = req.query.fd || '간식'; // 검색어
    const page = parseInt(req.query.page) || 1; // 페이지 번호
    const rowSize=12
    let start = (rowSize*page)-(rowSize-1)
    let end = (rowSize*page)

    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "hr",
            password: "happy",
            connectionString: "localhost:1521/xe",
        });

        const result = await connection.execute(
            `SELECT no, poster,title,chef,hit,likecount,num
            FROM (SELECT no,poster,title,chef,hit,likecount,rownum as num
            FROM (SELECT no,poster,title,chef,hit,likecount 
            FROM recipe WHERE REGEXP_LIKE(title,'${fd}') 
            AND no IN(SELECT no FROM recipe INTERSECT SELECT no FROM recipedetail) ORDER BY no ))
            WHERE num BETWEEN ${start} AND ${end}`
        )
        const result2 = await connection.execute(
            `SELECT CEIL(COUNT(*)/12.0) as totalpage FROM recipe
             WHERE REGEXP_LIKE(title,'${fd}')
            AND no IN(SELECT no FROM recipe INTERSECT SELECT no FROM recipedetail)`
        )
        const data = {
            fList:result.rows,
            totalpage:result2.rows[0].TOTALPAGE
        }
        res.json(data);

    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ error: "Database query failed" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Connection close error:", err);
            }
        }
    }
});

app.get('/food/find', async (req, res) => {
    const fd = req.query.fd || '서울';
    const page = parseInt(req.query.page) || 1;
    const rowSize=12
    let start = (rowSize*page)-(rowSize-1)
    let end = (rowSize*page)
    let connection;
    try{
        connection = await oracledb.getConnection({
            user: "hr",
            password: "happy",
            connectionString: "localhost:1521/xe",
        })
        const result =await connection.execute(
            `SELECT fno,name,poster,address,likecount,hit,num 
            FROM (SELECT fno,name,poster,address,likecount,hit,rownum as num
            FROM (SELECT fno,name,poster,address,likecount,hit
            FROM project_food WHERE REGEXP_LIKE(name,'${fd}')
            ORDER BY fno))
            WHERE num BETWEEN ${start} AND ${end}`
        )
        const result2 = await connection.execute(
            `SELECT CEIL(COUNT(*)/12.0) as totalpage FROM project_food WHERE REGEXP_LIKE(name,'${fd}')`
        )
        const data = {
            fList:result.rows,
            totalpage:result2.rows[0].TOTALPAGE
        }
        res.json(data);
    }catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ error: "Database query failed" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Connection close error:", err);
            }
        }
    }
})

var client_id = 'IRScYBQb8ASjUyJLoJ6d';
var client_secret = 'VpRv68YgyE';
app.get('/news/find', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/news.json?display=100&query=' + encodeURI(req.query.query);
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    })
})