import { useState } from "react";

const questions = [
  {
    id: 1,
    text: "何か新しいことを始めようとしたとき、最初に頭に浮かぶのは？",
    options: [
      { label: "うまくいくかな、失敗したらどうしよう", value: "fear" },
      { label: "まず何から始めればいいか考える", value: "plan" },
      { label: "自分にできるかどうか自信がない", value: "doubt" },
      { label: "やってみてから考えればいい", value: "action" },
    ],
  },
  {
    id: 2,
    text: "誰かに褒められたとき、正直どう感じる？",
    options: [
      { label: "素直にうれしい", value: "open" },
      { label: "お世辞じゃないかと思う", value: "deflect" },
      { label: "たまたまうまくいっただけと思う", value: "minimize" },
      { label: "次も期待に応えなきゃと焦る", value: "pressure" },
    ],
  },
  {
    id: 3,
    text: "「自分らしく生きる」という言葉を聞いたとき、感じるのは？",
    options: [
      { label: "憧れる、でもどうすればいいか分からない", value: "lost" },
      { label: "自分はもうできていると思う", value: "aware" },
      { label: "きれいごとに聞こえる", value: "cynical" },
      { label: "少し罪悪感がある（できていない気がする）", value: "guilt" },
    ],
  },
  {
    id: 4,
    text: "物事がうまくいかないとき、真っ先に何を思う？",
    options: [
      { label: "自分のせいだ、もっと頑張れたはず", value: "self_blame" },
      { label: "状況や環境が悪かった", value: "external" },
      { label: "やっぱり自分には無理だったんだ", value: "defeat" },
      { label: "何が原因か分析しようとする", value: "analyze" },
    ],
  },
  {
    id: 5,
    text: "「休む」ことに対して、自分の本音は？",
    options: [
      { label: "必要なことだと思えて、罪悪感はない", value: "healthy" },
      { label: "休むと遅れをとる気がして落ち着かない", value: "driven" },
      { label: "休む資格は結果を出してからだと思っている", value: "conditional" },
      { label: "休みたいのに、なぜか体が動いてしまう", value: "compulsive" },
    ],
  },
];

const patternMap = {
  fear: "回避型",
  doubt: "回避型",
  deflect: "自己否定型",
  minimize: "自己否定型",
  pressure: "完璧主義型",
  conditional: "完璧主義型",
  driven: "完璧主義型",
  compulsive: "完璧主義型",
  self_blame: "自己批判型",
  defeat: "自己批判型",
  guilt: "自己批判型",
  lost: "迷子型",
  cynical: "防衛型",
  external: "防衛型",
  plan: "バランス型",
  action: "バランス型",
  open: "バランス型",
  aware: "バランス型",
  analyze: "バランス型",
  healthy: "バランス型",
};

