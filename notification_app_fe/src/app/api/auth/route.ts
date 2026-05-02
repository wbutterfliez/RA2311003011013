export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstream = await fetch(
      "http://20.207.122.201/evaluation-service/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // forward nothing special for auth; just JSON
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const text = await upstream.text(); // safer than .json()
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return Response.json({ error: "auth proxy failed" }, { status: 500 });
  }
}