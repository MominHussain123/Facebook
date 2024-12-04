let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;
    let phoneNo = document.querySelector(".phoneNo").value;
    let profileImage = document.getElementById("profileImage").files[0]
    let bannerImage = document.getElementById("bannerimage").files[0]
    console.log(profileImage);

    if (name === "" && email === "" && password === "") {
        return alert("Fill your form")
    } else {
        let formData = new FormData();
        formData.append("fullName", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phoneNo", phoneNo);
        formData.append("profileImage", profileImage);
        formData.append("bannerImage", bannerImage);

        axios.post('http://localhost:5000/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(function (res) {
                if (res.data.message === "User registered successfully") {
                    console.log(res.data.message);
                    alert(res.data.message);
                    window.location.href = "http://localhost:5000/login.html";
                } else {
                    alert(res.data)
                    console.log(res.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            })

        name.value = "";
        email.value = "";
        password.value = "";
    }

})
