d3.dataManager = {};

d3.dataManager = function module() {

    var prefArray, preLabel, kindArray;


    function _my(_selection) {

      var prefSet0 = ["千代田区"];
      var prefSet1 = ["中央区"];
      var prefSet2 = ["港区"];
      var prefSet3 = ["新宿区"];
      var prefSet4 = ["文京区"];
      var prefSet5 = ["台東区"];
      var prefSet6 = ["墨田区"];
      var prefSet7 = ["江東区"];
      var prefSet8 = ["品川区"];
      var prefSet9 = ["目黒区"];
      var prefSet10 = ["大田区"];
      var prefSet11 = ["世田谷区"];
      var prefSet12 = ["渋谷区"];
      var prefSet13 = ["中野区"];
      var prefSet14 = ["杉並区"];
      var prefSet15 = ["豊島区"];
      var prefSet16 = ["北区"];
      var prefSet17 = ["荒川区"];
      var prefSet18 = ["板橋区"];
      var prefSet19 = ["練馬区"];
      var prefSet20 = ["足立区"];
      var prefSet21 = ["葛飾区"];
      var prefSet22 = ["江戸川区"];
      var prefSet23 = ["八王子市"];
      var prefSet24 = ["立川市"];
      var prefSet25 = ["武蔵野市"];
      var prefSet26 = ["三鷹市"];
      var prefSet27 = ["青梅市"];
      var prefSet28 = ["府中市"];
      var prefSet29 = ["昭島市"];
      var prefSet30 = ["調布市"];
      var prefSet31 = ["町田市"];
      var prefSet32 = ["小金井市"];
      var prefSet33 = ["小平市"];
      var prefSet34 = ["日野市"];
      var prefSet35 = ["東村山市"];
      var prefSet36 = ["国分寺市"];
      var prefSet37 = ["国立市"];
      var prefSet38 = ["福生市"];
      var prefSet39 = ["狛江市"];
      var prefSet40 = ["東大和市"];
      var prefSet41 = ["清瀬市"];
      var prefSet42 = ["東久留米市"];
      var prefSet43 = ["武蔵村山市"];
      var prefSet44 = ["多摩市"];
      var prefSet45 = ["稲城市"];
      var prefSet46 = ["羽村市"];
      var prefSet47 = ["あきる野市"];
      var prefSet48 = ["西東京市"];
      var prefSet49 = ["瑞穂町"];
      var prefSet50 = ["日の出町"];
      var prefSet51 = ["檜原村"];
      var prefSet52 = ["奥多摩町"];

        prefArray = [
          prefSet0,
          prefSet1,
          prefSet2,
          prefSet3,
          prefSet4,
          prefSet5,
          prefSet6,
          prefSet7,
          prefSet8,
          prefSet9,
          prefSet10,
          prefSet11,
          prefSet12,
          prefSet13,
          prefSet14,
          prefSet15,
          prefSet16,
          prefSet17,
          prefSet18,
          prefSet19,
          prefSet20,
          prefSet21,
          prefSet22,
          prefSet23,
          prefSet24,
          prefSet25,
          prefSet26,
          prefSet27,
          prefSet28,
          prefSet29,
          prefSet30,
          prefSet31,
          prefSet32,
          prefSet33,
          prefSet34,
          prefSet35,
          prefSet36,
          prefSet37,
          prefSet38,
          prefSet39,
          prefSet40,
          prefSet41,
          prefSet42,
          prefSet43,
          prefSet44,
          prefSet45,
          prefSet46,
          prefSet47,
          prefSet48,
          prefSet49,
          prefSet50,
          prefSet51,
          prefSet52
        ];

        preLabel = [
          "千代田区",
          "中央区",
          "港区",
          "新宿区",
          "文京区",
          "台東区",
          "墨田区",
          "江東区",
          "品川区",
          "目黒区",
          "大田区",
          "世田谷区",
          "渋谷区",
          "中野区",
          "杉並区",
          "豊島区",
          "北区",
          "荒川区",
          "板橋区",
          "練馬区",
          "足立区",
          "葛飾区",
          "江戸川区",
          "八王子市",
          "立川市",
          "武蔵野市",
          "三鷹市",
          "青梅市",
          "府中市",
          "昭島市",
          "調布市",
          "町田市",
          "小金井市",
          "小平市",
          "日野市",
          "東村山市",
          "国分寺市",
          "国立市",
          "福生市",
          "狛江市",
          "東大和市",
          "清瀬市",
          "東久留米市",
          "武蔵村山市",
          "多摩市",
          "稲城市",
          "羽村市",
          "あきる野市",
          "西東京市",
          "瑞穂町",
          "日の出町",
          "檜原村",
          "奥多摩町"
        ];

        kindArray = ["建物倒壊危険度","火災危険度","総合危険度"];

    };



    _my.prefArray = function(_value) {
        if (!arguments.length) return prefArray;
        prefArray = _value;
        return this;
    };

    _my.preLabel = function(_value) {
        if (!arguments.length) return preLabel;
        preLabel = _value;
        return this;
    };

    _my.kindArray = function(_value) {
        if (!arguments.length) return kindArray;
        kindArray = _value;
        return this;
    };


    //d3.rebind(_my, dispatch, "on");
    return _my;

};
