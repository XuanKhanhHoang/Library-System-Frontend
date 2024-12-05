"use client";
import React, { useState, useRef, useEffect } from "react";
import "./expandableText.css";
import { ArrowDownSquareIcon, ArrowUpSquareIcon } from "lucide-react";

interface ExpandableTextProps {
  text: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && textRef.current.scrollHeight > 200) {
      setIsOverflowing(true);
    }
  }, [text]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`text-container ${isExpanded ? "expanded" : ""}`}
      ref={textRef}
    >
      <p>{text}</p>
      {isOverflowing && (
        <button className="show-more" onClick={toggleExpand}>
          {isExpanded ? (
            <>
              Thu gọn <ArrowUpSquareIcon />
            </>
          ) : (
            <>
              Xem tất cả <ArrowDownSquareIcon />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
