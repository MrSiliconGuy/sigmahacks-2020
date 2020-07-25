import React, { useState } from "react";

type COVIDTrustBadgeProps = {};

export default function COVIDTrustBadge(props: COVIDTrustBadgeProps) {
  const [resultExpanded, setResultExpanded] = useState(false);
  return (
    <div className="COVIDTrustBadge">
      <div className={"result-wrapper " + (resultExpanded ? "expanded" : "")}>
        <div className="result-row">
          <h2 className="mr-3">COVID-Trust</h2>
          <a
            href="#"
            onClick={(e) => {
              setResultExpanded(!resultExpanded);
              e.preventDefault();
            }}
          >
            {resultExpanded ? "Close" : "Expand"}
          </a>
        </div>
        <div className="result">
          <span className="text-1">Safe</span>
          <span className="text-2">Last test: 12 days</span>
        </div>
      </div>
    </div>
  );
}
