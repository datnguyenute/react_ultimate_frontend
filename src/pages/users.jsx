import UsersForm from "../components/users/users.form";
import UsersTable from "../components/users/users.table";
import { useEffect, useState } from "react";
import { fetchUsersAPI } from "../services/api.service";

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    loadUsers();
  }, [current, pageSize]);

  const loadUsers = async () => {
    const response = await fetchUsersAPI(current, pageSize);
    if (response.data) {
      setDataUsers(response.data.result);
      setCurrent(response.data.meta.current);
      setPageSize(response.data.meta.pageSize);
      setTotal(response.data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <UsersForm loadUsers={loadUsers} />
      <UsersTable
        dataUsers={dataUsers}
        loadUsers={loadUsers}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default Users;
