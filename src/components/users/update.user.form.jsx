import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserForm = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUsers } = props;

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate])

  const handleSubmitBtn = async () => {
    const response = await updateUserAPI(id, fullName, phone);
    if (response.data) {
      notification.success({
        message: "Update user",
        description: "Update user success"
      });
      resetAndCloseModal();
      await loadUsers();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(response.message)
      })
    }
  }


  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText={"Save"}
      >
        <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <span>Id</span>
            <Input value={id} disabled={true}/>
          </div>
          <div>
            <span>Full Name</span>
            <Input placeholder="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} />
          </div>
          <div>
            <span>Phone number</span>
            <Input placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UpdateUserForm;