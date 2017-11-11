document.getElementById("analyse").addEventListener("click", analyze);

function analyze(){

    var imgUrl = document.getElementById("input").value;

    if (!imgUrl) {
        alert("You should enter a valid image URL!");
        return;
    }

    document.getElementById("image").setAttribute('src', imgUrl);

    var reqBody = {
        "url": imgUrl
    };

    var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'yourSecretKeyHere'
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender', initObject);

    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
        if (response.length > 0 && response[0].faceAttributes) {
            var age = response[0].faceAttributes.age;
            var gender = response[0].faceAttributes.gender;
            document.getElementById("output").innerHTML = "Age: " + age + "</br>Gender: " + gender;
        } else alert("No Faces Detected");
    }).catch(function(err){
        alert(err);  
        document.getElementById("output").innerHTML = "";
    });
}