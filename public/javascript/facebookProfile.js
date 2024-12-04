



const Id = localStorage.getItem('id');
const profilepage = () => {

    axios.get(`http://localhost:5000/profileget/${Id}`)
        .then((resp) => {
            console.log(resp.data);
            let bannerImage = document.getElementById("bannerImage");
            bannerImage.src = resp.data.bannerImage;
            var profileImages = document.querySelectorAll("body #profileImage");
            profileImages.forEach((profileImage) => {
                profileImage.src = resp.data.profileImage;
            })
            const UserNames = document.querySelectorAll("#UserName");
            UserNames.forEach((UserName) => {
                UserName.innerHTML = resp.data.fullName;
            })
        }).catch((error) => {
            console.log(error);
        })
}
profilepage();

const like = document.querySelector(".like");
const likediv = document.querySelector(".likediv");
like.addEventListener("click", function () {
    likediv.classList.toggle("openlikediv")
})

const changeProfileImage = () => {
    const formData = new FormData();
    let profileImage = document.getElementById("changeproimage").files[0];
    formData.append("profileImage", profileImage);
    axios.put(`http://localhost:5000/updateProfileImage/${Id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then((res) => {
            console.log(res.data.message);
            alert(res.data.message);
            console.log(res.data);
            editProImagecontainer.classList.remove("show");
            profilepage()
        })
        .catch(() => {
            console.log(error);
        });

}
const changeBannerImage = () => {
    const formData = new FormData();
    let bannerImage = document.getElementById("changebaneimage").files[0];
    formData.append("bannerImage", bannerImage);
    axios.put(`http://localhost:5000/updateBannerImage/${Id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    },)
        .then((res) => {
            console.log(res.data.message);
            alert(res.data.message);
            console.log(res.data);
            editbannerImagecontainer.classList.remove("open");
            profilepage()
        }).catch(() => {
            console.log(error);
        })
}


const editbannerImagecontainer = document.querySelector(".editbannerImagecontainer")
const editcoberImage = document.querySelector("#editImage");
editcoberImage.addEventListener("click", () => {
    console.log("hello world");
    editbannerImagecontainer.classList.add("open");

})

const editProImagecontainer = document.querySelector(".editProImage-container")
const editProImage = document.querySelector("#editProImage");
editProImage.addEventListener("click", () => {
    console.log("welcome world");
    editProImagecontainer.classList.add("show");
})

const openprofile = () => {
    window.location.href = "http://localhost:5000/facebookProfile.html"
}


const commentInput = document.querySelector("#commentInput");


const commentButton = document.querySelector("#commentButton");


commentButton.addEventListener("click", () => {

    if (commentInput.value === "") {
        alert("Enter your comment in input")
    } else {
        axios.post(`http://localhost:5000/comment`, {
            comment: commentInput.value
        })
            .then((resp) => {
                console.log(resp);
                alert(resp.data.message);
                dataget()
                
            })
            .catch((error) => {
                console.log(error);
            })
        const comment = commentInput.value;
        console.log(comment);
    }
})


const commentbox = document.querySelector(".commentline")

const dataget = () => {
    axios.get('http://localhost:5000/getallcomment')
        .then((res) => {
            console.log(res.data);
            document.getElementById("contentbox").innerHTML = ""
            res.data.data.map(function (data) {
                console.log(data.length);
                var newData = `
                <li  class="commentlist" id="${data._id}">
                <img alt="profileImage" class="ProfileImage" id="profileImage">
                <p>${data.comment}</p>
                </li>
                `
                document.getElementById("contentbox").innerHTML += newData;
                profilepage();
            })
        })
        .catch((err) => {
            console.log(err);
        })
}
commentbox.addEventListener("click", dataget);










