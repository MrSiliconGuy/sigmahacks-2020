import React, { useState } from "react";

type COVIDTrustBadgeProps = {
  result: "safe" | "sick" | "untested";
};

export default function COVIDTrustBadge({ result }: COVIDTrustBadgeProps) {
  const [resultExpanded, setResultExpanded] = useState(false);

  const resultClass =
    result === "safe" ? "" : result === "sick" ? "danger" : "warning";
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
        <div className={"result " + resultClass}>
          <span className="text-1">
            {result === "safe"
              ? "Safe"
              : result === "sick"
              ? "sick"
              : "Untested"}
          </span>
          <span className="text-2">
            Last test: {result === "untested" ? "never" : "12 days"}
          </span>
        </div>
      </div>
    </div>
  );
}
