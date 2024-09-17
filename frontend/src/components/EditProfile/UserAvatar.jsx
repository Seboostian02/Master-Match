import React from "react";
import { useUser } from "../../contexts/UserProvider";

export default function UserAvatar() {
  const { userDetails, loading, error } = useUser();
  return (
    <div className="col-md-4 mb-3 ms-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="User"
              className="rounded-circle"
              width="150"
            />
            <div className="mt-3">
              <h4>{userDetails?.id}</h4>
              <p className="text-secondary mb-1">Continental Automotive</p>
              <p className="text-muted font-size-sm">IASI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
