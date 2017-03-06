



// 対応している場合
if( navigator.geolocation )
{
	// 現在地を取得
	navigator.geolocation.getCurrentPosition(

		function( _position )
		{
			var _data = _position.coords ;

			var lat = _data.latitude ;
			var lng = _data.longitude ;
			var alt = _data.altitude ;
			var accLatlng = _data.accuracy ;
			var accAlt = _data.altitudeAccuracy ;
			var heading = _data.heading ;			//0=北,90=東,180=南,270=西
			var speed = _data.speed ;

			// アラート表示
//			alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

			// HTMLへの書き出し
			document.getElementById( 'result' ).innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>' ;


		},

		// [第2引数] 取得に失敗した場合の関数
		function( error )
		{
			// エラーコード(error.code)の番号
			// 0:UNKNOWN_ERROR				原因不明のエラー
			// 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
			// 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
			// 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

			// エラー番号に対応したメッセージ
			var errorInfo = [
				"原因不明のエラーが発生しました。" ,
				"位置情報の取得が許可されませんでした。" ,
				"電波状況などで位置情報が取得できませんでした。" ,
				"位置情報の取得に時間がかかり過ぎてタイムアウトしました。"
			] ;

			var errorNo = error.code ; // エラー番号
			var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ; // エラーメッセージ
			alert( errorMessage ) ; // アラート表示
			document.getElementById("result").innerHTML = errorMessage; // HTMLに書き出し
		} ,

		// [第3引数] オプション
		{
			"enableHighAccuracy": false,
			"timeout": 8000,
			"maximumAge": 2000,
		}

	) ;
}

// 対応していない場合
else
{
	var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ; // エラーメッセージ
	alert( errorMessage ) ; // アラート表示
	document.getElementById( 'result' ).innerHTML = errorMessage ; // HTMLに書き出し
}
