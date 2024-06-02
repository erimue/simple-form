document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("the-form");

    const firstnameInput = document.getElementById("firstname");
    const lastnameInput = document.getElementById("lastname");
    const numberInput = document.getElementById("contact");
    const emailInput = document.getElementById("email");
    const fileInput = document.getElementById("file");

    const firstnameError = document.getElementById("firstnameError");
    const lastnameError = document.getElementById("lastnameError");
    const numberError = document.getElementById("contactError");
    const emailError = document.getElementById("emailError");
    const fileError = document.getElementById("fileError");

    const fileprogress = document.getElementById("fileprogress");
    const filepreview = document.getElementById("filepreview");

    function validate(input, ErrorElement) {
        if (!input.value) {
            ErrorElement.style.display = "block";
            input.classList.add("invalid");
        } else {
            ErrorElement.style.display = "none";
            input.classList.remove("invalid");
        }
    }

    firstnameInput.addEventListener("input", function() {
        validate(firstnameInput, firstnameError);
    });

    lastnameInput.addEventListener("input", function() {
        validate(lastnameInput, lastnameError);
    });

    emailInput.addEventListener("input", function() {
        validate(emailInput, emailError);
    });

    numberInput.addEventListener("input", function() {
        validate(numberInput, numberError);
    });

    fileInput.addEventListener("change", function() {
        const files = fileInput.files;
        let valid = true;
        filepreview.innerHTML = "";
        fileprogress.value = 0;

        Array.from(files).forEach(file => {
            if (!(file.type === "application/pdf")) {
                valid = false;
            } else {
                const fileURL = URL.createObjectURL(file);
                const img = document.createElement("img");
                img.src = fileURL;
                filepreview.appendChild(img);
            }
        });

        if (valid) {
            fileError.style.display = "none";
        } else {
            fileError.style.display = "block";
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        validate(firstnameInput, firstnameError);
        validate(lastnameInput, lastnameError);
        validate(emailInput, emailError);
        validate(numberInput, numberError);

        const allValid = ![firstnameError, lastnameError, emailError, numberError, fileError].some(error => error.style.display === "block");

        if (allValid) {
            alert("Form submitted successfully!");
        } else {
            alert("Please correct the errors in the form.");
        }
    });
});
