import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Space.css";
import { useWebRTC } from "../../hooks/useWebRTC";

const Space = () => {
  const { id: spaceId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { clients, provideRef } = useWebRTC(spaceId, user);

  return (
    <div>
      <h1>Connected Clients</h1>
      {clients.map((client) => {
        return (
          <div key={client.id}>
            <audio
              ref={(instance) => provideRef(instance, client.id)}
              controls
              autoPlay
            ></audio>
            <p>{client.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Space;
