const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const sleep = ms => new Promise(r => setTimeout(r, ms));

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
function changeTransitionTime(newTime) {
	// Get all the style sheets
	var styleSheets = document.styleSheets;

	// Loop through each style sheet
	for (var i = 0; i < styleSheets.length; i++) {
		var styleSheet = styleSheets[i];
		var rules;

		try {
			// Different browsers have different ways of accessing the CSS rules
			rules = styleSheet.cssRules || styleSheet.rules;
		} catch (err) {
			continue;
		}

		// Loop through each rule in the style sheet
		for (var j = 0; j < rules.length; j++) {
			var rule = rules[j];

			// Check if the rule has a transition property
			if (rule.style && rule.style.transition) {
				// Update the transition time value
				rule.style.transition = newTime;
			}
		}
	}
}
  