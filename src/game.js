let exitBtn = document.getElementById('exit')
exitBtn.addEventListener('click', () => { window.location.href = './index.html' })


//DOM elements

const image = document.getElementById('scene-image')
const text = document.getElementById('text-box')
const btn1 = document.getElementById('button1')
const btn2 = document.getElementById('button2')
const btn3 = document.getElementById('button3')

const healthText = document.getElementById('health')
const goldText = document.getElementById('gold')
const attackText = document.getElementById('attack')

const shopWeaponName = document.getElementById('weapon-name')
const shopWeaponAttack = document.getElementById('weapon-attack')
const shopWeaponPrice = document.getElementById('weapon-price')
const shopWeaponDesc = document.getElementById('weapon-desc')
const shopWeaponImage = document.getElementById('weapon-image')

const shopItemDesc = document.getElementById('shop-item-desc')
const shopItemMessage = document.getElementById('shop-message')
const shopGold = document.getElementById('shop-gold')

const inventoryText = document.getElementById('inventory-items')


//variables

let currentStage = 0;
let currentWeapon = 0;

let health = 100;
let gold = 0;
let attack = 1;

let inventory = []

let chests = new Map()
chests.set('campChest', 3)

const weapons = [
    {
        name: 'Dull Knife',
        attack: 10,
        price: 10,
        desc: '',
        image: './assets/dull-knife.gif',
        purchased: false

    },
    {
        name: 'Chiikawa Pen',
        attack: 15,
        price: 30,
        desc: '',
        image: './assets/chiikawa-pen.gif',
        purchased: false

    },
    {
        name: 'Broken Wheel',
        attack: 30,
        price: 70,
        desc: '',
        image: './assets/bike-wheel.gif',
        purchased: false
    },
]

const enemies = [
    {
        name: 'lion',
        attack: 10,
        image: ''
    }
]


const stages = [
    {
        name: 'camp',
        text: 'Bạn là chú chó cute Sakamoto :>. Sakamoto đang trên đường đi tìm lại bạn của mình là Mochi và Matcha. Sau nhiều ngày tìm kiếm, Sakamoto đã cắm trại trong một khu rừng.',
        image: './assets/camp.gif',
        btnText: {
            btn1: 'Lục một chiếc rương gần đó',
            btn2: 'Xem cửa hàng',
            btn3: 'Đi theo con đường dẫn vao trong rừng sâu',
        },
        btnFunc: {
            btn1: searchChest,
            btn2: openShop,
            btn3: goToWoods,
        }
    },
    {
        name: 'woods',
        text: 'You are now inside the vast forest. Light can hardly shine through the dense foliage. There are two paths leading deeper into the forest.',
        image: './assets/woods.gif',
        btnText: {
            btn1: 'Đi bên trái',
            btn2: 'Đi bên phải',
            btn3: 'Quay về',
        },
        btnFunc: {
            btn1: goToWell,
            btn2: goToCabin,
            btn3: goToCamp,
        }
    },
    {
        name: 'well',
        text: 'You arrive at a well in the middle of a patch. There, you see a sad child looking for something.',
        image: './assets/game-start.gif',
        btnText: {
            btn1: 'Look into well',
            btn2: 'Talk to the child',
            btn3: 'Quay về',
        },
        btnFunc: {
            btn1: inspectWell,
            btn2: startDialog,
            btn3: goToWoods,
        }
    },
    {
        name: 'cabin',
        text: 'You now stand in fron of an old, abandoned cabin.',
        image: './assets/game-start.gif',
        btnText: {
            btn1: 'Inspect front door',
            btn2: 'Go around to the back',
            btn3: 'Quay về',
        },
        btnFunc: {
            btn1: '',
            btn2: goToCabinBack,
            btn3: goToWoods,
        }
    },
    {
        name: 'well-inspect',
        text: 'Cái giếng đầy rêu, dường như đã bị bỏ hoang từ lâu. Có một chiếc cửa khóa bịt miệng giếng.',
        image: './assets/game-start.gif',
        btnText: {
            btn1: '',
            btn2: '',
            btn3: 'Quay về',
        },
        btnFunc: {
            btn1: '',
            btn2: '',
            btn3: goToWell,
        }
    },
    {
        name: 'cabin-back',
        text: 'Bạn vòng ra sau cabin. Căn nhà không có cửa sau. Có một cây cổ thụ to nép vào một góc khoảng sân. Một con sư tử đang nằm ngủ dưới gốc cây.',
        image: './assets/game-start.gif',
        btnText: {
            btn1: 'Xem cây cổ thụ',
            btn2: 'Chọc sư tử',
            btn3: 'Quay về phía trước cabin',
        },
        btnFunc: {
            btn1: '',
            btn2: startBattle,
            btn3: goToCabin,
        }
    },

]

//game mechanics

function initGame() {
    btn1.style.display = 'none';
    btn3.style.display = 'none';
    health = 100;
    gold = 0;
    attack = 0;
    currentWeapon = 0;
    updateStats()
}

function startGame() {
    loadStage(0)
    btn1.style.display = 'inline-block'
    btn3.style.display = 'inline-block'
    exitBtn.style.opacity = 0;
    exitBtn.disabled = true;
}

function updateStats() {
    healthText.innerText = health
    goldText.innerText = gold
    attackText.innerText = attack
    shopGold.innerText = gold
    if (inventory.length != 0) {
        let temp = inventory.join(', ')
        inventoryText.innerText = temp
    }
}

