document.getElementById("tweets-button").addEventListener("click", () => {
	fetch("./tweets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
		    password: document.getElementById("password-input").value,
			tweet: document.getElementById("tweet-input").value
		})
	})
		.then((response) => {
			if (response.status === 401 || response.status === 403) {
				return response.json();
			} else if (!response.ok) {
				throw new Error(response.status);
			}
			return "OK";
		})
		.then((data) => {
			if (data === "OK") {
				alert("ツイートを送信しました");
			} else {
				alert(data["error"]);
			}
		})
		.catch((error) => {
			alert(error);
		})
});
