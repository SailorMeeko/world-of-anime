import { firebase } from '../config/firebase';

async function uploadFile(file, location) {
    const filename = file.name;
    return new Promise(function(resolve, reject) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${location}/${filename}`).put(file); 

        uploadTask.on('state_changed', function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            function error(err) {
                reject()
            },
            function complete() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                resolve({
                    url_full: downloadURL
                })
            });
        });
    });
}

export default uploadFile;