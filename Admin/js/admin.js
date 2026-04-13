const notificationBtn = document.getElementById("notificationBtn");
const profileBtn = document.getElementById("profileBtn");

const notificationDropdown = notificationBtn.querySelector(".me-dropdown");
const profileDropdown = profileBtn.querySelector(".me-dropdown");

/* Toggle notification */
notificationBtn.addEventListener("click", () => {
  notificationDropdown.style.display =
    notificationDropdown.style.display === "block" ? "none" : "block";

  profileDropdown.style.display = "none";
});

/* Toggle profile */
profileBtn.addEventListener("click", () => {
  profileDropdown.style.display =
    profileDropdown.style.display === "block" ? "none" : "block";

  notificationDropdown.style.display = "none";
});

/* Close when clicking outside */
window.addEventListener("click", (e) => {
  if (!notificationBtn.contains(e.target)) {
    notificationDropdown.style.display = "none";
  }
  if (!profileBtn.contains(e.target)) {
    profileDropdown.style.display = "none";
  }
});


/* COUNT ANIMATION */
const cards = document.querySelectorAll(".metric-card");

cards.forEach(card => {
  const target = +card.dataset.value;
  const display = card.querySelector(".metric-number");

  let count = 0;
  const speed = target / 100;

  const updateCount = () => {
    count += speed;

    if(count < target){
      display.textContent = Math.floor(count).toLocaleString();
      requestAnimationFrame(updateCount);
    } else {
      display.textContent = target.toLocaleString();
    }
  };

  updateCount();
});


/* CHARTS */
const userCtx = document.getElementById("userChart");

new Chart(userCtx, {
  type: "line",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      label: "Users",
      data: [200,400,800,1200,1800,2500,3200],
      borderColor: "#8f7bff",
      backgroundColor: "rgba(143,123,255,0.2)",
      fill: true,
      tension:0.4
    }]
  },
  options:{
    responsive:true,
    plugins:{legend:{display:false}}
  }
});

const sessionCtx = document.getElementById("sessionChart");

new Chart(sessionCtx, {
  type: "bar",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      label: "Sessions",
      data: [100,300,600,900,1300,1600,2000],
      backgroundColor:"#3ed1b5"
    }]
  },
  options:{
    responsive:true,
    plugins:{legend:{display:false}}
  }
});

const feed = document.getElementById("activityFeed");

/* Fake data */
const activities = [
  {type:"user", text:"New user joined from Mumbai"},
  {type:"payment", text:"User upgraded to Pro plan"},
  {type:"session", text:"Completed Sleep Meditation"},
  {type:"user", text:"New signup from Delhi"},
  {type:"session", text:"Finished Focus Session"},
];

/* Icon map */
const icons = {
  user:"👤",
  payment:"💳",
  session:"🧘"
};

/* Create item */
function createActivity(item){
  const div = document.createElement("div");
  div.classList.add("activity-item");

  div.innerHTML = `
    <div class="activity-left">
      <div class="activity-icon ${item.type}">
        ${icons[item.type]}
      </div>
      <div class="activity-text">${item.text}</div>
    </div>
    <div class="activity-time">just now</div>
  `;

  return div;
}

/* Add activity */
function addActivity(){
  const random = activities[Math.floor(Math.random()*activities.length)];
  const element = createActivity(random);

  feed.prepend(element);

  /* Limit items */
  if(feed.children.length > 8){
    feed.removeChild(feed.lastChild);
  }
}

/* Simulate live updates */
setInterval(addActivity, 3000);

/* Initial load */
for(let i=0;i<4;i++){
  addActivity();
}

const grid = document.getElementById("programGrid");
const modal = document.getElementById("modal");

const addBtn = document.getElementById("addProgramBtn");
const saveBtn = document.getElementById("saveProgram");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const durationInput = document.getElementById("duration");

let programs = [
  {title:"Deep Sleep", category:"sleep", duration:"20 min"},
  {title:"Focus Boost", category:"focus", duration:"15 min"},
  {title:"Calm Anxiety", category:"anxiety", duration:"10 min"},
];

/* Render */
function render(filter="all"){
  grid.innerHTML = "";

  programs
    .filter(p => filter === "all" || p.category === filter)
    .forEach((p, index) => {

      const div = document.createElement("div");
      div.classList.add("program-card");

      div.innerHTML = `
        <h3>${p.title}</h3>
        <div class="program-meta">${p.category} • ${p.duration}</div>

        <div class="program-actions">
          <button class="edit" onclick="editProgram(${index})">Edit</button>
          <button class="delete" onclick="deleteProgram(${index})">Delete</button>
        </div>
      `;

      grid.appendChild(div);
    });
}

/* Add */
addBtn.onclick = () => {
  modal.style.display = "flex";
};

saveBtn.onclick = () => {
  const newProgram = {
    title:titleInput.value,
    category:categoryInput.value,
    duration:durationInput.value
  };

  programs.push(newProgram);
  modal.style.display = "none";
  render();
};

/* Delete */
function deleteProgram(index){
  programs.splice(index,1);
  render();
}

/* Edit */
function editProgram(index){
  const p = programs[index];

  titleInput.value = p.title;
  categoryInput.value = p.category;
  durationInput.value = p.duration;

  modal.style.display = "flex";

  saveBtn.onclick = () => {
    programs[index] = {
      title:titleInput.value,
      category:categoryInput.value,
      duration:durationInput.value
    };

    modal.style.display = "none";
    render();
  };
}

/* Filter */
document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    render(btn.dataset.filter);
  };
});

