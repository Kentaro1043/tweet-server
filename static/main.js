let passwordInput = document.getElementById("password-input");
let tweetInput = document.getElementById("tweet-input");
let tweetsButton = document.getElementById("tweets-button");
let alertContainer = document.getElementById("alert-container");

// 成功アラート作成
function makeSucceedAlert() {
	let succeedAlert = document.createElement("div");
	succeedAlert.classList.add("alert", "alert-primary", "alert-dismissible", "fade", "show");
	succeedAlert.setAttribute("role", "alert");
	succeedAlert.innerHTML = " ツイートを送信しました。";
	let succeedAlertButton = document.createElement("button");
	succeedAlertButton.setAttribute("type", "button");
	succeedAlertButton.classList.add("btn-close");
	succeedAlertButton.setAttribute("data-bs-dismiss", "alert");
	succeedAlertButton.setAttribute("aria-label", "Close");
	succeedAlert.appendChild(succeedAlertButton);
	let succeedAlertIcon = document.createElement("i");
	succeedAlertIcon.classList.add("bi", "bi-check-circle");
	succeedAlert.prepend(succeedAlertIcon);
	return succeedAlert;
}

// 失敗アラート作成
function makeFailedAlert(message) {
	let failedAlert = document.createElement("div");
	failedAlert.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
	failedAlert.setAttribute("role", "alert");
	failedAlert.innerHTML = " " + message;
	let failedAlertButton = document.createElement("button");
	failedAlertButton.setAttribute("type", "button");
	failedAlertButton.classList.add("btn-close");
	failedAlertButton.setAttribute("data-bs-dismiss", "alert");
	failedAlertButton.setAttribute("aria-label", "Close");
	failedAlert.appendChild(failedAlertButton);
	let failedAlertIcon = document.createElement("i");
	failedAlertIcon.classList.add("bi", "bi-x-circle");
	failedAlert.prepend(failedAlertIcon);
	return failedAlert;
}

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
				alertContainer.appendChild(makeSucceedAlert());
			} else {
				alertContainer.appendChild(makeFailedAlert(data["error"]));
			}
		})
		.catch((error) => {
			alertContainer.appendChild(makeFailedAlert(data["error"]));
		})

	// フォームを有効化
	passwordInput.disabled = false;
	tweetInput.disabled = false;
	tweetsButton.disabled = false;
});
