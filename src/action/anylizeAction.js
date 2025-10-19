"use server"

export async function anylizeAction(prevState, formData) {
    const imageDataUrl = String(formData.get("image") || "");
    const rid = String(formData.get("rid") || "");

    if(!imageDataUrl) {
        return {
            ok: false,
            html: 
            "<p>Tidak ada foto. Tolong foto terlebih dahulu pada kamera kalian.!</p>"
        }
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if(!OPENROUTER_API_KEY) {
        return {
            ok: false,
            html: 
            "<p>Harap Tambahkan API KEY nya dulu</p>"
        }
    }

    const model = "mistralai/mistral-small-3.2-24b-instruct:free"

    const instruction = `
        Keluarkan HASIL dalam HTML valid (tanpa <style> eksternal). Topik: analisis wajah/pose (hiburan).
        Nada tegas & ringkas. Jangan minta data lahir. beri hal hal sensitif & klaim medis/keuangan dengan konteks HIBURAN dan SARA.
        Jika TIDAK ada manusia: balas persis:
        <p> Tidak terdeteksi orang. Tolong Anda berada dalam kamera dan ambil foto lagi. </p>
        Jika ADA manusia, isi SEMUA bagian di bawah secara singkat:
        <section>
        <h2>🙂 Ekspresi Wajah</h2>
        <ul>
            <li>Emosi dominan (mis. senyum tipis/ceria/tenang/fokus)</li>
            <li>Arah pandang & gestur (menghadap kamera/menoleh; bahu rileks/tegang)</li>
            <li>Nuansa umum (rapi/kasual/enerjik)</li>
            <li>Karakter fisik (Belum Mandi, Berisi, Gak Pernah tidur)</li>
            <li>Tebak MBTI Personal (INTJ, ENTJ, INTP, dan lainnya) dengan penjelasannuya</li>
        </ul>
        </section>
        <section>
        <h2>🔮 Ramalan dari Wajah</h2>
        <article>
            <h3>💼 Pekerjaan/Karier</h3>
            <p><strong>Indikator:</strong> 1–2 poin dari ekspresi/pose.</p>
            <p><strong>Ramalan:</strong> 1–2 kalimat tegas tentang arah/peluang kerja.</p>
        </article>
        <article>
            <h3>❤️ Jodoh/Cinta</h3>
            <p><strong>Indikator:</strong> 1 poin dari bahasa tubuh/kerapian.</p>
            <p><strong>Ramalan:</strong> 1–2 kalimat positif (tidak deterministik).</p>
        </article>
        <article>
            <h3>📈 Masa Depan (1–2 tahun)</h3>
            <p><strong>Indikator:</strong> 1 poin (ketekunan/optimisme dari raut muka).</p>
            <p><strong>Ramalan:</strong> 1–2 kalimat target realistis.</p>
        </article>
        <article>
            <h3>🧭 Sikap & Kepribadian</h3>
            <p><strong>Ciri Tampak:</strong> 2–3 butir (mis. disiplin, hangat, percaya diri).</p>
        </article>
        <article>
            <h3>🍀 Keberuntungan Minggu Ini</h3>
            <p><strong>Angka:</strong> [1–99], <strong>Warna:</strong> 1 warna, <strong>Skala:</strong> 0–100.</p>
            <p><strong>Tips Singkat:</strong> 1 kalimat praktis.</p>
        </article>
        </section>
        <section>
        <h2>✅ Rekomendasi Cepat</h2>
        <ol>
            <li>To-do 1</li>
            <li>To-do 2</li>
            <li>To-do 3</li>
        </ol>
        </section>
    `;

    const body = {
        model,
        messages: [
            {
                role: "system",
                content: "Anda asisten penganalisis foto dan profesi kamu adalah seorang profesional psikeater. Keluarkan HTML ringkas dan aman"
            },
            {
                role: "user",
                content: [
                    { type: "text", text: instruction },
                    { type: "image_url", image_url: { url: imageDataUrl }}
                ]
            }
        ],
        max_tokens: 900,
        temperature: 0.2
    };

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Kamera Ramalan Foto"
        },
        body: JSON.stringify(body),
        cache: "no-store"
    });

    if(!res.ok) {
        const t = res.text()
        console.error("ERROR: ", res.status, t)
        return {
            ok: false,
            html: 
            "<p>Gagal panggil AI nya</p>"
        }
    }

    const data = await res.json();
    
    const html = String(data?.choices?.[0]?.message?.content ?? "")
    return { ok: true, html, rid}
}