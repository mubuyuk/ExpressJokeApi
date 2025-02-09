const API_URL = "http://localhost:3000/api";

        async function fetchJokes() {
            try {
                const response = await fetch(`${API_URL}/jokes`);
                const jokes = await response.json();
                const outputDiv = document.getElementById("jokes-output");
                outputDiv.innerHTML = "";

                if (jokes.length === 0) {
                    outputDiv.innerHTML = "<p class='text-muted'>No jokes found.</p>";
                    return;
                }

                jokes.forEach(joke => {
                    const div = document.createElement("div");
                    div.className = "alert alert-secondary";
                    div.innerHTML = `<strong>Q:</strong> ${joke.question} <br> <strong>A:</strong> ${joke.answer}`;
                    outputDiv.appendChild(div);
                });
            } catch (error) {
                document.getElementById("jokes-output").innerHTML = "<p class='text-danger'>Error fetching jokes.</p>";
            }
        }

        async function addJoke() {
            const question = document.getElementById("question").value;
            const answer = document.getElementById("answer").value;

            if (!question || !answer) {
                document.getElementById("add-joke-output").innerHTML = "<p class='text-danger'>Please enter both question and answer.</p>";
                return;
            }

            try {
                const response = await fetch(`${API_URL}/joke`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question, answer, category: "General" })
                });

                const result = await response.json();
                document.getElementById("add-joke-output").innerHTML = `<p class='alert alert-success'>Joke added: <br> <strong>Q:</strong> ${result.question} <br> <strong>A:</strong> ${result.answer}</p>`;

                // Clear input fields
                document.getElementById("question").value = "";
                document.getElementById("answer").value = "";
            } catch (error) {
                document.getElementById("add-joke-output").innerHTML = "<p class='text-danger'>Error adding joke.</p>";
            }
        }

        document.getElementById("fetchJokesBtn").addEventListener("click", fetchJokes);