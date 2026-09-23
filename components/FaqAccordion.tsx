"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

export function FaqItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  function toggle() {
    setOpen((prev) => {
      const next = !prev;
      const el = contentRef.current;
      if (el) {
        el.style.maxHeight = next ? el.scrollHeight + 40 + "px" : "0px";
      }
      return next;
    });
  }

  return (
    <div className="acc-item">
      <button className="acc-q" aria-expanded={open} onClick={toggle}>
        {question}
        <span className="pm">+</span>
      </button>
      <div className="acc-a" ref={contentRef}>
        <div>{children}</div>
      </div>
    </div>
  );
}
