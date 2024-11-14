// app/api/scores/route.js
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// スコアを取得
export async function GET() {
  try {
    const scores = await kv.zrange('highscores', 0, 9, {
      rev: true,
      withScores: true
    });

    // スコアデータを整形
    const formattedScores = scores.map(([name, score]) => ({
      name,
      score: Math.floor(score)
    }));

    return NextResponse.json(formattedScores);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}

// 新しいスコアを保存
export async function POST(request) {
  try {
    const { name, score } = await request.json();

    // スコアを保存（ソート済みセットとして保存）
    await kv.zadd('highscores', { score, member: name });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}