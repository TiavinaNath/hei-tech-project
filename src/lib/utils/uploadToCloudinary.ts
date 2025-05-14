// utils/uploadToCloudinary.js

export const uploadToCloudinary = async (file: File) => {
  const CLOUD_NAME = "dpjieobci";
  const UPLOAD_PRESET = "hei-tech";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Échec de l’upload sur Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
};