function loadStage(currStage) {
    let stage = stages[currStage]
    image.src = stage.image;
    text.innerText = stage.text

    btn1.innerText = stage.btnText.btn1
    btn2.innerText = stage.btnText.btn2
    btn3.innerText = stage.btnText.btn3

    btn1.onclick = stage.btnFunc.btn1
    btn2.onclick = stage.btnFunc.btn2
    btn3.onclick = stage.btnFunc.btn3
}

function load() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';  // show loading
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // hide loading
    }, 1500);
}

function searchChest() {
    if (currentStage == 0) {
        if (chests.get('campChest') > 0) {
            load()
            let random = Math.ceil(Math.random() * 3) + 5
            gold += random;
            text.innerHTML = `You found ${random} gold in the chest!`
            updateStats()
            chests.set('campChest', chests.get('campChest') - 1)
        } else {
            text.innerHTML = `There are no chests left!`
            return
        }
    }
}

//shop

function openShop() {
    document.getElementById('shop-overlay').style.display = 'flex';
    currentWeapon = 0;
    updateWeapon()
    updateStats()
}

function closeShop() {
    document.getElementById('shop-overlay').style.display = 'none';
}

function updateWeapon() {
    shopWeaponName.innerText = weapons[currentWeapon].name
    shopWeaponAttack.innerText = weapons[currentWeapon].attack
    shopWeaponPrice.innerText = weapons[currentWeapon].price
    shopWeaponDesc.innerText = weapons[currentWeapon].desc
    shopWeaponImage.src = weapons[currentWeapon].image
}

function nextWeapon() {
    if (currentWeapon < weapons.length) {
        currentWeapon += 1;
        updateWeapon()
    } else {
        return
    }
}

function previousWeapon() {
    if (currentWeapon > 0) {
        currentWeapon -= 1;
        updateWeapon()
    } else {
        return
    }
}

function buyWeapon() {
    if (weapons[currentWeapon].purchased == false) {
        if (gold >= weapons[currentWeapon].price) {
            displayShopMsg(`You have bought ${weapons[currentWeapon].name} from the shop!`)
            weapons[currentWeapon].purchased = true;
            gold -= weapons[currentWeapon].price
            attack += weapons[currentWeapon].attack
            inventory.push(weapons[currentWeapon].name)
            updateStats()
        } else {
            displayShopMsg('You don\'t have enough money to buy this weapon!')
        }
    } else {
        displayShopMsg('You have already purchased this weapon!')
    }
}

function displayShopMsg(msg) {
    shopItemMessage.innerText = msg;
    shopItemMessage.style.display = 'inline-block'
    shopItemDesc.style.display = 'none'
    setTimeout(() => {
        shopItemMessage.style.display = 'none'
        shopItemDesc.style.display = 'inline-block'
    }, 2000)
}

//dialog

const dialogLines = [
    { speaker: 'char1', text: "Greetings, traveler." },
    { speaker: 'char2', text: "Who dares enter my forest?" },
    { speaker: 'char1', text: "It is I, the wizard from the north." },
    { speaker: 'char2', text: "Leave now or face the consequences." },
    { speaker: 'char1', text: "It is 1112." },
    { speaker: 'char1', text: "It is121412414orth." },
];

let currentLine = 0;

function startDialog() {
    document.getElementById('dialog-overlay').classList.remove('hidden');
    currentLine = 0;
    showLine();
}

function showLine() {
    const line = dialogLines[currentLine];

    // Highlight the speaker
    document.getElementById('char1').classList.toggle('active', line.speaker === 'char1');
    document.getElementById('char2').classList.toggle('active', line.speaker === 'char2');

    // Update the dialog text
    document.getElementById('dialog-text').textContent = line.text;
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentLine++;
    if (currentLine < dialogLines.length) {
        showLine();
    } else {
        // End dialog
        document.getElementById('dialog-overlay').classList.add('hidden');
    }
});

//fight

let playerHP = 100;
let enemyHP = 100;

function startBattle() {
  document.getElementById("fight-overlay").classList.remove("hidden");
  playerHP = 100;
  enemyHP = 100;
  updateHP();
}

function playerAttack(damage) {
  enemyHP = Math.max(0, enemyHP - damage);
  updateHP();
  if (enemyHP > 0) {
    setTimeout(enemyAttack, 1000);
  } else {
    alert("You defeated the wild wolf!");
    exitBattle();
  }
}

function enemyAttack() {
  const damage = Math.floor(Math.random() * 20) + 5;
  playerHP = Math.max(0, playerHP - damage);
  updateHP();
  if (playerHP <= 0) {
    alert("You were defeated!");
    exitBattle();
  }
}

function updateHP() {
  document.getElementById("player-hp").textContent = playerHP;
  document.getElementById("enemy-hp").textContent = enemyHP;
}

function exitBattle() {
  document.getElementById("fight-overlay").classList.add("hidden");
}



//navigation

function goToCamp() {
    currentStage = 0
    loadStage(currentStage)
}
function goToWoods() {
    currentStage = 1
    loadStage(currentStage)
}
function goToWell() {
    currentStage = 2
    loadStage(currentStage)
}
function goToCabin() {
    currentStage = 3
    loadStage(currentStage)
}

function inspectWell() {
    currentStage = 4
    loadStage(currentStage)
}

function goToCabinBack() {
    currentStage = 5
    loadStage(currentStage)
}



initGame()
