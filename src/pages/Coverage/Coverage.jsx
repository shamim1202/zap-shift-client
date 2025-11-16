import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const dist = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (dist) {
      const co_ord = [dist.latitude, dist.longitude];
      mapRef.current.flyTo(co_ord, 14)
    }
  };

  return (
    <div className="md:mx-28 md:my-20">
      <div className="mb-4 md:mb-10 space-y-3 md:space-y-6">
        <h1 className="text-secondary text-2xl md:text-5xl font-bold">
          We are available in 64 districts
        </h1>
        <form onSubmit={handleSearch}>
          <div className="join relative w-full md:w-auto">
            <input
              name="location"
              className="input input-sm md:input-md join-item text-sm md:text-base bg-base-300 border-0 focus:border-0 focus:outline-none focus:ring-0 rounded-full w-full md:w-[400px] md:px-6"
              placeholder="Search here..."
            />
            <button
              type="submit"
              className="btn btn-sm md:btn-md join-item rounded-full bg-primary absolute right-0 md:-right-4 z-10"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div>
        <h3 className="text-secondary text-lg md:text-2xl font-bold py-2 md:py-4">
          We deliver almost all over Bangladesh
        </h3>

        <MapContainer
          center={position}
          zoom={6}
          scrollWheelZoom={false}
          ref={mapRef}
          className="mx-auto w-full h-[50vh] md:h-[70vh] border"
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
