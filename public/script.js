// script.js (Vercel + Local compatible)

async function findCareers() {
    const interest = document.getElementById("interest").value;
    const budget = document.getElementById("budget").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "Searching...";

    // ✅ AUTO detect environment
    const API_BASE_URL =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:5000"   // Local Flask
            : "https://testing-backend-if7h.onrender.com"; // Production Flask

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/careers?interest=${encodeURIComponent(interest)}&budget=${budget}`
        );

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();
        resultsDiv.innerHTML = "";

        if (data.length === 0) {
            resultsDiv.innerHTML = "No careers found for this budget.";
            return;
        }

        data.forEach(career => {
            resultsDiv.innerHTML += `
                <div class="card">
                    <h3>${career.name}</h3>
                    <p>${career.description}</p>
                    <p class="price">Est. Cost: ₹${career.cost}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = "Server error. Please try again later.";
    }
}
