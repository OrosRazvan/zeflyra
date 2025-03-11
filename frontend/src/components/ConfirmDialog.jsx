const ConfirmDialog = ({ isOpen, onClose, onConfirm, flightDetails }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
            <div className="space-y-4">
              <p>Are you sure you want to book this flight?</p>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p><strong>From:</strong> {flightDetails.origin}</p>
                <p><strong>To:</strong> {flightDetails.destination}</p>
                <p><strong>Departure:</strong> {new Date(flightDetails.departure_date).toLocaleDateString()}</p>
                {flightDetails.return_date && (
                  <p><strong>Return:</strong> {new Date(flightDetails.return_date).toLocaleDateString()}</p>
                )}
                <p><strong>Price:</strong> €{flightDetails.new_price || flightDetails.price}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Flight
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmDialog;