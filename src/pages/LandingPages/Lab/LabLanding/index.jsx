import React, { useState } from "react";

export default function LabLanding() {
  const [message] = useState("Work in progress");
  return <>{message}</>;
}
