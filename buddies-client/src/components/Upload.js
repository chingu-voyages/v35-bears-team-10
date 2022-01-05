import React, { useState } from 'react'
const Upload = () => {
const [image, setImage ] = useState("");
const [ url, setUrl ] = useState("");
const uploadImage = () => {
const data = new FormData()
data.append("file", image)
data.append("upload_preset", "buddies")
data.append("cloud_name","dwmf1yie2")
fetch("  https://api.cloudinary.com/v1_1/dwmf1yie2/image/upload",{
method:"post",
body: data
})
.then(resp => resp.json())
.then(data => {
setUrl(data.url)

})
.catch(err => console.log(err))
}
console.log(url)
return (
<div>
<div>
<input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
<button onClick={uploadImage}>Upload</button>
</div>
<div>
<h1>Uploaded image will be displayed here</h1>
<img src={url} alt="userImg"/>
</div>
</div>
)
}
export default Upload;