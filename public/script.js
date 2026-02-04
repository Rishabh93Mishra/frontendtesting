async function findCareers() {
    const interestInput = document.getElementById("interest");
    const budgetInput = document.getElementById("budget");
    const resultsDiv = document.getElementById("results");

    // Safety checks
    if (!interestInput || !budgetInput || !resultsDiv) {
        console.error("Required DOM elements not found");
        return;
    }

    const interest = interestInput.value.trim();
    const budget = budgetInput.value.trim();

    if (!interest || !budget) {
        resultsDiv.innerHTML = "Please enter both interest and budget.";
        return;
    }

    resultsDiv.innerHTML = "Searching careers...";

    // Auto-detect backend URL
    const API_BASE_URL =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:5000"
            : "https://testing-backend-if7h.onrender.com";

    const apiUrl = `${API_BASE_URL}/api/careers?interest=${encodeURIComponent(
        interest
    )}&budget=${encodeURIComponent(budget)}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        resultsDiv.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            resultsDiv.innerHTML = "No careers found for this budget.";
            return;
        }

        data.forEach((career) => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${career.name}</h3>
                <p>${career.description}</p>
                <p class="price">Estimated Cost: ₹${career.cost}</p>
            `;

            resultsDiv.appendChild(card);
        });
    } catch (error) {
        console.error("Fetch error:", error);
        resultsDiv.innerHTML =
            "Unable to connect to server. Please try again later.";
    }
}
