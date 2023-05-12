document.getElementById("tweet-button").addEventListener("click", () => {
	fetch("./tweet", {
		method: "POST",
		headers: {
			"Authorization": "Basic " + btoa(document.getElementById("username-input").value + ":" + document.getElementById("password-input").value),
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			tweet: document.getElementById("tweet-input").value
		})
	})
		.then((response) => {
			if (response.status === 401) {
				return "ユーザー名またはパスワードが間違っています";
			} else if (response.status === 403) {
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
				alert(data);
			}
		})
		.catch((error) => {
			alert(error);
		})
})
