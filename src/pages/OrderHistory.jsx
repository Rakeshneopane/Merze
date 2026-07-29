// import { useUserContext } from "../contexts/userContext";
// import { useFetch } from "../useFetch";

// const API_BASE_URL = import.meta.env.VITE_BASE_URI;

// const statusBadgeClass = {
//   pending: "bg-warning text-dark",
//   completed: "bg-success",
//   interrupted: "bg-secondary",
//   declined: "bg-danger",
// };

// const formatDate = (dateString) => {
//   return new Date(dateString).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatAddress = (address) => {
//   if (!address) return "Address unavailable";
//   const { area, city, state, pincode } = address;
//   return [area, city, state, pincode].filter(Boolean).join(", ");
// };

// const orderTotal = (items = []) =>
//   items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// const OrderHistory = () => {
//   const { user } = useUserContext();

//   const {
//     data,
//     loading,
//     error,
//   } = useFetch(
//     user?._id ? `${API_BASE_URL}/api/user/${user._id}` : null,
//     null
//   );

//   console.log(user);
//   console.log("data: ", data, loading, error);

//   if (!user?._id) {
//     return (
//       <div className="container py-5">
//         <p className="text-center text-muted">
//           Please log in to view your order history.
//         </p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="container py-5 text-center">
//         <div className="spinner-border text-success" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container py-5">
//         <p className="text-center text-danger">
//           Failed to load your orders. Please try again later.
//         </p>
//       </div>
//     );
//   }

//   const orders = data?.user?.orders || [];

//   if (orders.length === 0) {
//     return (
//       <div className="container py-5 text-center">
//         <h4>No orders yet</h4>
//         <p className="text-muted">
//           Once you place an order, it will show up here.
//         </p>
//       </div>
//     );
//   }

//   // Most recent first
//   const sortedOrders = [...orders].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   return (
//     <div className="container py-4">
//       <h3 className="mb-4">My Orders</h3>

//       {sortedOrders.map((order) => (
//         <div key={order._id} className="card mb-4 shadow-sm">
//           <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
//             <div>
//               <div className="fw-semibold">Order #{order._id.slice(-8).toUpperCase()}</div>
//               <small className="text-muted">
//                 Placed on {formatDate(order.createdAt)}
//               </small>
//             </div>
//             <span
//               className={`badge ${
//                 statusBadgeClass[order.payment?.status] || "bg-secondary"
//               }`}
//             >
//               {order.payment?.status || "pending"}
//             </span>
//           </div>

//           <div className="card-body">
//             <ul className="list-group list-group-flush mb-3">
//               {order.item.map((product, idx) => (
//                 <li
//                   key={product._id?._id || product._id || idx}
//                   className="list-group-item d-flex justify-content-between align-items-center px-0"
//                 >
//                   <div>
//                     <div>{product.title}</div>
//                     <small className="text-muted">
//                       Qty: {product.quantity} &times; ₹{product.price}
//                     </small>
//                   </div>
//                   <div className="fw-semibold">
//                     ₹{product.price * product.quantity}
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <div className="d-flex justify-content-between border-top pt-2">
//               <small className="text-muted">
//                 Delivery to: {formatAddress(order.address)}
//               </small>
//               <small className="text-muted text-capitalize">
//                 Payment: {order.payment?.method}
//               </small>
//             </div>

//             <div className="d-flex justify-content-end mt-2">
//               <span className="fw-bold">
//                 Total: ₹{orderTotal(order.item)}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderHistory;

import { useUserContext } from "../contexts/userContext";
import { useFetch } from "../useFetch";

const API_BASE_URL = import.meta.env.VITE_BASE_URI;

const statusStyles = {
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
  completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  interrupted: "bg-zinc-200 text-zinc-700 border border-zinc-300",
  declined: "bg-red-100 text-red-700 border border-red-200",
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatAddress = (address) => {
  if (!address) return "Address unavailable";

  const { area, city, state, pincode } = address;

  return [area, city, state, pincode].filter(Boolean).join(", ");
};

const orderTotal = (items = []) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default function OrderHistory() {
  const { user } = useUserContext();

  const { data, loading, error } = useFetch(
    user?._id ? `${API_BASE_URL}/api/user/${user._id}` : null,
    null
  );

  if (!user?._id) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-light">Sign In Required</h2>
          <p className="mt-4 text-zinc-500">
            Please log in to view your order history.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-8 py-6 text-center">
          <p className="text-red-700">
            Failed to load your orders. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const orders = data?.user?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl font-light">No Orders Yet</h2>

          <p className="mt-4 text-zinc-500">
            Once you place your first order, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="border-b border-zinc-200 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Orders
          </p>

          <h1 className="mt-3 text-5xl font-light tracking-tight">
            Order History
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Review your previous purchases, payment status and delivery
            information.
          </p>
        </div>

        <div className="mt-12 space-y-10">

          {sortedOrders.map((order) => (
            <div
              key={order._id}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-start md:justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Order
                  </p>

                  <h2 className="mt-3 text-2xl font-light">
                    #{order._id.slice(-8).toUpperCase()}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>

                </div>

                <span
                  className={`self-start rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] ${
                    statusStyles[order.payment?.status] ||
                    "bg-zinc-100 text-zinc-700 border border-zinc-200"
                  }`}
                >
                  {order.payment?.status || "pending"}
                </span>

              </div>

              <div className="mt-8 divide-y divide-zinc-100">

                {order.item.map((product, idx) => (
                  <div
                    key={product._id?._id || product._id || idx}
                    className="flex items-center justify-between py-5"
                  >
                    <div>

                      <h3 className="font-medium text-zinc-900">
                        {product.title}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        Qty {product.quantity} × ₹{product.price}
                      </p>

                    </div>

                    <span className="font-medium">
                      ₹{product.price * product.quantity}
                    </span>

                  </div>
                ))}

              </div>

              <div className="mt-8 grid gap-8 border-t border-zinc-200 pt-8 md:grid-cols-3">

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Delivery Address
                  </p>

                  <p className="mt-3 text-sm leading-7 text-zinc-700">
                    {formatAddress(order.address)}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Payment
                  </p>

                  <p className="mt-3 capitalize text-zinc-700">
                    {order.payment?.method}
                  </p>

                </div>

                <div className="md:text-right">

                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Total
                  </p>

                  <p className="mt-3 text-3xl font-light">
                    ₹{orderTotal(order.item)}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}