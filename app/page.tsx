"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function Home() {
  useEffect(() => {
    api.get("/applications/")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return <div>Check console</div>;
}