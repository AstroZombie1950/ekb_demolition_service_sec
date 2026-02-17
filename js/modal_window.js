const modal = document.getElementById("dmModal");
const closeBtn = document.getElementById("dmClose");

document.querySelectorAll(".open-modal").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener("input", function () {
      let val = input.value.replace(/\D/g, "");

      if (val.startsWith("8")) val = "7" + val.slice(1);
      if (val.startsWith("7")) val = val.slice(1);

      let result = "+7 ";

      if (val.length > 0) result += "(" + val.substring(0, 3);
      if (val.length >= 4) result += ") " + val.substring(3, 6);
      if (val.length >= 7) result += "-" + val.substring(6, 8);
      if (val.length >= 9) result += "-" + val.substring(8, 10);

      input.value = result;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dmForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const phone = document.getElementById("dmPhone").value;

    if (phone.length < 18) {
      alert("Введите корректный номер телефона");
      return;
    }

    const formData = new FormData();
    formData.append("phone", phone);

    fetch("../include/send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        form.querySelector(".dm-success").style.display = "block";
        form.reset();
      })
      .catch((error) => {
        alert("Ошибка отправки. Попробуйте позже.");
      });
  });
});