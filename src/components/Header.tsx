"use client";

import Link from "next/link";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  return <div className="header"></div>;
}
