import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Swal from 'sweetalert2'; // Import SweetAlert2

function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState([]);

  // Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error fetching location: ", error);
      }
    );
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const dest = [e.latlng.lat, e.latlng.lng];
        setDestination(dest);
        fetchRoute(currentLocation, dest);
      },
    });
    return null;
  };

  // Fetch Route using OSRM
  const fetchRoute = async (start, end) => {
    if (!start || !end) return;
    const url = `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRoute(routeCoordinates);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Handle Form Submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    Swal.fire({
      title: "Proceed to payment!",
      text: "You clicked the button!",
      icon: "success",
    }).then(() => {
      window.location.href = '/booking'; // Redirect to the booking page after closing the alert
    });
  };

  return (
    <div style={{ display: 'flex', height: '500px', paddingTop: '20px' }}>
      <div style={{ flex: 1, paddingTop: '20px', height: '720px' }}>
        {currentLocation ? (
          <MapContainer center={currentLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentLocation}></Marker>
            {destination && (
              <>
                <Marker position={destination}></Marker>
                <Polyline positions={route} color="blue" />
              </>
            )}
            <LocationMarker />
          </MapContainer>
        ) : (
          <p>Loading current location...</p>
        )}
      </div>
      <div style={{ width: '550px', height: '700px', padding: '10px', backgroundColor: 'lightblue', border: '2px solid blue', borderRadius: '10px', margin: '15px', marginLeft: '20px', alignContent: 'center', alignItems: 'center' }}>
        <h3 style={{ fontSize: '54px', textAlign: 'center', color: 'blue' }}>Payment Options</h3>
        <form style={{ textAlign: 'left', paddingLeft: '10px' }} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount" style={{ fontSize: '30px', marginRight: '10px', borderRadius: '10px' }}>Amount:</label>
            <input type="number" id="amount" placeholder="Enter amount" style={{ height: '35px', width: '250px', marginLeft: '108px' }} />
          </div><br />
          <div>
            <label htmlFor="paymentMethod" style={{ fontSize: '30px', marginRight: '10px', borderRadius: '10px' }}>Payment Method:</label>
            <select id="paymentMethod" style={{ height: '35px', width: '250px' }}>
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button type="submit" style={{ height: '35px', width: '250px', fontSize: '20px', marginLeft: '120px', marginTop: '20px' }}>Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
}

export default Map;
