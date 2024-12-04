

const like = document.querySelector(".like");
const likediv = document.querySelector(".likediv");
like.addEventListener("click", function () {
    likediv.classList.toggle("openlikediv")
})


const Id = localStorage.getItem('id');
console.log(Id);

const UserNames = document.querySelectorAll("#UserName");
axios.get(`http://localhost:5000/profileget/${Id}`, {
    
}).then((resp) => {
    const profileImages = document.querySelectorAll("#profileImage");
    profileImages.forEach((profileImage) => {
        profileImage.src = resp.data.profileImage;
    })
    UserNames.forEach((UserName) => {
        UserName.innerHTML = resp.data.fullName;
    })
}).catch((err) => {
    console.log(err);
})

const previousbnt = document.querySelector(".previousbtn");
const nextbtn = document.querySelector(".nextbtn");
const content = document.querySelector(".content");


previousbnt.addEventListener("click",()=>{
    content.scrollLeft -= 300
})
nextbtn.addEventListener("click",()=>{
    content.scrollLeft += 300
})

const openprofile = () => {
    window.location.href = "http://localhost:5000/facebookProfile.html"
}










const addItem = async () => {

    const input = document.getElementById("input");
    if (input.value === "") {
        alert("Enter your text in input")
    } else {
        await axios.post('http://localhost:5000/postimage', {
            todo: input.value
        })
            .then((resp) => {
                console.log(resp);
                alert(resp.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
        setTimeout(dataget(), 2000)
        input.value = ""
    }
}




    // let postdata = `
    //     <div class="post-box">
    //     <div class="top-pro">
    //         <img src="./images/profile.jpg" alt="profile Image" class="ProfileImage">
    //         <h4 class="setfullName">Momin hussain</h4>
    //     </div>
    //     <video src="./videos/236893.mp4" controls ></video>
    //     <div class="bottom-pro">
    //         <div class="likediv"><i class="fa-solid fa-thumbs-up"></i>
    //             <p class="name"></p>
    //         </div>
    //         <div class="link">
    //             <button class="like"><i class="fa-solid fa-thumbs-up"></i>Like</button>
    //             <button class="comment"><i class="fa-solid fa-comment"></i>Comment</button>
    //         </div>
    //         <div class="comment">
    //             <img src="./images/profile.jpg" alt="profileImage" class="ProfileImage">
    //             <div class="input-box">
    //                 <input type="text" placeholder="Comment">
    //                 <button><i class="fa-regular fa-paper-plane"></i></button>
    //             </div>
    //         </div>
    //     </div>
    // </div>}