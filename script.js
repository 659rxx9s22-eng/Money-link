const firebaseConfig = {
  apiKey: "AIzaSyCnkJf-6sAeRJpm34yXLmkllWsXm-GJvUc",
  authDomain: "my-dash-c78e3.firebaseapp.com",
  databaseURL: "https://my-dash-c78e3-default-rtdb.firebaseio.com",
  projectId: "my-dash-c78e3",  storageBucket: "my-dash-c78e3.firebasestorage.app",
  messagingSenderId: "137154835768",
  appId: "1:137154835768:web:7f396782de1300f9bdfdcd",
  measurementId: "G-H5S7X0VV1Y"
};

  

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function login() {
    const userInput = document.getElementById('username').value;
    const passInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    if(!userInput || !passInput) return;

    // جلب بيانات المستخدم من قاعدة البيانات
    database.ref('users/' + userInput).once('value').then((snapshot) => {
        const data = snapshot.val();
        
        if (data && data.password === passInput) {
            errorMsg.style.display = 'none';
            showDashboard(userInput, data);
        } else {
            errorMsg.style.display = 'block';
        }
    }).catch(err => {
        console.error(err);
        alert("حدث خطأ في الاتصال بقاعدة البيانات");
    });
}

function showDashboard(username, data) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
    document.getElementById('user-display').innerText = username;
    
    // ربط البيانات ليتم تحديثها فورياً (Real-time)
    const userRef = ref(db, username);.on('value', (snapshot) => {
        const updatedData = snapshot.val();
        if(updatedData) {
            document.getElementById('clicks').innerText = updatedData.clicks || 0;
            document.getElementById('earnings').innerText = "$" + (updatedData.balance || 0);
        }
    });
}

function logout() {
    location.reload();
}

