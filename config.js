// データセットのプロジェクトIDを指定
var ldDataset = 'rdf1s1674i';
// データセットのファイル名を指定
var ldFileName = 'lod_challenge_events';


var labelTitle = "http://www.w3.org/2000/01/rdf-schema#label";
var labelStartDate = "http://schema.org/startDate";
var labelEndDate = "http://schema.org/endDate";
var allDayFlag = false;
// ヨコハマアートLOD用設定
var now = moment().subtract('days',1).format("YYYY-MM-DDT00:00:00+09:00");
var colors = ["limegreen", "gray", "purple", "darkblue", "green", "darkorange", "darkcyan", "brown", "lightseagreen"];
