import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table, notification } from "antd";
import UpdateUserForm from "./update.user.form";
import { useState } from "react";
import DetailUser from "./detail.user";
import { deleteUserAPI } from "../../services/api.service";
const UsersTable = (props) => {
  const { dataUsers, loadUsers, current, pageSize, total, setCurrent, setPageSize } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [isOpenDataDetail, setIsOpenDataDetail] = useState(false);

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <div>{(current - 1) * pageSize + index + 1}</div>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            setDataDetail(record);
            setIsOpenDataDetail(true);
          }}
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: "15px" }}>
            <EditOutlined
              onClick={() => {
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
              style={{ color: "orange" }}
            />
            <Popconfirm
              placement="top"
              title="Are you sure to delete this user?"
              description="Delete user"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteBtn(record._id)}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteBtn = async (id) => {
    const response = await deleteUserAPI(id);
    if (response.data) {
      notification.success({
        message: "Delete user",
        description: "Delete user success",
      });
      await loadUsers();
    } else {
      notification.error({
        message: "Delete update user",
        description: JSON.stringify(response.message),
      });
    }
  };

  const onChange = async (pagination, filters, sorted, extra) => {
    console.log({ pagination, filters, sorted, extra });
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

  return (
    <>
      <Table
        dataSource={dataUsers}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      <UpdateUserForm
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUsers={loadUsers}
      />
      <DetailUser
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        setIsOpenDataDetail={setIsOpenDataDetail}
        isOpenDataDetail={isOpenDataDetail}
        loadUsers={loadUsers}
      />
    </>
  );
};

export default UsersTable;
