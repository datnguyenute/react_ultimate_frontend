import { Drawer } from "antd";

const BookDetail = (props) => {
  const { isOpenDetail, setIsOpenDetail, detailData, setDetailData } = props;

  return (
    <Drawer
      title="Book detail"
      onClose={() => {
        setIsOpenDetail(false);
        setDetailData(null);
      }}
      open={isOpenDetail}
    >
      {detailData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            margin: "15px 0",
          }}
        >
          <p>Id: {detailData._id}</p>
          <p>Tiêu đề: {detailData.mainText}</p>
          <p>Tác giả: {detailData.author}</p>
          <p>Thể loại: {detailData.category}</p>
          <p>
            Giá tiền:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(detailData.price)}
          </p>
          <p>Số lượng: {detailData.quantity}</p>
          <p>Đã bán: {detailData.sold}</p>
          <p>Thumbnail: </p>
          <div>
            <img
              style={{ border: "1px solid #ccc", objectFit: "contain" }}
              width={180}
              height={180}
              src={`${import.meta.env.VITE_BASE_URL}/images/book/${
                detailData.thumbnail
              }`}
            />
          </div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </Drawer>
  );
};

export default BookDetail;
