function generateQR() {
    const content = document.getElementById("qrContent").value.trim();
    if (content === "") {
        alert("Please enter content to generate QR code.");
        return;
    }

    fetch("/qr/qrcode/" + encodeURIComponent(content))
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.blob();
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            const qrCodeDiv = document.getElementById("qrCode");
            qrCodeDiv.innerHTML = `<img src="${imageUrl}" alt="QR Code">`;
        })
        .catch(error => {
            console.error("There was a problem with your fetch operation:", error);
            alert("Failed to generate QR code. Please try again later.");
        });
}