/* Initial */
render();

const Grid = document.getElementById("audioGrid");
const upload = document.getElementById("audioUpload");

let audios = [
  {
    name:"Rain Sound",
    category:"sleep",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    name:"Ocean Waves",
    category:"relax",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    name:"Focus Beat",
    category:"focus",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

/* Render */
function render(filter="all"){
  grid.innerHTML="";

  audios
    .filter(a=> filter==="all" || a.category===filter)
    .forEach((a,index)=>{

      const div = document.createElement("div");
      div.classList.add("audio-card");

      div.innerHTML = `
        <div class="audio-title">${a.name}</div>
        <div class="audio-tag">${a.category}</div>

        <audio controls class="audio-player">
          <source src="${a.src}">
        </audio>

        <div class="audio-actions">
          <button class="tag" onclick="changeTag(${index})">Tag</button>
          <button class="delete" onclick="deleteAudio(${index})">Delete</button>
        </div>
      `;

      grid.appendChild(div);
    });
}

/* Upload */
upload.addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file) return;

  const url = URL.createObjectURL(file);

  audios.push({
    name:file.name,
    category:"relax",
    src:url
  });

  render();
});

/* Delete */
function deleteAudio(index){
  audios.splice(index,1);
  render();
}

/* Change Tag */
function changeTag(index){
  const newTag = prompt("Enter category (sleep/focus/relax)");
  if(newTag){
    audios[index].category = newTag;
    render();
  }
}

/* Filter */
document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  };
});

/* Initial */
render();

const table = document.getElementById("userTable");
const search = document.getElementById("searchUser");

let users = [
  {
    name:"Omkar Kadam",
    email:"omkar@gmail.com",
    plan:"free",
    status:"active",
    last:"2 mins ago"
  },
  {
    name:"Rahul Mehta",
    email:"rahul@gmail.com",
    plan:"paid",
    status:"active",
    last:"10 mins ago"
  },
  {
    name:"Priya Sharma",
    email:"priya@gmail.com",
    plan:"free",
    status:"disabled",
    last:"1 day ago"
  }
];

/* Render */
function render(filter="all", query=""){
  table.innerHTML="";

  users
    .filter(u => filter==="all" || u.plan===filter)
    .filter(u => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query))
    .forEach((u,index)=>{

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td class="plan">${u.plan}</td>
        <td><span class="status ${u.status}">${u.status}</span></td>
        <td>${u.last}</td>
        <td class="actions">
          <button class="disable" onclick="toggleStatus(${index})">Toggle</button>
          <button class="upgrade" onclick="upgrade(${index})">Upgrade</button>
        </td>
      `;

      table.appendChild(row);
    });
}

/* Toggle status */
function toggleStatus(index){
  users[index].status = users[index].status === "active" ? "disabled" : "active";
  render();
}

/* Upgrade */
function upgrade(index){
  users[index].plan = "paid";
  render();
}

/* Search */
search.addEventListener("input",(e)=>{
  render("all", e.target.value.toLowerCase());
});

/* Filter */
document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    render(btn.dataset.filter);
  };
});

/* Init */
render();

/* STATS ANIMATION */
document.querySelectorAll(".stat-card").forEach(card=>{
  const target = +card.dataset.value;
  const el = card.querySelector(".value");

  let count = 0;
  const step = target/100;

  function update(){
    count += step;

    if(count < target){
      el.textContent = Math.floor(count).toLocaleString();
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  update();
});

/* DATA */
let payments = [
  {user:"Omkar", amount:199, status:"success", date:"Today"},
  {user:"Rahul", amount:199, status:"failed", date:"Today"},
  {user:"Priya", amount:1499, status:"success", date:"Yesterday"}
];

const Table = document.getElementById("paymentTable");

/* Render */
function render(){
  Table.innerHTML="";

  payments.forEach((p,index)=>{

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.user}</td>
      <td>₹${p.amount}</td>
      <td><span class="status ${p.status}">${p.status}</span></td>
      <td>${p.date}</td>
      <td class="action">
        ${p.status==="success" ? `<button onclick="refund(${index})">Refund</button>` : ""}
      </td>
    `;

    table.appendChild(row);
  });
}

/* Refund */
function refund(index){
  alert("Refund processed (demo)");
}

/* Init */
render();

const Cards = document.querySelectorAll(".quick-card");

/* Action handler */
cards.forEach(card => {
  card.addEventListener("click", () => {
    const action = card.dataset.action;

    switch(action){

      case "program":
        alert("Redirect to Add Program page");
        // window.location.href = "/add-program";
        break;

      case "audio":
        alert("Open Audio Upload");
        break;

      case "user":
        alert("Open Add User form");
        break;

      case "report":
        alert("Open Analytics Dashboard");
        break;

      default:
        console.log("Unknown action");
    }

  });
});

/* Subtle hover ripple effect */
cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(143,123,255,0.2), #111)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#111";
  });
});

const lastUpdated = document.getElementById("lastUpdated");
const systemStatus = document.getElementById("systemStatus");

/* Set last updated time */
function updateTime(){
  const now = new Date();
  lastUpdated.textContent = "Last updated: " + now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();

/* Simulate system status */
setInterval(()=>{
  const isOnline = Math.random() > 0.2;

  if(isOnline){
    systemStatus.textContent = "● System Online";
    systemStatus.classList.remove("offline");
    systemStatus.classList.add("online");
  } else {
    systemStatus.textContent = "● System Issues";
    systemStatus.classList.remove("online");
    systemStatus.classList.add("offline");
  }

}, 5000);