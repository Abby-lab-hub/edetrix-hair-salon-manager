import React, { useState } from 'react';

export default function AdminPanel({ orders, onConfirmOrder, onCancelOrder }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleStatusChange = (orderId, action) => {
    setConfirmAction({ type: action, orderId });
    setConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (confirmAction.type === 'confirm') {
      onConfirmOrder(confirmAction.orderId);
    } else if (confirmAction.type === 'cancel') {
      onCancelOrder(confirmAction.orderId);
    }

    setConfirmModal(false);
    setConfirmAction(null);
    setRejectionReason('');
    setSelectedOrder(null);
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage and confirm customer bookings</p>
      </div>

       {/* Stats */}
       <div className="grid md:grid-cols-4 gap-4 mb-8">
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
           <p className="text-gray-600 text-sm font-semibold mb-2">Total Orders</p>
           <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
         </div>
         <div className="bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 p-6 text-center">
           <p className="text-yellow-700 text-sm font-semibold mb-2">Pending</p>
           <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
         </div>
         <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-6 text-center">
           <p className="text-green-700 text-sm font-semibold mb-2">Confirmed</p>
           <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
         </div>
         <div className="bg-red-50 rounded-lg shadow-sm border border-red-200 p-6 text-center">
           <p className="text-red-700 text-sm font-semibold mb-2">Cancelled</p>
           <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
         </div>
       </div>

       {/* Filter */}
       <div className="mb-6 flex gap-2 flex-wrap">
         {['all', 'pending', 'confirmed', 'cancelled'].map(status => (
           <button
             key={status}
             onClick={() => setFilterStatus(status)}
             className={`px-4 py-2 rounded-lg font-semibold transition ${
               filterStatus === status
                 ? 'bg-blue-600 text-white'
                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
             }`}
           >
             {status.charAt(0).toUpperCase() + status.slice(1)}
           </button>
         ))}
       </div>

       {/* Orders Table */}
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
         {filteredOrders.length > 0 ? (
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="border-b border-gray-200 bg-gray-50">
                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Order ID</th>
                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Style</th>
                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Date & Time</th>
                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredOrders.map((order) => (
                   <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                     <td className="py-4 px-6 font-mono text-sm text-blue-600">{order.id}</td>
                     <td className="py-4 px-6 text-gray-900">
                       <p className="font-semibold">{order.styleName}</p>
                     </td>
                     <td className="py-4 px-6 text-gray-700">
                       <p>{order.date}</p>
                       <p className="text-sm text-gray-600">{order.time}</p>
                     </td>
                     <td className="py-4 px-6 font-bold text-gray-900">${order.price}</td>
                     <td className="py-4 px-6">
                       <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                         order.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                         order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                         'bg-red-100 text-red-700'
                       }`}>
                         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                       </span>
                     </td>
                     <td className="py-4 px-6">
                       <div className="flex gap-2">
                         {order.status === 'pending' && (
                           <>
                             <button
                               onClick={() => handleStatusChange(order.id, 'confirm')}
                               className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition font-semibold"
                             >
                               Confirm
                             </button>
                             <button
                               onClick={() => handleStatusChange(order.id, 'cancel')}
                               className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition font-semibold"
                             >
                               Reject
                             </button>
                           </>
                         )}
                         <button
                           onClick={() => setSelectedOrder(order)}
                           className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition font-semibold"
                         >
                           View
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         ) : (
           <div className="text-center py-12">
             <p className="text-gray-600 text-lg">No orders found</p>
           </div>
         )}
       </div>

       {/* Confirmation Modal */}
       {confirmModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-lg max-w-md w-full p-8">
             <h2 className="text-2xl font-bold mb-4">
               {confirmAction?.type === 'cancel' ? 'Reject Order' : 'Confirm Order'}
             </h2>

             <p className="text-gray-600 mb-6">
               {confirmAction?.type === 'cancel'
                 ? `Are you sure you want to reject this order?`
                 : `Are you sure you want to confirm this order?`}
             </p>

             <div className="flex gap-4">
               <button
                 onClick={handleConfirmAction}
                 className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition ${
                   confirmAction?.type === 'cancel'
                     ? 'bg-red-600 hover:bg-red-700'
                     : 'bg-green-600 hover:bg-green-700'
                 }`}
               >
                 {confirmAction?.type === 'cancel' ? 'Reject' : 'Confirm'}
               </button>
               <button
                 onClick={() => {
                   setConfirmModal(false);
                   setConfirmAction(null);
                   setRejectionReason('');
                 }}
                 className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
               >
                 Cancel
               </button>
             </div>
           </div>
         </div>
       )}

       {/* View Details Modal */}
       {selectedOrder && !confirmModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-lg max-w-md w-full p-8">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold">Order Details</h2>
               <button
                 onClick={() => setSelectedOrder(null)}
                 className="text-gray-500 hover:text-gray-700 text-2xl"
               >
                 ×
               </button>
             </div>

             <div className="space-y-4">
               <div>
                 <p className="text-sm text-gray-600">Order ID</p>
                 <p className="font-mono text-lg text-blue-600">{selectedOrder.id}</p>
               </div>
               <div>
                 <p className="text-sm text-gray-600">Style</p>
                 <p className="font-semibold">{selectedOrder.styleName}</p>
               </div>
               <div>
                 <p className="text-sm text-gray-600">Date & Time</p>
                 <p className="font-semibold">{selectedOrder.date} at {selectedOrder.time}</p>
               </div>
               <div>
                 <p className="text-sm text-gray-600">Price</p>
                 <p className="text-xl font-bold text-blue-600">${selectedOrder.price}</p>
               </div>
               {selectedOrder.notes && (
                 <div>
                   <p className="text-sm text-gray-600">Customer Notes</p>
                   <p className="font-semibold">{selectedOrder.notes}</p>
                 </div>
               )}
               <div>
                 <p className="text-sm text-gray-600">Status</p>
                 <p className={`font-semibold ${selectedOrder.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                   {selectedOrder.status.toUpperCase()}
                 </p>
               </div>
             </div>

             <button
               onClick={() => setSelectedOrder(null)}
               className="w-full mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
             >
               Close
             </button>
           </div>
         </div>
       )}
    </div>
  );
}