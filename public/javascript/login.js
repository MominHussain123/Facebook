const login = ()=>{

let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;
    

    if (email === "" && password === "") {
        return alert("Fill your form")
    } else {

    axios.post('http://localhost:5000/login', {
        email: email,
        password: password
    })
        .then(function (res) {
            if (res.data.message === "Login successfully") {
                console.log(res.data.message);
                alert(res.data.message);
                console.log(res.data);
                let userId =res.data.data._id;
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("id",userId);
                window.location.href = `http://localhost:5000/facebook.html`;  
            } else {
                console.log(res.data)
                alert(res.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        email.value = ""
        password.value = ""
    }
})
}
login()





