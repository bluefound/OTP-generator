// Get all input fields with the class "otp-input-fields"
const inputs = document.querySelectorAll(".otp-input-fields input");

// Iterate over each input field
inputs.forEach((input, index) => {
	// Add a custom attribute "data-index" to store the index of the input field
	input.dataset.index = index;

	// Add event listeners for focus, keydown, paste, and keyup events
	input.addEventListener("focus", clear);
	input.addEventListener("keydown", clear);
	input.addEventListener("paste", onPaste);
	input.addEventListener("keyup", onKeyUp);
});

// Function to clear the input field
function clear($event) {
	$event.target.value = "";
}

// Function to check if the input is a number
function checkNumber(number) {
	return /[0-9]/g.test(number);
}

// Function to handle paste event
function onPaste($event) {
	// Get the pasted data
	const data = $event.clipboardData.getData("text");

	// Remove spaces and split the data into an array of characters
	const value = data.replace(/ /g, "").split("");

	// Check if all characters are numbers
	if (!value.some((number) => !checkNumber(number))) {
		// If the length of the array matches the number of input fields
		if (value.length === inputs.length) {
			// Fill each input field with the corresponding character
			inputs.forEach((input, index) => {
				input.value = value[index];
			});

			// Call the submit function
			submit();
		}
	} else {
		return;
	}
}

// Function to handle keyup event
function onKeyUp($event) {
	const input = $event.target;
	const value = input.value;
	const fieldIndex = +input.dataset.index; // Get the index of the current input field

	// If the Backspace key is pressed and the current field is not the first one
	if ($event.key === "Backspace" && fieldIndex > 0) {
		// Move focus to the previous input field
		input.previousElementSibling.focus();
	}

	// If the input value is a number
	if (checkNumber(value)) {
		// If the input value is not empty and the current field is not the last one
		if (value.length > 0 && fieldIndex < inputs.length - 1) {
			// Move focus to the next input field
			input.nextElementSibling.focus();
		}

		// If the input value is not empty and the current field is the last one
		if (input.value !== "" && fieldIndex === inputs.length - 1) {
			// Call the submit function
			submit();
		}
	} else {
		// If the input value is not a number, clear the input field
		clear($event);
	}
}

// Function to submit the OTP
function submit() {
	let otp = "";

	// Concatenate the values of all input fields to form the OTP
	inputs.forEach((input) => {
		otp += input.value;
		input.disabled = true; // Disable the input field
	});

	// Log the OTP to the console
	console.log(otp);
}
