export async function onRequestPost(context) {
  const origin = new URL(context.request.url).origin;
  const allowedOrigin = origin;

  if (context.request.headers.get("Origin") &&
      context.request.headers.get("Origin") !== allowedOrigin) {
    return json({ error: "Origin not allowed." }, 403);
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return json({ error: "Prompt is required." }, 400);
  if (prompt.length > 12000) return json({ error: "Prompt is too long." }, 413);

  const apiKey = context.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: "Gemini API is not configured on the server." }, 500);

  // Use a current Flash model. Change this server-side if Google changes availability.
  const model = "gemini-3.7-flash";
  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      const message = data?.error?.message || "Gemini request failed.";
      return json({ error: message }, upstream.status >= 500 ? 502 : upstream.status);
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("")
      .trim();

    if (!text) return json({ error: "Gemini returned an empty response." }, 502);

    return json({ text });
  } catch (error) {
    return json({ error: "Could not connect to Gemini." }, 502);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
