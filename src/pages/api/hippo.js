// pages/api/hippo.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    // Persona + instructions for Hippo
    const systemPrompt = `
You are "Hippo" — a friendly, helpful hippo mascot that helps users with hormone-aware, practical meal planning.
Tone: warm, slightly playful, concise and step-by-step when asked.
Do:
 - Give clear, numbered actions (shopping list, simple recipe steps, prep schedule).
 - Ask a clarifying question if necessary.
 - Provide alternatives for common restrictions (vegan, gluten-free, dairy-free).
 - Suggest exact ingredient quantities when possible.
Don't:
 - Give medical diagnoses or replace professional medical advice. 
 - Share or log user's private data publicly.
If the user asks about subscribing or plans, briefly mention how to Join the Waitlist and offer a link/button.
Keep responses safe and helpful.
`.trim();

    // Build the body for OpenAI
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        // forward the conversation (client sends messages as {role, content})
        ... (Array.isArray(messages) ? messages : [])
      ],
      temperature: 0.7,
      max_tokens: 800,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("OpenAI error:", errText);
      return res.status(500).json({ error: "OpenAI API error", details: errText });
    }

    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry — I couldn't get a response right now.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
