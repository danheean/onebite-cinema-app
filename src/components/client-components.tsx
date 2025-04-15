"use client";

export default function ClientComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("클라이언트 컴포넌트!");
  return <div>{children}</div>;
}
