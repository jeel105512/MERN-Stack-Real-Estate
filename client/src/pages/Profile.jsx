import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart, signOutSuccess, signOutFailure, signInFailure } from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  console.log(userListings.listings);

  const dispatch = useDispatch();

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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.errorMessage));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.errorMessage));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      const response = await fetch("/api/auth/sign-out");
      const data = await response.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.errorMessage));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const response = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await response.json();
      if (data.success === false) {
        return;
      }

      setUserListings(data);
    } catch (error) {
      showListingsError(true);
    }
  }

  return (
    <div className="p-3m max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <input onChange={handleChange} type="text" placeholder="userName" id="userName" className="border p-3 rounded-lg" defaultValue={currentUser.userName} />
        <input onChange={handleChange} type="email" placeholder="email" id="email" className="border p-3 rounded-lg" defaultValue={currentUser.email} />
        <input onChange={handleChange} type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : "Update"}</button>
        <Link to={"/create-Listing"} className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sigh out</span>
      </div>

      <p className="text-red-700 mt-5 text-center">{error ? error : ""}</p>
      <p className="text-green-700 text-center">{updateSuccess ? "User is updated successfully!" : ""}</p>
      <button className="text-green-700 w-full" onClick={handleShowListings}>Show Listings</button>
      <p className="text-red-700 mt-5 text-center">{showListingsError ? "Error showing listings" : ""}</p>


      {userListings.listings && userListings.listings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
          {
            userListings.listings.map((listing) => {
              return (
                <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
                  <Link to={`/listing/${listing._id}`}>
                    <img src={listing.imageUrls[0]} alt="listing-cover" className="h-16 w-16 object-contain" />
                  </Link>
                  <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold hover:underline truncate flex-1"><p>{listing.name}</p></Link>
                  <div className="flex flex-col">
                    <button className="text-red-700 uppercase">Delete</button>
                    <button className="text-green-700 uppercase">Edit</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      }

    </div>
  )
}
