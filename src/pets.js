let exitBtn = document.getElementById('exit')
exitBtn.addEventListener('click', () => { window.location.href = './index.html' })

let leftBtn = document.getElementById('left')
let rightBtn = document.getElementById('right')
let rotateTable = document.getElementById('rotate-table')
let currentPage = 0;

const petList = [
    {
        name: 'Mochi',
        src: './assets/mochi gif.gif',
        desc: 'Birthday: xx/xx/2025. Bóng bánh'
    },
    {
        name: 'Matcha',
        src: './assets/matcha gif.gif',
        desc: 'matchaaaaaaaaa'
    },
    {
        name: 'Sakamoto',
        src: './assets/sakamoto gif.gif',
        desc: 'Birthday: 18/05/2025. Bóng bánh'
    },
    {
        name: 'Chiikawa',
        src: './assets/chiikawa gif.gif',
        desc: 'wwah wah'
    },
    {
        name: 'Doggo',
        src: './assets/doggo gif.gif',
        desc: 'arf arf'
    },
    {
        name: 'Doggo',
        src: './assets/doggo gif.gif',
        desc: 'arf arf'
    },
    {
        name: 'Doggo',
        src: './assets/doggo gif.gif',
        desc: 'arf arf'
    },
    
    
]

let tables = []

function openModal(img) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalName = document.getElementById("modal-name");
    const modalDesc = document.getElementById("modal-desc");
    modalImg.src = img.src;
    modalName.textContent = img.title
    modalDesc.textContent = img.alt;
    modal.style.display = "flex";
}

function closeModal(event) {
    if (event.target.id === "modal" || event.target.tagName === "BUTTON") {
        document.getElementById("modal").style.display = "none";
    }
}

function createTable() {
    document.getElementById('left').style.opacity = 0;


    let currentPet = 0;
    let numberOfPets = petList.length;
    let numberOfTables = Math.ceil(numberOfPets / 4);

    for (let i = 0; i < numberOfTables; i++) {
        let newTable = document.createElement('table');
        newTable.classList.add('pet-table')

        for (let j = 0; j < 2; j++) {
            let newRow = document.createElement('tr');

            for (let k = 0; k < 2; k++) {
                if (currentPet >= numberOfPets) break;

                let newData = document.createElement('td');
                let img = document.createElement('img');

                img.classList.add('pet');
                img.src = petList[currentPet].src;
                img.alt = petList[currentPet].desc;
                img.title = petList[currentPet].name;
                img.onclick = () => openModal(img);

                newData.appendChild(img);
                newRow.appendChild(newData);
                currentPet++;
            }

            newTable.appendChild(newRow);
        }

        tables.push(newTable);
    }

    updateTable();
}

function left() {
    if (currentPage == 0) {
        return;
    } else {
        currentPage -= 1;
    }
    updateTable()
}

function right() {
    if (currentPage == tables.length - 1) {
        return;
    } else {
        currentPage += 1;
    }
    updateTable()
}

function updateTable() {
    if (currentPage === 0) {
        leftBtn.style.opacity = 0;
        leftBtn.style.cursor = 'default';
    } else {
        leftBtn.style.opacity = 1;
        leftBtn.style.cursor = 'auto';
    }

    if (currentPage === tables.length - 1) {
        rightBtn.style.opacity = 0;
        rightBtn.style.cursor = 'default';
    } else {
        rightBtn.style.opacity = 1;
        rightBtn.style.cursor = 'auto';
    }

    rotateTable.innerHTML = "";
    rotateTable.appendChild(tables[currentPage]);
    console.log(currentPage)
}
