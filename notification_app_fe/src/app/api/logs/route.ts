export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstream = await fetch(
      "http://20.207.122.201/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.get("authorization") || "",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await upstream.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return Response.json(data);
  } catch {
    return Response.json({ message: "log proxy failed" }, { status: 500 });
  }
}