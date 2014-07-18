# FullCalendar LinkData

[FullCalendar] で[LinkData]のデータを使えるようにしました。

## デモ

<http://uedayou.net/fullcalendar-linkdata-js/>

## 使い方

config.js に[LinkData]のデータセットのプロジェクトIDとファイル名、名前、開始・終了時間の項目名を入力してください。

	// データセットのプロジェクトIDを指定
	var ldDataset = 'rdf1s1674i';
	// データセットのファイル名を指定
	var ldFileName = 'lod_challenge_events';

	// LinkData で設定した各データの名前の項目名を入力
	var labelTitle = "http://www.w3.org/2000/01/rdf-schema#label";
	// LinkData で設定した開始時間の項目名を入力
	var labelStartDate = "http://schema.org/startDate";
	// LinkData で設定した終了時間の項目名を入力（※任意)
	var labelEndDate = "http://schema.org/endDate";

## 利用ライブラリ

- [FullCalendar]
- [jQuery]
- [Bootstrap]
- [bootstrap-modal]

## ライセンス

Copyright &copy; 2014 Hiroshi Ueda([@uedayou]). Licensed under the [MIT license][mit].

[LinkData]:http://linkdata.org/
[FullCalendar]:http://arshaw.com/fullcalendar/
[jQuery]:http://jquery.com/
[Bootstrap]:http://getbootstrap.com/
[bootstrap-modal]:https://github.com/jschr/bootstrap-modal
[MIT]: http://www.opensource.org/licenses/mit-license.php
[@uedayou]:https://twitter.com/uedayou