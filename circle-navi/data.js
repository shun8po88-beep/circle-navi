// ======================================================
// 団体データ(サンプル20件)
// 実データはこのファイルを差し替えるだけでOK
// axes: a=活動スタイル(A:アクティブ/C:まったり)
//        g=コミット度(G:ガチ/E:エンジョイ)
//        w=人間関係(W:大人数/F:少人数)
//        s=目的(S:スキル実績/H:居場所)
// kubun: "club"=部活(公認) "circle_k"=サークル(公認)
//        "circle_h"=サークル(非公認) "gakusei"=学生団体
// campus: "nishichiba" | "inohana" | "matsudo"
// drink: 0=ほぼ無し 1=たまに 2=多め
// feeHalf: 半期会費(円) feeOther: その他年間目安(円)
// days: 週の活動日数
// verified: true=団体本人回答 false=運営推定
// ======================================================

const GROUPS = [
  { id: "g01", name: "硬式テニスサークル SUNRISE", genre: "運動系", activity: "硬式テニス", kubun: "circle_k", incare: false, campus: "nishichiba", axes: { a: "A", g: "E", w: "W", s: "H" }, days: 2, feeHalf: 8000, feeOther: 30000, drink: 2, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 80, insta: "https://instagram.com/example_sunrise", verified: true },
  { id: "g02", name: "フットサルサークル KICKS", genre: "運動系", activity: "フットサル", kubun: "circle_h", incare: false, campus: "nishichiba", axes: { a: "A", g: "E", w: "W", s: "H" }, days: 1, feeHalf: 5000, feeOther: 10000, drink: 1, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 60, insta: "https://instagram.com/example_kicks", verified: true },
  { id: "g03", name: "バドミントン部", genre: "運動系", activity: "バドミントン", kubun: "club", incare: false, campus: "nishichiba", axes: { a: "A", g: "G", w: "F", s: "S" }, days: 4, feeHalf: 6000, feeOther: 20000, drink: 0, eventLove: false, beginner: false, genderMix: true, midEntry: false, size: 30, insta: "https://instagram.com/example_badminton", verified: true },
  { id: "g04", name: "陸上競技部", genre: "運動系", activity: "陸上競技", kubun: "club", incare: false, campus: "nishichiba", axes: { a: "A", g: "G", w: "W", s: "S" }, days: 5, feeHalf: 10000, feeOther: 40000, drink: 0, eventLove: false, beginner: false, genderMix: true, midEntry: false, size: 50, insta: "https://instagram.com/example_track", verified: false },
  { id: "g05", name: "バスケサークル DUNKERS", genre: "運動系", activity: "バスケットボール", kubun: "circle_h", incare: true, campus: "nishichiba", axes: { a: "A", g: "E", w: "W", s: "H" }, days: 2, feeHalf: 4000, feeOther: 15000, drink: 2, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 70, insta: "https://instagram.com/example_dunkers", verified: true },
  { id: "g06", name: "山岳サークル 岳", genre: "運動系", activity: "登山・アウトドア", kubun: "circle_k", incare: false, campus: "nishichiba", axes: { a: "A", g: "G", w: "F", s: "H" }, days: 1, feeHalf: 3000, feeOther: 50000, drink: 0, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 25, insta: "https://instagram.com/example_gaku", verified: false },
  { id: "g07", name: "ダンスサークル FLOW", genre: "運動系", activity: "ストリートダンス", kubun: "circle_k", incare: false, campus: "nishichiba", axes: { a: "A", g: "G", w: "W", s: "S" }, days: 3, feeHalf: 7000, feeOther: 25000, drink: 1, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 90, insta: "https://instagram.com/example_flow", verified: true },
  { id: "g08", name: "軽音楽サークル SOUND MILL", genre: "音楽系", activity: "バンド活動", kubun: "circle_k", incare: false, campus: "nishichiba", axes: { a: "C", g: "E", w: "W", s: "H" }, days: 1, feeHalf: 5000, feeOther: 10000, drink: 2, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 100, insta: "https://instagram.com/example_soundmill", verified: true },
  { id: "g09", name: "アカペラサークル Voces", genre: "音楽系", activity: "アカペラ", kubun: "circle_h", incare: false, campus: "nishichiba", axes: { a: "C", g: "G", w: "F", s: "S" }, days: 2, feeHalf: 4000, feeOther: 8000, drink: 1, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 45, insta: "https://instagram.com/example_voces", verified: false },
  { id: "g10", name: "吹奏楽団", genre: "音楽系", activity: "吹奏楽", kubun: "club", incare: false, campus: "nishichiba", axes: { a: "C", g: "G", w: "W", s: "S" }, days: 3, feeHalf: 9000, feeOther: 15000, drink: 0, eventLove: false, beginner: false, genderMix: true, midEntry: false, size: 60, insta: "https://instagram.com/example_suisou", verified: true },
  { id: "g11", name: "写真サークル Lens", genre: "文化系", activity: "写真撮影・展示", kubun: "circle_k", incare: false, campus: "nishichiba", axes: { a: "C", g: "E", w: "F", s: "H" }, days: 1, feeHalf: 2000, feeOther: 5000, drink: 0, eventLove: false, beginner: true, genderMix: true, midEntry: true, size: 30, insta: "https://instagram.com/example_lens", verified: true },
  { id: "g12", name: "茶道部", genre: "文化系", activity: "茶道", kubun: "club", incare: false, campus: "nishichiba", axes: { a: "C", g: "G", w: "F", s: "H" }, days: 2, feeHalf: 5000, feeOther: 10000, drink: 0, eventLove: false, beginner: true, genderMix: true, midEntry: true, size: 20, insta: "https://instagram.com/example_sadou", verified: false },
  { id: "g13", name: "ボードゲームサークル MEEPLE", genre: "文化系", activity: "ボードゲーム", kubun: "circle_h", incare: false, campus: "nishichiba", axes: { a: "C", g: "E", w: "F", s: "H" }, days: 1, feeHalf: 1000, feeOther: 0, drink: 0, eventLove: false, beginner: true, genderMix: true, midEntry: true, size: 35, insta: "https://instagram.com/example_meeple", verified: true },
  { id: "g14", name: "国際交流サークル BRIDGE", genre: "文化系", activity: "留学生交流・語学", kubun: "circle_k", incare: true, campus: "nishichiba", axes: { a: "C", g: "E", w: "W", s: "S" }, days: 1, feeHalf: 3000, feeOther: 5000, drink: 1, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 55, insta: "https://instagram.com/example_bridge", verified: true },
  { id: "g15", name: "ビジネスコンテスト団体 IGNITE", genre: "学生団体", activity: "ビジコン企画・運営", kubun: "gakusei", incare: true, campus: "nishichiba", axes: { a: "A", g: "G", w: "W", s: "S" }, days: 2, feeHalf: 0, feeOther: 5000, drink: 1, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 40, insta: "https://instagram.com/example_ignite", verified: true },
  { id: "g16", name: "教育ボランティア team SEED", genre: "学生団体", activity: "学習支援ボランティア", kubun: "gakusei", incare: false, campus: "nishichiba", axes: { a: "C", g: "G", w: "F", s: "S" }, days: 1, feeHalf: 0, feeOther: 3000, drink: 0, eventLove: false, beginner: true, genderMix: true, midEntry: true, size: 25, insta: "https://instagram.com/example_seed", verified: false },
  { id: "g17", name: "医学部軟式野球部", genre: "運動系", activity: "軟式野球", kubun: "club", incare: false, campus: "inohana", axes: { a: "A", g: "E", w: "W", s: "H" }, days: 2, feeHalf: 8000, feeOther: 20000, drink: 1, eventLove: true, beginner: true, genderMix: false, midEntry: true, size: 40, insta: "https://instagram.com/example_ino_baseball", verified: false },
  { id: "g18", name: "看護研究サークル CARE", genre: "文化系", activity: "看護・医療の勉強会", kubun: "circle_k", incare: false, campus: "inohana", axes: { a: "C", g: "G", w: "F", s: "S" }, days: 1, feeHalf: 1000, feeOther: 0, drink: 0, eventLove: false, beginner: true, genderMix: true, midEntry: true, size: 20, insta: "https://instagram.com/example_care", verified: true },
  { id: "g19", name: "園芸サークル GREEN HANDS", genre: "文化系", activity: "農園・ガーデニング", kubun: "circle_k", incare: false, campus: "matsudo", axes: { a: "C", g: "E", w: "F", s: "H" }, days: 1, feeHalf: 2000, feeOther: 3000, drink: 0, eventLove: false, beginner: true, genderMix: true, midEntry: true, size: 30, insta: "https://instagram.com/example_greenhands", verified: true },
  { id: "g20", name: "よさこいサークル 千風", genre: "運動系", activity: "よさこい・演舞", kubun: "circle_k", incare: true, campus: "nishichiba", axes: { a: "A", g: "G", w: "W", s: "H" }, days: 3, feeHalf: 6000, feeOther: 35000, drink: 1, eventLove: true, beginner: true, genderMix: true, midEntry: true, size: 110, insta: "https://instagram.com/example_chikaze", verified: true }
];

