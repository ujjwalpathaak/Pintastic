const express = require('express')
const app = express()
const port = 5000
const { db } = require('./config.js')

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.status(200).send("Working")
})

app.post('/newPin', async (req, res) => {
    const { title, desc, image, email, } = req.body

    const peopleRef = db.collection('user').doc(email)
    const doc = await peopleRef.get()
    console.log(doc.data());
    if (!doc.exists) {
        return res.sendStatus(400).json("user does not exst")
    }
    const postId = Date.now().toString();
    const pinRef = db.collection('pins')
    console.log(pinRef);
    if (!pinRef.exists) {
        return res.sendStatus(400).json("pins does not exst")
    }
    const res2 = await pinRef.add({
        image: image,
        title: title,
        desc: desc,
        userImage: doc.data().userImage,
        userName: doc.data().userName,
        email: doc.data().email,
        link: image,
        name: title,
        id: postId + doc.data().name
    })
    console.log(res2);
    res.status(200).json(res2)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))