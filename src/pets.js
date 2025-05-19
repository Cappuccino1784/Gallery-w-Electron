let exitBtn = document.getElementById('exit')
exitBtn.addEventListener('click', () => { window.location.href = './index.html' })


function openModal(img) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-desc");
    modalImg.src = img.src;
    modalDesc.textContent = img.alt;
    modal.style.display = "flex";
}

function closeModal(event) {
    if (event.target.id === "modal" || event.target.tagName === "BUTTON") {
        document.getElementById("modal").style.display = "none";
    }
}