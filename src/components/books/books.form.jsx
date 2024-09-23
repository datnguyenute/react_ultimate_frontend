import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";

const BookForm = (props) => {
  const { isCreateBookOpen, setIsCreateBookOpen, loadBooks } = props;

  // Field created form
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onSelectFile = (event) => {
    console.log(event);

    const selected = event.target.files[0];
    console.log(selected);
    if (selected) {
      const objectUrl = URL.createObjectURL(selected);
      setSelectedFile(selected);
      setThumbnail(objectUrl);
    }
  };

  const onSubmitForm = async () => {
    if (selectedFile) {
      const responseUploadAPI = await uploadFileAPI(selectedFile, "book");
      console.log(">> check: ", responseUploadAPI);

      if (responseUploadAPI.data && responseUploadAPI.data.fileUploaded) {
        // Submit form
        const responseCreateBook = await createBookAPI(
          mainText,
          author,
          price,
          quantity,
          category,
          responseUploadAPI.data.fileUploaded
        );
        if (responseCreateBook.data) {
          notification.success({
            message: "Create book",
            description: "Tạo book thành công!",
          });

          // Reload data
          onCloseModal();
          await loadBooks();
        } else {
          notification.error({
            message: "Error create book",
            description: JSON.stringify(responseCreateBook.message),
          });
        }
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(responseUploadAPI.message),
        });
      }
    } else {
      notification.error({
        message: "Error missing",
        description: "Chưa chọn hình thumbnail",
      });
    }
  };

  const onCloseModal = () => {
    console.log("On close    Modalllllllllllllllllllllllllllllllllllllll");
    setThumbnail(null);
    setSelectedFile(null);
    setMainText("");
    setAuthor("");
    setCategory("");
    setPrice(null);
    setQuantity(null);
    setIsCreateBookOpen(false);
  };

  return (
    <>
      <Modal
        title="Create book"
        open={isCreateBookOpen}
        onOk={() => onSubmitForm()}
        onCancel={() => onCloseModal()}
        maskClosable={false}
        okText="Create"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "20px 0",
          }}
        >
          <div>
            <div>Title</div>
            <Input value={mainText} onChange={(event) => setMainText(event.target.value)} />
          </div>
          <div>
            <div>Author</div>
            <Input value={author} onChange={() => setAuthor(event.target.value)} />
          </div>
          <div>
            <div>Price</div>
            <InputNumber
              value={price}
              style={{
                width: "100%",
              }}
              addonAfter="đ"
              onChange={(event) => setPrice(event)}
            />
          </div>
          <div>
            <div>Quantity</div>
            <InputNumber
              value={quantity}
              style={{
                width: "100%",
              }}
              onChange={(event) => setQuantity(event)}
            />
          </div>
          <div>
            <div>Category</div>
            <Select
              value={category}
              style={{ width: "100%" }}
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Business", label: "Business" },
                { value: "Comics", label: "Comics" },

                { value: "Cooking", label: "Cooking" },
                { value: "Entertainment", label: "Entertainment" },
                { value: "History", label: "History" },

                { value: "Music", label: "Music" },
                { value: "Sports", label: "Sports" },
                { value: "Teen", label: "Teen" },
                { value: "Travel", label: "Travel" },
              ]}
              onChange={(event) => setCategory(event)}
            />
          </div>
          <div>
            <div>Thumbnail</div>
            <div style={{ margin: "8px 0" }}>
              <label
                style={{
                  backgroundColor: "orange",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                htmlFor="uploadBookImage"
              >
                Upload file
              </label>
              <input
                type="file"
                id="uploadBookImage"
                style={{ display: "none" }}
                onChange={onSelectFile}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
              {selectedFile && (
                <div style={{ margin: "10px 0" }}>
                  <img
                    width={180}
                    height={180}
                    style={{ border: "1px solid #ccc", objectFit: "contain" }}
                    src={thumbnail}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookForm;
