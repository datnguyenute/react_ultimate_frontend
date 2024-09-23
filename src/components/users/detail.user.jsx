import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { updateUserAvatarAPI, uploadFileAPI } from "../../services/api.service";

const DetailUser = (props) => {
  const { dataDetail, setDataDetail, isOpenDataDetail, setIsOpenDataDetail, loadUsers } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const selected = event.target.files[0];
    if (selected) {
      const objectUrl = URL.createObjectURL(selected);
      setSelectedFile(selected);
      setPreview(objectUrl);
    }
  };

  const handleSaveBtn = async () => {
    const responseUploadFile = await uploadFileAPI(selectedFile, "avatar");
    if (responseUploadFile.data && responseUploadFile.data.fileUploaded) {
      // Call data update user avatar
      const responseUpdateAvatar = await updateUserAvatarAPI(
        responseUploadFile.data.fileUploaded,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (responseUpdateAvatar.data) {
        notification.success({
          message: "Update user avatar",
          description: "Update user avatar success",
        });

        setIsOpenDataDetail(false);
        setPreview(null);
        setSelectedFile(null);
        await loadUsers();
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(responseUploadFile.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(responseUploadFile.message),
      });
    }
  };

  return (
    <Drawer
      title="User detail"
      onClose={() => {
        setIsOpenDataDetail(false);
        setDataDetail(null);
        setPreview(null);
        setSelectedFile(null);
      }}
      open={isOpenDataDetail}
      width={"50vw"}
    >
      {dataDetail ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            margin: "15px 0",
          }}
        >
          <p>Id: {dataDetail.fullName}</p>
          <p>Full name: {dataDetail.fullName}</p>
          <p>Email: {dataDetail.email}</p>
          <p>Phone number: {dataDetail.phone}</p>
          <p>Avatar: </p>
          <div>
            <img
              style={{ border: "1px solid black", objectFit: "contain" }}
              width={180}
              height={180}
              src={`${import.meta.env.VITE_BASE_URL}/images/avatar/${dataDetail.avatar}`}
            />
          </div>
          <div>
            <label
              htmlFor="changeAvatar"
              style={{
                backgroundColor: "orange",
                padding: "8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Change Avatar
            </label>
            <input type="file" hidden id="changeAvatar" onChange={onSelectFile} />
          </div>
          <div>
            {selectedFile && (
              <>
                <p>Preview: </p>
                <img
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    margin: "15px 0",
                  }}
                  width={180}
                  height={180}
                  src={preview}
                />
                <div>
                  <Button type="primary" onClick={handleSaveBtn}>
                    Save
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <p>No data</p>
        </>
      )}
    </Drawer>
  );
};

export default DetailUser;
