// app/reset-password/page.tsx
"use client";

import ResetPassword from "@/components/ResetPassword/ResetPassword";
import React, { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <ResetPassword />
    </Suspense>
  );
}
