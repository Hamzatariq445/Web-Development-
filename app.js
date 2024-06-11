    var form = document.getElementById("myForm"),
        imgInput = document.querySelector(".img"),
        file = document.getElementById("imgInput"),
        userName = document.getElementById("name"),
        age = document.getElementById("age"),
        city = document.getElementById("city"),
        email = document.getElementById("email"),
        phone = document.getElementById("phone"),
        post = document.getElementById("post"),
        sDate = document.getElementById("sDate"),
        submitBtn = document.querySelector(".submit"),
        userInfo = document.getElementById("data"),
        modal = document.getElementById("userForm"),
        modalTitle = document.querySelector("#userForm .modal-title"),
        newUserBtn = document.querySelector(".newUser"),
        deleteAllBtn = document.querySelector(".deleteAll");


    let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

    let isEdit = false, editId
    showInfo()

    newUserBtn.addEventListener('click', () => {
        submitBtn.innerText = 'Submit',
            modalTitle.innerText = "Fill the Form"
        isEdit = false
        form.reset()
    })


    file.onchange = function () {
        if (file.files[0].size < 1000000) {  // 1MB = 1000000
            var fileReader = new FileReader();

            fileReader.onload = function (e) {
                imgUrl = e.target.result
                imgInput.src = imgUrl
            }

            fileReader.readAsDataURL(file.files[0])
        } else {
            alert("This file is too large!")
        }
    }

    // Update the function to display user information in cards
function showInfo(data = getData) {
    const userCardsSection = document.querySelector('.user-cards');
    userCardsSection.innerHTML = ''; // Clear existing user cards
    
    data.forEach((element, index) => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        
        userCard.innerHTML = `
            <img src="${element.picture}" alt="${element.employeeName}">
            <div class="card-body">
                <h3>${element.employeeName}</h3>
                <p>Age: ${element.employeeAge}</p>
                <p>City: ${element.employeeCity}</p>
                <p>Email: ${element.employeeEmail}</p>
                <div class="btn-group">
                    <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i> View</button>
                    <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i> Edit</button>
                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i> Delete</button>
                </div>
            </div>
        `;
        
        userCardsSection.appendChild(userCard);
    });
}

    showInfo()


    function readInfo(pic, name, age, city, email, phone, post, sDate) {
        document.querySelector('.showImg').src = pic,
            document.querySelector('#showName').value = name,
            document.querySelector("#showAge").value = age,
            document.querySelector("#showCity").value = city,
            document.querySelector("#showEmail").value = email,
            document.querySelector("#showPhone").value = phone,
            document.querySelector("#showPost").value = post,
            document.querySelector("#showsDate").value = sDate
    }


    function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate) {
        isEdit = true
        editId = index
        imgInput.src = pic
        userName.value = name
        age.value = Age
        city.value = City
        email.value = Email,
            phone.value = Phone,
            post.value = Post,
            sDate.value = Sdate

        submitBtn.innerText = "Update"
        modalTitle.innerText = "Update The Form"
    }


    function deleteInfo(index) {
        if (confirm("Are you sure want to delete?")) {
            getData.splice(index, 1)
            localStorage.setItem("userProfile", JSON.stringify(getData))
            showInfo()
        }
    }

    function deleteAll() {
        if (confirm("Are you sure want to delete all data?")) {
            getData = [];
            localStorage.removeItem("userProfile");
            showInfo();
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const information = {
            picture: imgInput.src || "./image/Profile Icon.webp",
            employeeName: userName.value,
            employeeAge: age.value,
            employeeCity: city.value,
            employeeEmail: email.value,
            employeePhone: phone.value,
            employeePost: post.value,
            startDate: sDate.value
        };
    
        if (!isEdit) {
            getData.push(information);
        } else {
            isEdit = false;
            getData[editId] = information;
        }
    
        localStorage.setItem('userProfile', JSON.stringify(getData));
    
        submitBtn.innerText = "Submit";
        modalTitle.innerHTML = "Fill The Form";
    
        showInfo();
    
        form.reset();
    
        imgInput.src = ""; // Clear the image source
    
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('userForm'));
        modal.hide();
    
        // Redirect to index.html
        window.location.href = "index.html";
    });
    
    

    // Listen for changes in the search input field
    document.getElementById('searchInput').addEventListener('input', function () {
        const searchValue = this.value.trim().toLowerCase();
        const filteredData = getData.filter(function (item) {
            return (
                item.employeeName.toLowerCase().includes(searchValue) ||
                item.employeeCity.toLowerCase().includes(searchValue) ||
                item.employeeEmail.toLowerCase().includes(searchValue) ||
                item.employeePost.toLowerCase().includes(searchValue)
            );
        });
        showInfo(filteredData); // Display filtered data
    });

    deleteAllBtn.addEventListener('click', deleteAll);


