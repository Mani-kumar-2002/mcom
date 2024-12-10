import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const bannerImages = [
    "/assets/banner-1.webp",
    "/assets/banner-2.webp",
    "/assets/banner-3.webp",
    "/assets/account.jpg",
  ];

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      {/* Image Upload Section */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      {/* Banner Display Section */}
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Banners</h2>
        <div className="grid grid-cols-2 gap-4">
          {bannerImages.map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-[200px] object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Feature Image Display Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Feature Images</h2>
        <div className="grid grid-cols-2 gap-4">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((featureImgItem, index) => (
                <div key={index} className="relative">
                  <img
                    src={featureImgItem.image}
                    alt={`Feature Image ${index + 1}`}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </div>
              ))
            : <p>No feature images available.</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
