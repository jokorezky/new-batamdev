import React from "react";

export const Ascend: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }> = ({
  className,
  ...svgProps
}) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      fill="#000000"
      {...svgProps}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <style type="text/css">
          {" .sharpcorners_een{fill:#14b8a6;} .st0{fill:#0B1719;} "}
        </style>
        <path
          className="sharpcorners_een"
          d="M25,4v3h-3v3h-3v3h-3v3h-3v3h-3v3H7v3l-3,0v3h24V4H25z M23,20h-1v-2.293l-4.646,4.646 l-0.707-0.707L21.293,17H19v-1h4V20z"
        />
      </g>
    </svg>
  </div>
);
