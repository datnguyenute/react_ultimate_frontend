import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteBookAPI, fetchBookAPI } from "../../services/api.service";
import BookDetail from "./books.detail";
import BookForm from "./books.form";
import BookFormUncontroller from "./book.form.uncontroller";
import UpdateBookUncontrol from "./update.book.uncontrol";
import UpdateBookControl from "./update.book.control";

const BookTable = () => {
  const [bookData, setBookData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const loadBooks = useCallback(async () => {
    setLoadingTable(true);
    const response = await fetchBookAPI(current, pageSize);
    if (response.data) {
      setBookData(response.data.result);
      setCurrent(response.data.meta.current);
      setPageSize(response.data.meta.pageSize);
      setTotal(response.data.meta.total);
    }
    setLoadingTable(false);
  }, [current, pageSize]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleDeleteBook = async (id) => {
    const res = await deleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete book",
        description: "Xóa book thành công",
      });
      await loadBooks();
    } else {
      notification.error({
        message: "Error delete book",
        description: JSON.stringify(res.message),
      });
    }
  };

  // Get detail data
  const onOpenDetail = (record) => {
    setDetailData(record);
    setIsOpenDetail(true);
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <span>{index + 1 + (current - 1) * pageSize}</span>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a href="#" onClick={() => onOpenDetail(record)}>
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (_, record) => {
        return (
          <span style={{ textWrap: "nowrap" }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(record.price)}
          </span>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Xóa book"
            description="Bạn chắc chắn xóa book này ?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log({ pagination, filters, sorter, extra });
    // Set & call lai api
    if (pagination && pagination.current) {
      if (+current !== +pagination.current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pageSize !== +pagination.pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <h3>Table Book</h3>
        <Button type="primary" onClick={() => setIsCreateBookOpen(true)}>
          Create Book
        </Button>
      </div>
      <Table
        loading={loadingTable}
        dataSource={bookData}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          total: total,
          pageSize: pageSize,
          showSizeChanger: true,
          current: current,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChangeTable}
      />
      <BookDetail
        isOpenDetail={isOpenDetail}
        setIsOpenDetail={setIsOpenDetail}
        detailData={detailData}
        setDetailData={setDetailData}
      />
      {/* 
      <BookForm
        isCreateBookOpen={isCreateBookOpen}
        setIsCreateBookOpen={setIsCreateBookOpen}
        loadBooks={loadBooks}
      /> */}
      <BookFormUncontroller
        isCreateBookOpen={isCreateBookOpen}
        setIsCreateBookOpen={setIsCreateBookOpen}
        loadBooks={loadBooks}
      />

      {/* <UpdateBookControl
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        loadBook={loadBooks}
      /> */}

      <UpdateBookUncontrol
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        loadBook={loadBooks}
      />
    </>
  );
};

export default BookTable;
