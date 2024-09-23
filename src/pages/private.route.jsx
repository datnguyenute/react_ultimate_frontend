import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);
  return user && user.id ? (
    <>{props.children}</>
  ) : (
    <Result
      status="404"
      title="Unauthorize!"
      subTitle="Bạn không có quyền để truy cập nguồn tài nguyên này."
      extra={
        <Button type="primary">
          <Link to="/login">Return to Login Page</Link>
        </Button>
      }
    />
  );
};

export default PrivateRoute;
