export async function POST(req) {
  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Masukan prompt anda" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch(`https://api.kevyll.my.id/api/ai/venice?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!data.success) {
      return new Response(
        JSON.stringify({ error: "Venice API gagal merespon" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return cuma bagian 'data' supaya frontend gampang pakai
    return new Response(JSON.stringify(data.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Server Error:", err);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan server" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
