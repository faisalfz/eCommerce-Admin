import { useState } from "react";

const UploadImage = () => {
  const [imageFile, setImageFile] = useState("");
  const [imageurl, setImageUrl] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ecommerce");

    fetch("https://api.cloudinary.com/v1_1/dswzjjbvf/image/upload", {
      method: "post",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Access the URL from the response data and set it in the state
        setImageUrl(data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-20">
      <div>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={imageurl} alt="Product Image" />
      </div>
    </div>
  );
};

export default UploadImage;
