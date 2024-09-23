import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UsersForm = (props) => {
  const { loadUsers } = props;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    const response = await createUserAPI(fullName, email, password, phone);
    if (response.data) {
      notification.success({
        message: "Create user",
        description: "Create user success"
      });
      resetAndCloseModal();
      await loadUsers();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(response.message)
      })
    }
  }

  const resetAndCloseModal = () => {
    console.log('resetAndCloseModal');
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Users</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Create User</Button>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText={"Create"}
      >
        <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <span>Full Name</span>
            <Input placeholder="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} />
          </div>
          <div>
            <span>Email</span>
            <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <span>Password</span>
            <Input.Password placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
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

export default UsersForm;