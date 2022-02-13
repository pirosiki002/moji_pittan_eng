
console.log("Javascript activate test");
// /* main */
// const sqlite3 = require('sqlite3');
// ここからはザキさんに相談かな？
var sqlite3 = require("sqlite3").verbose();
// // 作成したDBに接続
// const db = new sqlite3.Database('/db/ejdict.sqlite3');

// db.all('SELECT * FROM items', (err, rows) =>{
//     if (err) {
//         console.log(err);
//         return;
//     }
//     rows.forEach((row) =>{
//         // console.log('id:' +row.id + ' name:' + row.name);
//         console.log('word:' +row.word + ' mean:' + row.mean + 'level:' + row.level);
//     })
// });