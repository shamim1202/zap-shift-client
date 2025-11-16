import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const serviceCenters = useLoaderData();

  return (
    <div className="md:mx-28 md:my-20">
      <div className="mb-4 md:mb-10 space-y-3 md:space-y-6">
        <h1 className="text-secondary text-2xl md:text-5xl font-bold">
          We are available in 64 districts
        </h1>
        <div className="join">
          <input className="input join-item" placeholder="Search here..." />
          <button className="btn join-item rounded-full bg-primary">
            Search
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-secondary text-lg md:text-2xl font-bold py-2 md:py-4">
          We deliver almost all over Bangladesh
        </h3>

        <MapContainer
          center={position}
          zoom={6}
          scrollWheelZoom={false}
          className="mx-auto w-full h-[50vh] md:h-[70vh]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, i) => (
            <Marker key={i} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.city}</strong>
                <br />
                Service Area : {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
