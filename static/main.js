let passwordInput = document.getElementById("password-input");
let tweetInput = document.getElementById("tweet-input");
let tweetsButton = document.getElementById("tweets-button");



document.getElementById("tweets-button").addEventListener("click", () => {
	// フォームを無効化
	passwordInput.disabled = true;
	tweetInput.disabled = true;
	tweetsButton.disabled = true;

	// ツイートを送信
	fetch("./tweets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
		    password: passwordInput.value,
			tweet: tweetInput.value
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

	// フォームを有効化
	passwordInput.disabled = false;
	tweetInput.disabled = false;
	tweetsButton.disabled = false;
});
