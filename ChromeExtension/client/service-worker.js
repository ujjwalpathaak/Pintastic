chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "post") {
        const formData = new URLSearchParams();

        formData.append('title', request.data.title);
        formData.append('desc', request.data.desc);
        formData.append('image', request.data.image);
        formData.append('email', request.data.email);

        // console.log(JSON.stringify(formData))

        fetch('https://pintastic-extension.onrender.com/newPin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error making API call:', error);
            });
    }
    return true;
});