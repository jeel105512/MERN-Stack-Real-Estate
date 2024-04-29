import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  }

  return (
    <div className="p-3m max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} accept="image/*" hidden />
        <img onClick={() => { fileRef.current.click() }} src={formData.avatar || currentUser.avatar} alt="Profile" className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2" />
        <p className=" text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload (Image must me less then 2 Mbs)</span>
          ) : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (
            <span className="text-slate-700">{`Uploaded ${fileUploadPercentage}%`}</span>
          ) : fileUploadPercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input type="text" placeholder="userName" id="userName" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>

      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sigh out</span>
      </div>
    </div>
  )
}
