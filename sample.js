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
let mem_e_word = null;

window.onload = function(){
    // 数字格納 一時配列
    var arr = [];
    
    for (var i = 0; i < 10; i++){
        // ペアの数字を10組
        arr.push(i);
        arr.push(i);
    }
    
    /* この時点で配列にはarr[0]=0, arr[1]=0, arr[2]=1, arr[3]=1...といったふうに、０～９まで2つずつ設定されている*/


    // シャッフル
    shuffle(arr);
    
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
      div.className = 'card back';
      div.index = i;
      div.number = arr[i];
      div.innerHTML = String.fromCharCode([i]); /* アルファベットを取ってくれる便利なやーつ*/
      // div.onclick = turn;
      div.onclick = save_e_word(i);
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
  mem_e_word = alf;

}

// シャッフル用関数
function shuffle(arr) {
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// クリック時の処理
function turn(e){
    
    var div = e.target;
    
    // カードのタイマー処理が動作中は return
    if (backTimer) return;

    // 裏向きのカードをクリックした場合は数字を表示する
    if (div.innerHTML == ''){
        div.className = 'card';
        div.innerHTML = div.number; 
    }else{
        // 数字が表示されているカードは return
        return;
    }

    /* 選択したアルファベットを貼り付ける（NULLじゃなければ）*/
    /* **********なぜか全て122になる。。要調査！！ ************** */
    // if (div.innerHTML == ''){
    //     div.className = 'card';
    //     if(mem_e_word != null){
    //       div.innerHTML = mem_e_word; 
    //     }
    // }else{
    //     // 数字が表示されているカードは return
    //     return;
    // }

    
    // 1枚目の処理
    if (flgFirst){
        // cardFirst は2枚目の処理のときに使う
        cardFirst = div;
        // フラグ変更
        flgFirst = false;
        
    // 2枚目の処理
    }else{
        
        // 数字が1枚目と一致する場合
        if (cardFirst.number == div.number){
            countUnit++;
            // 見えない状態にする
            backTimer = setTimeout(function(){
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;
                
                if (countUnit == 10){
                    clearInterval(timer);  // timer終了
                }
            }, 500)

        // 一致しない場合
        }else{  
            // カードを裏側に戻す
            backTimer = setTimeout(function(){
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        
        flgFirst = true;
    }  
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