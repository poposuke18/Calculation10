// route.js の修正
export async function GET() {
    try {
      const scores = await kv.zrange('highscores', 0, 9, {
        rev: true,
        withScores: true
      });
  
      // スコアデータが配列でない場合の対応を追加
      if (!Array.isArray(scores)) {
        return NextResponse.json([]);
      }
  
      const formattedScores = scores.map(([name, score]) => ({
        name: String(name),
        score: Math.floor(Number(score))
      }));
  
      return NextResponse.json(formattedScores);
    } catch (error) {
      console.error('Score fetch error:', error);
      return NextResponse.json([]);
    }
  }
  
  export async function POST(request) {
    try {
      const { name, score } = await request.json();
      
      // 入力値の検証を追加
      if (!name || typeof name !== 'string' || name.length !== 3 || !/^[A-Za-z]+$/.test(name)) {
        return NextResponse.json({ error: 'Invalid name format' }, { status: 400 });
      }
  
      if (!score || typeof score !== 'number' || score < 0) {
        return NextResponse.json({ error: 'Invalid score format' }, { status: 400 });
      }
  
      await kv.zadd('highscores', { score, member: name.toUpperCase() });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Score save error:', error);
      return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
    }
  }
  
  // ScoreInput.js の修正
  const handleSubmit = async () => {
    if (name.length !== 3) {
      setError('Please enter exactly 3 letters');
      return;
    }
    
    if (!/^[A-Za-z]+$/.test(name)) {
      setError('Please use only letters');
      return;
    }
  
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name.toUpperCase(),
          score: Math.floor(score)
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to submit score');
        return;
      }
  
      await onSubmit(name.toUpperCase());
    } catch (error) {
      console.error('Score submission error:', error);
      setError('Failed to submit score. Please try again.');
    }
  };