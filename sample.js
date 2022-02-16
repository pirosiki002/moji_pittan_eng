// グローバル
// div要素を格納
var cards = [];


// 開始時間
var startTime;
// 経過秒数用 タイマーID
var timer;
// カードめくり用 タイマーID
var backTimer;
// 1枚目かどうかのフラグ   1枚目: true   2枚目: false
var flgFirst = true;
// 1枚目のカードを格納
var cardFirst;
// そろえた枚数
var countUnit = 0;

//記憶しているアルファベット
let g_mem_e_word = null;

let COL_CNT = 5;
let ROW_CNT = 4;

window.onload = function(){
    // 数字格納 一時配列
    var arr = [];
    var alf_arr =[];    //アルファベット格納配列

    let count = 1;
    for (var i = 1; i <= COL_CNT; i++){
        for(var j = 1; j <= ROW_CNT; j++){
            // arr.push(i);
            // arr.push(i);
            arr.push(count++);
        }
    }

    console.log("arr", arr);
    //座標情報を持たせたい
    
    /* この時点で配列にはarr[0]=0, arr[1]=0, arr[2]=1, arr[3]=1...といったふうに、０～９まで2つずつ設定されている*/


    // シャッフル
    // shuffle(arr);
    
    var panel = document.getElementById('panel');
    
    /* アルファベットを置くためのテーブル*/
    // div要素作成
    for (i = 0; i < 20; i++){
        var div = document.createElement('div');
        div.className = 'card back';
        div.index = i;
        div.number = arr[i];
        div.innerHTML = '';
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }

    /* a～zまで設定する */
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++){
      var div = document.createElement('div');
      div.className = 'card back';  //ここでHtmlのカード表示をしている？？？
    //   div.className = 'alf';
      div.index = i;
      div.number = alf_arr[i];
      div.innerHTML = String.fromCharCode([i]); /* アルファベットを取ってくれる便利なやーつ*/
      div.onclick = alf; //これがクリックされた時のイベント。alf()内に処理を入れている。
    //   div.onclick = save_e_word(i);
      e_word_list.appendChild(div);
      cards.push(div);
    }

    // 開始時刻を取得
    startTime = new Date();

    // タイマー開始
    startTimer();

  

}

// アルファベットを保持する関数
function save_e_word(alf){
    g_mem_e_word = alf;

}


// シャッフル用関数
function shuffle(arr) {
}

// クリック時の処理
// アルファベットゾーンがクリックされたか、空白ゾーンがクリックされたかを、切り分ける必要がある
function turn(e){
    
    var div = e.target;
    
    // カードのタイマー処理が動作中は return
    if (backTimer) return;

    // 裏向きのカードをクリックした場合は数字を表示する
    if (div.innerHTML == ''){
        div.className = 'card';
        // div.innerHTML = div.number; 
        //debug
        console.log("get_e_word() =", get_e_word());
        // div.innerHTML = div.get_e_word();
        div.innerHTML = get_e_word();

        //ここで、最後にクリックしたアルファベットを設定できるようにする。
        //現在選択中のアルファベットをどこかで常に表示してあげると良い
    }else{
        // 数字が表示されているカードは return
        return;
    }
    

    //単語が成立しているか判断する
    //座標情報を持たせた方が良いかも
}

function alf(e){
    console.log("alf() call!!!");

    var div = e.target;

    //アルファベットのカードがクリックされた場合は、カードのアルファベット情報を保存
    save_e_word(div.innerHTML);

    //保持しているアルファベットを表示
    var re = document.getElementById('save_alf');
    re.innerHTML = "現在選択中：" + get_e_word();

}

// 保持しているアルファベットを返す関数
function get_e_word(){
    return g_mem_e_word;
}

// タイマー開始
function startTimer(){
    timer = setInterval(showSecond, 1000);
}

// 秒数表示
function showSecond(){

    var nowTime = new Date();
    var elapsedTime = Math.floor((nowTime - startTime) / 1000);
    var str = '残り秒数: ' + elapsedTime + '秒';

    var re = document.getElementById('result');
    re.innerHTML = str;
}