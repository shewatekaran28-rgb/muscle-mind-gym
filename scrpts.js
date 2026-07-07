const joinBtn = document.getElementById("joinBtn");

joinBtn.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const plan = document.getElementById("plan").value;
    const goal = document.getElementById("goal").value;
    const message = document.getElementById("message").value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        plan === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    const text =
`🏋️ *New Membership Request*

👤 Name: ${name}

📞 Phone: ${phone}

📧 Email: ${email}

💪 Plan: ${plan}

🎯 Fitness Goal: ${goal}

📝 Message: ${message}`;

    const phoneNumber = "919420639362";   // 👈 Apna WhatsApp number yaha likhna

    const url =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

});