const patternData = {
  回避型: {
    emoji: "🌀",
    title: "回避型",
    subtitle: "「失敗が怖い」が行動を止めている",
    description:
      "新しいことに踏み出す前に、脳が自動的にリスクを計算し始めます。これは生存本能の名残。でも現代では、その「安全装置」が成長を邪魔していることが多い。",
    insight:
      "あなたが「やらない」のは、能力がないからではなく、脳が「傷つきたくない」と言っているから。",
    next: "その恐怖の正体を言語化するだけで、行動が変わり始めます。",
    advice: "「怖い」と感じたとき、その感情を否定しなくていい。ただ一度だけ、怖さに名前をつけてみて。「失敗が怖い」ではなく「〇〇と思われるのが怖い」まで掘り下げると、脳は急に冷静になります。行動できないのは意志が弱いからじゃない。回路を知れば、回路は変えられる。",
    color: "#7C9EBF",
  },
  自己否定型: {
    emoji: "🪞",
    title: "自己否定型",
    subtitle: "褒められても「でも…」と打ち消してしまう",
    description:
      "良いことが起きても、それを自分のものとして受け取れない。褒め言葉を跳ね返したり、成功を「たまたま」と片付けるのは、深い部分に「自分はそれに値しない」という信念があるサイン。",
    insight:
      "これはインポスター症候群とも呼ばれます。能力の問題ではなく、自己像と現実がずれているだけ。",
    next: "「受け取る」練習が、最初の一歩になります。",
    advice: "今日から一つだけ試してほしいことがある。褒められたとき「ありがとうございます」とだけ言って、それ以上何も足さない。打ち消さない、謙遜しない、ただ受け取る。これだけでいい。自己像は、小さな受け取りの積み重ねで少しずつ書き換えられていきます。",
    color: "#B07FAC",
  },
  完璧主義型: {
    emoji: "⚙️",
    title: "完璧主義型",
    subtitle: "「もっとできるはず」が休ませてくれない",
    description:
      "高い基準を持つこと自体は力。でも「完璧でなければ意味がない」という信念は、終わりのないレースを生み出す。休んでいる自分に罪悪感を感じるとき、それは休息を禁じているルールが動いている。",
    insight:
      "その「もっと頑張れ」という声は、誰かの言葉がいつの間にか自分の声になったものかもしれない。",
    next: "そのルールの出所を探ってみることが、解放の入口です。",
    advice: "「完璧にやらなきゃ」と思ったとき、一度だけ自分に聞いてみて。「これは自分が決めたルールか、それとも誰かに植えつけられたルールか」。他人の基準で自分を動かし続けることほど、消耗することはない。あなたの基準は、あなたが決めていい。",
    color: "#C4956A",
  },
  自己批判型: {
    emoji: "🔍",
    title: "自己批判型",
    subtitle: "うまくいかないと、まず自分を責める",
    description:
      "失敗を自分の欠陥として結びつけるパターン。責任感が強い証拠でもあるけれど、過剰になると「どうせ自分には無理」という思い込みを強化し続ける。",
    insight:
      "自己批判は、改善のためではなく「罰」として使われていることが多い。罰は学習を止める。",
    next: "「何が悪かったか」より「次どうするか」へ。問いを変えると脳の反応が変わります。",
    advice: "うまくいかなかったとき、「自分はダメだ」ではなく「今回はこのやり方が合わなかった」に変えてみて。主語を「自分」から「やり方」にずらすだけで、脳の反応が変わります。あなたの価値は、結果とイコールじゃない。それは本当のことです。",
    color: "#8B9E7C",
  },
  迷子型: {
    emoji: "🧭",
    title: "迷子型",
    subtitle: "「自分らしく」が分からなくて当然",
    description:
      "「自分らしさ」を失ったのではなく、最初から定義する機会がなかっただけかもしれない。憧れるのに踏み出せないのは、自己理解よりも先に「正解探し」をしているから。",
    insight:
      "「自分らしさ」は発見するものではなく、行動の積み重ねの中で形成されていくもの。",
    next: "「好きかどうか」より先に「やったかどうか」を問いにする。",
    advice: "自分が何者かを知りたいなら、考えるより先に動いてみて。好きかどうかは、やってみてから決めればいい。「やってみたら違った」も、立派な自己理解です。迷子なのは、まだ地図を持っていないだけ。地図は、歩きながら作るもの。",
    color: "#6B9E9E",
  },
  防衛型: {
    emoji: "🛡️",
    title: "防衛型",
    subtitle: "きれいごとに見えるのは、傷ついた経験があるから",
    description:
      "「自分らしく」という言葉に冷めた感覚があるのは、過去に理想を持って傷ついた経験があるからかもしれない。懐疑的な視点は知性の証。でも、それが壁になっていないか確認する価値はある。",
    insight:
      "防衛は過去の傷から自分を守るために生まれた。でも今もそれが必要かどうか、一度検証してみる。",
    next: "「信じたい気持ち」と「信じられない記憶」の両方を持っていい。",
    advice: "疑う力は武器になる。でも、その矛先が自分の可能性にまで向いていないか確認してみて。「どうせ無理」「また同じことになる」は、過去の経験から来た予測であって、未来の事実じゃない。壁を持ったまま、少しだけ扉を開けてみることはできる。",
    color: "#9E8B6B",
  },
  バランス型: {
    emoji: "🌿",
    title: "バランス型",
    subtitle: "自分との対話ができている状態",
    description:
      "今この瞬間、比較的フラットに自分を見られている状態にある。これは固定されたものではなく、状況によって揺れることもある。大切なのは、揺れに気づける自分でいること。",
    insight:
      "「問題がない」のではなく、「問題を扱える自分がいる」状態。それは積み重ねてきた結果。",
    next: "この状態をどう維持するか、そして次のレベルへ何が必要かを問いにしてみて。",
    advice: "今のあなたは、自分の軸を持てている状態にある。それは当たり前じゃない。次のステップは「維持する」ことより「深める」こと。自分が本当に大切にしている価値観を、言葉にしてみて。言語化できると、ブレそうなときの戻り場所になります。",
    color: "#7A9E82",
  },
};

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result | ai
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (value) => {
    setSelected(value);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        // tally
        const counts = {};
        newAnswers.forEach((v) => {
          const p = patternMap[v] || "バランス型";
          counts[p] = (counts[p] || 0) + 1;
        });
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        setResult(patternData[top]);
        setPhase("result");
      }
    }, 350);
  };

  const askAI = async () => {
    setPhase("ai");
    setAiLoading(true);
    const answerLabels = answers.map((v, i) => {
      const q = questions[i];
      const opt = q.options.find((o) => o.value === v);
      return `Q${i + 1}: ${q.text}\n→ ${opt?.label}`;
    });

    const prompt = `あなたは無意識のパターンと思い込みの専門家です。
以下のユーザーの回答を分析して、その人の無意識のパターンについて、温かくも鋭い洞察を日本語で200字程度で伝えてください。
診断タイプは「${result.title}」です。

回答：
${answerLabels.join("\n")}

注意：説教的にならず、共感と気づきを重視した語り口で。`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((c) => c.text || "").join("") || "応答を取得できませんでした。";
      setAiResponse(text);
    } catch {
      setAiResponse("AIの応答を取得できませんでした。");
    }
    setAiLoading(false);
  };

  const reset = () => {
    setPhase("intro");
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setAiResponse("");
    setSelected(null);
  };

  const progress = ((current) / questions.length) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0E0E0E",
      color: "#E8E4DC",
      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .fade-in { animation: fadeIn 0.6s ease forwards; }
        .option-btn {
          background: transparent;
          border: 1px solid rgba(232,228,220,0.2);
          color: #E8E4DC;
          padding: 14px 18px;
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          font-size: 15px;
          line-height: 1.6;
          transition: all 0.2s ease;
          width: 100%;
        }
        .option-btn:hover { background: rgba(232,228,220,0.08); border-color: rgba(232,228,220,0.5); }
        .option-btn.selected { background: rgba(232,228,220,0.15); border-color: #E8E4DC; }
        .primary-btn {
          background: #E8E4DC;
          color: #0E0E0E;
          border: none;
          padding: 14px 32px;
          border-radius: 6px;
          font-family: inherit;
          font-size: 15px;
          cursor: pointer;
          transition: opacity 0.2s;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .primary-btn:hover { opacity: 0.85; }
        .ghost-btn {
          background: transparent;
          color: rgba(232,228,220,0.5);
          border: 1px solid rgba(232,228,220,0.2);
          padding: 12px 24px;
          border-radius: 6px;
          font-family: inherit;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ghost-btn:hover { color: #E8E4DC; border-color: rgba(232,228,220,0.5); }
      `}</style>

      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* INTRO */}
        {phase === "intro" && (
          <div className="fade-in" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, letterSpacing: "0.15em", color: "rgba(232,228,220,0.5)", marginBottom: 8, fontFamily: "inherit" }}>
              kurona_glow
            </div>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "rgba(232,228,220,0.25)", marginBottom: 32, textTransform: "uppercase" }}>
              Mindset Pattern Diagnosis
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 400, lineHeight: 1.5, marginBottom: 16, letterSpacing: "0.02em" }}>
              あなたの中で<br />静かに動いているパターン
            </h1>
            <p style={{ fontSize: 15, color: "rgba(232,228,220,0.6)", lineHeight: 1.9, marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>
              5つの問いに答えるだけで、<br />
              無意識の思い込みの傾向が見えてきます。
            </p>
            <button className="primary-btn" onClick={() => setPhase("quiz")}>
              診断をはじめる
            </button>
            <div style={{ marginTop: 16, fontSize: 13, color: "rgba(232,228,220,0.3)" }}>
              所要時間 約2分
            </div>
          </div>
        )}

        {/* QUIZ */}
        {phase === "quiz" && (
          <div className="fade-in" key={current}>
            {/* progress */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: "rgba(232,228,220,0.4)" }}>
                <span>{current + 1} / {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 1, background: "rgba(232,228,220,0.1)", borderRadius: 4 }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "rgba(232,228,220,0.4)", borderRadius: 4, transition: "width 0.4s ease" }} />
              </div>
            </div>

            <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 28, fontWeight: 400 }}>
              {questions[current].text}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {questions[current].options.map((opt) => (
                <button
                  key={opt.value}
                  className={`option-btn ${selected === opt.value ? "selected" : ""}`}
                  onClick={() => handleAnswer(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && result && (
          <div className="fade-in">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{result.emoji}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(232,228,220,0.4)", marginBottom: 8, textTransform: "uppercase" }}>
                Your Pattern
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 400, marginBottom: 8 }}>{result.title}</h2>
              <p style={{ fontSize: 14, color: result.color, letterSpacing: "0.05em" }}>{result.subtitle}</p>
            </div>

            <div style={{ borderTop: "1px solid rgba(232,228,220,0.1)", borderBottom: "1px solid rgba(232,228,220,0.1)", padding: "28px 0", marginBottom: 28 }}>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(232,228,220,0.8)", marginBottom: 20 }}>
                {result.description}
              </p>
              <div style={{ background: "rgba(232,228,220,0.05)", borderLeft: `3px solid ${result.color}`, padding: "14px 16px", borderRadius: "0 6px 6px 0" }}>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(232,228,220,0.9)", margin: 0 }}>
                  💡 {result.insight}
                </p>
              </div>
            </div>

            <p style={{ fontSize: 14, color: "rgba(232,228,220,0.5)", lineHeight: 1.8, marginBottom: 32 }}>
              → {result.next}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button className="primary-btn" onClick={() => setPhase("advice")}>
                ワンポイントアドバイスをもらう
              </button>
              <button className="ghost-btn" onClick={reset}>
                もう一度やり直す
              </button>
            </div>
          </div>
        )}

        {/* ADVICE */}
        {phase === "advice" && result && (
          <div className="fade-in">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(232,228,220,0.4)", marginBottom: 12, textTransform: "uppercase" }}>
                One Point Advice
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 400 }}>あなたへのワンポイント</h2>
            </div>
            <div style={{ background: "rgba(232,228,220,0.04)", border: `1px solid ${result.color}40`, borderRadius: 8, padding: "24px", marginBottom: 32 }}>
              <p style={{ fontSize: 15, lineHeight: 2, color: "rgba(232,228,220,0.85)", margin: 0, whiteSpace: "pre-wrap" }}>
                {result.advice}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button className="primary-btn" onClick={() => setPhase("result")}>
                診断結果に戻る
              </button>
              <button className="ghost-btn" onClick={reset}>
                最初からやり直す
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, textAlign: "center", fontSize: 12, letterSpacing: "0.15em", color: "rgba(232,228,220,0.2)" }}>
          kurona_glow
        </div>

      </div>
    </div>
  );
}
