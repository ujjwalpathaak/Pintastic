const handleAddPin = () => {
    const description = document.getElementById("desc").value;
    const title = document.getElementById("title").value;
    const imageURL = document.getElementById("imageURL").value;
    const email = document.getElementById("email").value;

    chrome.runtime.sendMessage({
        command: 'post', data: {
            title: title,
            desc: description,
            image: imageURL,
            email: email
        }
    });
}


document.getElementById("send-button").addEventListener('click', handleAddPin)