//----------------------------------------------------Theme-------------------------------------------------->


    function applyTheme(theme) {
        document.body.style.fontFamily = theme.fontName;
        document.body.style.color = theme.fontColor;
        document.body.style.backgroundColor = theme.bodyColor; // Change this line
        // Add more theme-specific styles as needed
    }
    

    document.addEventListener('DOMContentLoaded', function() {
        const themeSelector = document.getElementById('themeSelector');
        const addNewThemeBtn = document.getElementById('addNewThemeBtn');
        const modal = new bootstrap.Modal(document.getElementById('addThemeModal'), { backdrop: 'static' });
        let themes = {
            default: { fontFamily: 'Arial, sans-serif', fontColor: '#000301', bodyColor: '#fff' },
            cool: { fontFamily: 'Verdana, sans-serif', fontColor: '#00f', bodyColor: '#e0e0e0' },
            sad: { fontFamily: 'Times New Roman, serif', fontColor: '#333', bodyColor: '#c0c0c0' },
        };
    
        function applyTheme(theme) {
            document.body.style.fontFamily = theme.fontFamily;
            document.body.style.color = theme.fontColor;
            document.body.style.backgroundColor = theme.bodyColor;
        }
    
        themeSelector.addEventListener('change', function() {
            applyTheme(themes[this.value]);
        });
    
        addNewThemeBtn.addEventListener('click', function() {
            modal.show();
        });
    
        document.getElementById('newThemeForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let formData = new FormData(this);
            let newThemeName = formData.get('themeName');
            let newTheme = { fontFamily: formData.get('fontName'), fontColor: formData.get('fontColor'), bodyColor: formData.get('bodyColor') };
            themes[newThemeName] = newTheme;
            // Update the dropdown menu options
            let option = document.createElement('option');
            option.value = newThemeName;
            option.innerText = newThemeName;
            themeSelector.appendChild(option);
            applyTheme(newTheme);
            modal.hide();
        });
    
        applyTheme(themes.default);
    });
    
    

//-----------------------------------------Exporting TO PDF----------------------------------------

    
function exportToExcel() {
    const data = [];
    document.querySelectorAll('.employeeDetails').forEach(info => {
        const userData = Array.from(info.children).map(cell => cell.textContent);
        userData.splice(-1, 1); // Remove last element (action buttons)
        data.push(userData);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User Information");
    XLSX.writeFile(wb, "user_information.xlsx");
}

function exportToPDF() {
    const doc = new jsPDF();
    doc.text("User Information", 10, 10);
    const table = document.getElementById("data");

    // Generate PDF table directly from the HTML table
    doc.autoTable({ html: table });

    doc.save("user_information.pdf");
}


//----------------------------------------APPending Data to Google Docs


function appendToGoogleDocs() {
    const data = [];
    document.querySelectorAll('.employeeDetails').forEach(info => {
        const userData = Array.from(info.children).map(cell => cell.textContent);
        userData.splice(-1, 1); // Remove last cell with action buttons
        data.push(userData.join('\t')); // Use tab as delimiter
    });

    const docId = 'https://docs.google.com/document/d/1IyH2_lKCD2_zG1_tYglljBnnP-p_Foab6u9o4ABvWpM/edit';
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const apiUrl = `https://www.googleapis.com/upload/drive/v3/files/${docId}/export?mimeType=application%2Fmsword`;

    fetch(apiUrl, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: data.join('\n')
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to append data to Google Docs');
        }
        console.log('Data appended successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}







//------------------------------------------------------Voice Recognition

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Disable interim results

    recognition.onresult = event => {
        const command = event.results[0][0].transcript.trim().toLowerCase();
        handleVoiceCommand(command);
    };

    recognition.onerror = event => {
        console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
        console.log("Speech recognition ended");
    };

    recognition.start();
}

function handleVoiceCommand(command) {
    const commands = {
        "new user": () => document.querySelector('.newUser').click(),
        "delete all": () => document.querySelector('.deleteAll').click(),
        // Add more commands as needed
    };

    if (commands.hasOwnProperty(command)) {
        commands[command]();
    } else {
        console.log("Unrecognized command:", command);
    }
}

// Apply default theme on page load
applyTheme(themes.default);

