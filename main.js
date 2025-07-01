document.getElementById('spoilForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const movie = document.getElementById('movie').value;
    const detail = document.getElementById('detail').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "กำลังสปอยหนัง กรุณารอสักครู่...";

    // ใช้ Gemini 2.0 Flash API และ API Key ที่ให้มา
    const API_KEY = "AIzaSyAccW1TSXJ3Iw4cY3ugIkibnWN4rb8m9V0";
    const prompt = `สปอยหนังเรื่อง "${movie}" แบบ${detail} ให้เข้าใจง่ายและน่าสนใจ`;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            // จัดรูปแบบแต่ละย่อหน้าให้สวยงาม
            const text = data.candidates[0].content.parts[0].text;
            const lines = text.split(/\n+/).filter(line => line.trim() !== "");
            resultDiv.innerHTML = lines.map(line => `<div class="spoil-line">${line}</div>`).join('');
        } else {
            resultDiv.innerHTML = "ไม่สามารถสปอยหนังได้ กรุณาลองใหม่";
        }
    } catch (err) {
        resultDiv.innerHTML = "เกิดข้อผิดพลาด: " + err.message;
    }
});