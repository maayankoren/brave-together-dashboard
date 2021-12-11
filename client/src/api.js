
const url = 'http://127.0.0.1:5000/api/story_tamplate';

export const saveSettings = (storyUpload) =>{
    console.log(storyUpload);
    var request = new Request(url, {
        method: 'POST',
        body: storyUpload,
        headers: new Headers()
    });
    
    fetch(request)
    .then(function() {
        console.log("saved");
    })
}

