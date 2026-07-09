import { useUserContext } from "../contexts/userContext";
import { useFetch } from "../useFetch";

const API_BASE_URL = import.meta.env.VITE_BASE_URI;

const statusBadgeClass = {
  pending: "bg-warning text-dark",
  completed: "bg-success",
  interrupted: "bg-secondary",
  declined: "bg-danger",
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatAddress = (address) => {
  if (!address) return "Address unavailable";
  const { area, city, state, pincode } = address;
  return [area, city, state, pincode].filter(Boolean).join(", ");
};

const orderTotal = (items = []) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const OrderHistory = () => {
  const { user } = useUserContext();

  const {
    data,
    loading,
    error,
  } = useFetch(
    user?._id ? `${API_BASE_URL}/api/user/${user._id}` : null,
    null
  );

  console.log(user);
  console.log("data: ", data, loading, error);

  if (!user?._id) {
    return (
      <div className="container py-5">
        <p className="text-center text-muted">
          Please log in to view your order history.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <p className="text-center text-danger">
          Failed to load your orders. Please try again later.
        </p>
      </div>
    );
  }

  const orders = data?.user?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>No orders yet</h4>
        <p className="text-muted">
          Once you place an order, it will show up here.
        </p>
      </div>
    );
  }

  // Most recent first
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="container py-4">
      <h3 className="mb-4">My Orders</h3>

      {sortedOrders.map((order) => (
        <div key={order._id} className="card mb-4 shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <div className="fw-semibold">Order #{order._id.slice(-8).toUpperCase()}</div>
              <small className="text-muted">
                Placed on {formatDate(order.createdAt)}
              </small>
            </div>
            <span
              className={`badge ${
                statusBadgeClass[order.payment?.status] || "bg-secondary"
              }`}
            >
              {order.payment?.status || "pending"}
            </span>
          </div>

          <div className="card-body">
            <ul className="list-group list-group-flush mb-3">
              {order.item.map((product, idx) => (
                <li
                  key={product._id?._id || product._id || idx}
                  className="list-group-item d-flex justify-content-between align-items-center px-0"
                >
                  <div>
                    <div>{product.title}</div>
                    <small className="text-muted">
                      Qty: {product.quantity} &times; ₹{product.price}
                    </small>
                  </div>
                  <div className="fw-semibold">
                    ₹{product.price * product.quantity}
                  </div>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between border-top pt-2">
              <small className="text-muted">
                Delivery to: {formatAddress(order.address)}
              </small>
              <small className="text-muted text-capitalize">
                Payment: {order.payment?.method}
              </small>
            </div>

            <div className="d-flex justify-content-end mt-2">
              <span className="fw-bold">
                Total: ₹{orderTotal(order.item)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;