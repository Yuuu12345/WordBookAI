
import OpenAI from "openai";

const key=process.env.NEXT_PUBLIC_OPENai_API_KEY

const openai =new OpenAI({
  apiKey:key
})

export async function POST(req, res) {
  try {
    const { word } = await req.json();

    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
          role: 'system',
          content: '何か質問はありますか？'
        },
        {
          role: 'user',
          content: `'${word}'について簡潔に説明してください`
        }],
        max_tokens: 100,
        stream: true,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
        fullResponse += chunk.choices[0]?.delta?.content || '';
    }

    return new Response(JSON.stringify({ explane: fullResponse }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ message: 'サーバーエラーが発生しました' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