// ======================================================
// 16タイプ定義(キー: 活動+コミット+人間関係+目的)
// ======================================================
const TYPES = {
  AGWS: { name: "体育会エース", copy: "本気の勝負と仲間の熱量、どちらも欲しい実力派。", desc: "大人数の中で結果を追いかけるのが一番燃えるタイプ。部活や大会志向の大型サークルで輝きます。" },
  AGWH: { name: "熱血ムードメーカー", copy: "ガチで打ち込みつつ、チームの空気も大事にする。", desc: "本気の活動の中に居場所を求めるタイプ。全力で頑張る仲間と一緒にいることがエネルギー源です。" },
  AGFS: { name: "求道者アスリート", copy: "少数精鋭でストイックに上を目指す。", desc: "群れるより、本気の少人数で技を磨きたいタイプ。専門性の高い部活・競技系が向いています。" },
  AGFH: { name: "少数精鋭プレイヤー", copy: "信頼できる仲間と、本気の時間を積み重ねる。", desc: "気の合う数人と深く打ち込むのが理想。小規模でも活動が濃い団体と相性抜群です。" },
  AEWS: { name: "イベントリーダー", copy: "動いて、企画して、経験を実績に変える。", desc: "アクティブに楽しみながら、将来につながる経験も欲しいタイプ。イベント系・企画系の大型団体向き。" },
  AEWH: { name: "祭りの中心", copy: "大人数でワイワイ、楽しさこそ正義。", desc: "みんなで盛り上がる時間が何より好き。エンジョイ系の大型スポーツサークルやイベントサークルが天職です。" },
  AEFS: { name: "アクティブ職人", copy: "体を動かしつつ、自分のスキルも磨きたい。", desc: "楽しく活動しながら、着実に上達したいタイプ。少人数で丁寧に教え合える団体が合います。" },
  AEFH: { name: "仲良しスポーツ派", copy: "気の合う仲間と、ゆるく楽しく体を動かす。", desc: "勝ち負けより一緒に過ごす時間が大事。小規模でアットホームな運動系サークルがぴったり。" },
  CGWS: { name: "プロデューサー", copy: "大きな舞台を、本気で作り上げる側の人。", desc: "文化系の活動を大人数で本気でやりたいタイプ。演奏会・公演・大規模企画のある団体で力を発揮します。" },
  CGWH: { name: "文化祭の主役", copy: "本気の作品づくりと、にぎやかな仲間たち。", desc: "打ち込める文化系活動と、大勢の居心地いい仲間の両方を求めるタイプ。大型の音楽・パフォーマンス系向き。" },
  CGFS: { name: "静かな職人", copy: "少人数で、じっくり深く極める。", desc: "騒がしさより集中できる環境が好き。専門性のある文化系・研究系の団体で真価を発揮します。" },
  CGFH: { name: "こだわり仲間派", copy: "好きなことを、好きな人たちと深く。", desc: "共通の趣味で深くつながれる少人数の団体が理想。伝統文化系や創作系と好相性です。" },
  CEWS: { name: "器用な社交家", copy: "楽しみながら、人脈も経験も広げていく。", desc: "ゆるく楽しみつつ将来にも目を向けるバランス型。交流系・国際系の団体が合います。" },
  CEWH: { name: "サロンの住人", copy: "にぎやかな場所で、のんびり自分らしく。", desc: "大人数の中でまったり過ごすのが心地いいタイプ。ゆるめの大型文化系サークルがおすすめ。" },
  CEFS: { name: "マイペース研究家", copy: "自分のペースで、興味をとことん掘る。", desc: "少人数で気楽に、でも中身のある活動がしたいタイプ。趣味系・学術系の小規模団体向き。" },
  CEFH: { name: "縁側ゆったり", copy: "居心地のよさが、いちばんのごちそう。", desc: "ホッとできる居場所を求めるタイプ。ゆるくて温かい小規模サークルがぴったりです。" }
};

// 診断の質問(7段階: 左=そう思う +3 〜 右=そう思わない -3)
// axis: 集計先 / rev: trueなら符号反転
const QUESTIONS = [
  { text: "体を動かすのが好き", axis: "a", rev: false },
  { text: "インドアな趣味の方が合う", axis: "a", rev: true },
  { text: "大会や発表で結果を出したい", axis: "g", rev: false },
  { text: "楽しさ重視でゆるくやりたい", axis: "g", rev: true },
  { text: "大人数でワイワイしたい", axis: "w", rev: false },
  { text: "少人数で深く付き合いたい", axis: "w", rev: true },
  { text: "就活や将来に活きる経験がしたい", axis: "s", rev: false },
  { text: "居心地のいい居場所がほしい", axis: "s", rev: true },
  { text: "飲み会は多くてもいい", axis: "drink", rev: false },
  { text: "合宿や学祭には積極的に参加したい", axis: "event", rev: false },
  { text: "経験のあることを続けたい", axis: "exp", rev: false },
  { text: "男女比は気にしない", axis: "gender", rev: false }
];
