const init = () => {
	document
		.querySelector(".rules__openButton")
		.addEventListener("click", showRules);
	document.querySelectorAll(".options__button--choose").forEach((button) => {
		button.addEventListener("click", changeToStep2);
	});
	document
		.querySelector(".resultTable__button")
		.addEventListener("click", resetGame);
	showScore();
};
let player = {
	wins: Number(localStorage.getItem("wins")) || 0,
	loses: Number(localStorage.getItem("loses")) || 0,
};
let game = {
	playerPick: Number(localStorage.getItem("playerPick")) || null,
	aiPick: Number(localStorage.getItem("aiPick")) || null,
};
const winningResultsMap = {
	Rock: ["Scissors"],
	Paper: ["Rock"],
	Scissors: ["Paper"],
};
// CHANGE TO STEP 2/1
const changeToStep2 = (e) => {
	hideStep1();
	showStep2();
	setPlayerPick(e.currentTarget.dataset.pick);
	setAiPick();
	fight();
};
const resetGame = () => {
	hideStep2();
	showStep1();
	removePickedClass();
};
const removePickedClass = () => {
	const playerBorderElement = document.querySelector(
		".options__button--pickByPlayerPosition"
	);
	playerBorderElement.classList.remove(
		`options__button--background${game.playerPick}`
	);
	const aiBorderElement = document.querySelector(
		".options__button--pickByAiPosition"
	);
	aiBorderElement.classList.remove(
		`options__button--background${game.aiPick}`
	);
};
const showScore = () => {
	let scorePoints =
		Number(localStorage.getItem("wins")) -
		Number(localStorage.getItem("loses"));
	const scorePointsElement = document.querySelector(".header__points");
	scorePointsElement.innerHTML = scorePoints;
};
const fight = () => {
	const resultTitleElement = document.querySelector(".resultTable__title");
	if (game.playerPick == game.aiPick) {
		resultTitleElement.innerHTML = "DRAW";
		resultTitleElement.style.color = "yellow";
	} else if (winningResultsMap[game.playerPick].includes(game.aiPick)) {
		localStorage.setItem("wins", Number(localStorage.getItem("wins")) + 1);
		resultTitleElement.innerHTML = "WIN";
		resultTitleElement.style.color = "green";
		showScore();
	} else {
		localStorage.setItem(
			"loses",
			Number(localStorage.getItem("loses")) + 1
		);
		resultTitleElement.innerHTML = "LOSE";
		resultTitleElement.style.color = "red";
		showScore();
	}
};
const setPlayerPick = (picked) => {
	game = {
		...game,
		playerPick: picked,
	};
	const playerBorderElement = document.querySelector(
		".options__button--pickByPlayerPosition"
	);
	playerBorderElement.classList.add(`options__button--background${picked}`);
	const playerImgElement = document.querySelector(
		".options__bigSizeButtonImg--player"
	);
	playerImgElement.setAttribute("src", `./images/icon-${picked}.svg`);
};
const setAiPick = () => {
	const options = ["Rock", "Paper", "Scissors"];
	const picked = options[Math.floor(Math.random() * options.length)];
	game = {
		...game,
		aiPick: picked,
	};
	const aiBorderElement = document.querySelector(
		".options__button--pickByAiPosition"
	);
	aiBorderElement.classList.add(`options__button--background${picked}`);
	const aiImgElement = document.querySelector(
		".options__bigSizeButtonImg--ai"
	);
	aiImgElement.setAttribute("src", `./images/icon-${picked}.svg`);
};
const hideStep1 = () => {
	const step1Element = document.querySelector(".step1");
	step1Element.setAttribute("hidden", 1);
};
const showStep1 = () => {
	const step2Element = document.querySelector(".step1");
	step2Element.removeAttribute("hidden");
};
const hideStep2 = () => {
	const step1Element = document.querySelector(".step2");
	step1Element.setAttribute("hidden", 1);
};
const showStep2 = () => {
	const step2Element = document.querySelector(".step2");
	step2Element.removeAttribute("hidden");
};
// CHANGE TO STEP 2/1
//
// SHOW RULES
const showRules = () => {
	const mainRulesElement = document.querySelector(".rules");
	document.querySelector("main").setAttribute("hidden", 1);
	if (mainRulesElement.querySelector("img") !== null) {
		mainRulesElement.innerHTML = "";
		document.querySelector("main").removeAttribute("hidden");
	} else {
		createDivElement(".rules");
		createButtonElement(".rules__centerContainer");
		createImgElement(".rules__centerContainer");
	}
};
const createDivElement = (e) => {
	const DivElement = document.createElement("div");
	DivElement.classList.add("rules__centerContainer");
	document.querySelector(`${e}`).appendChild(DivElement);
};
const createButtonElement = (e) => {
	const ButtonElement = document.createElement("button");
	ButtonElement.classList.add("rules__closeButton");
	ButtonElement.addEventListener("click", showRules);
	ButtonElement.innerHTML = "X";
	document.querySelector(`${e}`).appendChild(ButtonElement);
};
const createImgElement = (e) => {
	const ImgElement = document.createElement("img");
	ImgElement.src = "./images/image-rules.svg";
	ImgElement.alt = "rules";
	ImgElement.classList.add("rules__centerImage");
	document.querySelector(`${e}`).appendChild(ImgElement);
};
// SHOW RULES
init();
