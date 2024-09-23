import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";

const BookFormUncontroller = (props) => {
  const { isCreateBookOpen, setIsCreateBookOpen, loadBooks } = props;

  const [form] = Form.useForm();

  // Field created form
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

  const onSubmitForm = async (values) => {
    console.log(">> check values: ", values);
    if (selectedFile) {
      const responseUploadAPI = await uploadFileAPI(selectedFile, "book");
      console.log(">> check: ", responseUploadAPI);

      if (responseUploadAPI.data && responseUploadAPI.data.fileUploaded) {
        // Submit form
        const responseCreateBook = await createBookAPI(
          values.mainText,
          values.author,
          values.price,
          values.quantity,
          values.category,
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
    form.resetFields();
    setIsCreateBookOpen(false);
  };

  return (
    <>
      <Modal
        title="Create book"
        open={isCreateBookOpen}
        onOk={() => form.submit()}
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
          <Form form={form} onFinish={onSubmitForm} layout="vertical">
            <Form.Item
              name="mainText"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input book title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="author"
              label="Author"
              rules={[
                {
                  required: true,
                  message: "Please input book author!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Please input book price!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please input book quantity!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please input book category!",
                },
              ]}
            >
              <Select
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
              />
            </Form.Item>

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
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default BookFormUncontroller;
