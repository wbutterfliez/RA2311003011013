export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();

    const upstream = await fetch(
      `http://20.207.122.201/evaluation-service/notifications?${query}`,
      {
        headers: {
          Authorization: req.headers.get("authorization") || "",
        },
        cache: "no-store",
      }
    );

    const text = await upstream.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    // normalize
    const notifications = Array.isArray(data)
      ? data
      : data?.notifications || [];

    return Response.json({ notifications });
  } catch {
    return Response.json({ notifications: [] });
  }
}