import React, { FC } from "react";

interface SocialIconType {
  size?: string;
  spacex?: string;
  fill?: string;
}

const SocialIcons: FC<SocialIconType> = ({
  size = "24",
  spacex = "space-x-6",
  fill = "white",
}) => {
  return (
    <div className="flex items-center mt-5">
      <div className={`flex items-center ${spacex}`}>
        <a
          href="https://www.facebook.com/profile.php?id=61575679883007"
          className="flex items-center justify-center transition"
          style={{ width: size, height: size }}
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={fill}
            width={size}
            height={size}
          >
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.494v-9.294H9.692V11.08h3.127V8.41c0-3.1 1.894-4.787 4.659-4.787 1.325 0 2.462.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.626h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"></path>
          </svg>
        </a>

        <a
          href="https://www.instagram.com/kinigo.media"
          className="flex items-center justify-center transition"
          style={{ width: size, height: size }}
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={fill}
            width={size}
            height={size}
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.335 3.608 1.31.974.974 1.247 2.241 1.31 3.608.058 1.266.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.974.974-2.241 1.247-3.608 1.31-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.974-.974-1.247-2.241-1.31-3.608C2.175 15.646 2.163 15.266 2.163 12s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608C4.517 2.498 5.784 2.225 7.15 2.163 8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.667 0 8.225.012 6.94.07 5.657.128 4.523.335 3.462 1.396c-1.061 1.061-1.268 2.195-1.326 3.479C2.012 8.225 2 8.667 2 12c0 3.333.012 3.775.07 5.06.058 1.283.265 2.418 1.326 3.479 1.061 1.061 2.195 1.268 3.479 1.326 1.283.058 1.725.07 5.06.07s3.775-.012 5.06-.07c1.283-.058 2.418-.265 3.479-1.326 1.061-1.061 1.268-2.195 1.326-3.479.058-1.283.07-1.725.07-5.06s-.012-3.775-.07-5.06c-.058-1.283-.265-2.418-1.326-3.479-1.061-1.061-2.195-1.268-3.479-1.326C15.775.012 15.333 0 12 0z"></path>
            <circle cx="12" cy="12" r="3.562"></circle>
            <path d="M18.406 4.594a1.44 1.44 0 110 2.88 1.44 1.44 0 010-2.88z"></path>
          </svg>
        </a>
        <a
          href="https://www.youtube.com/"
          className="flex items-center justify-center transition"
          style={{ width: size, height: size }}
          aria-label="YouTube"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={fill}
            width={size}
            height={size}
          >
            <path d="M19.615 3.184c-1.149-.435-6.03-.435-6.03-.435s-4.885 0-6.03.435C5.09 3.62 4.207 4.507 3.871 5.727 3.434 7.033 3.434 12 3.434 12s0 4.967.437 6.273c.336 1.22 1.219 2.107 2.259 2.543 1.149.435 6.03.435 6.03.435s4.885 0 6.03-.435c1.04-.436 1.923-1.323 2.259-2.543.437-1.306.437-6.273.437-6.273s0-4.967-.437-6.273c-.336-1.22-1.219-2.107-2.259-2.543zM10 15.072V8.928l5.485 3.072L10 15.072z"></path>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/"
          className="flex items-center justify-center transition"
          style={{ width: size, height: size }}
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={fill}
            width={size}
            height={size}
          >
            <path d="M22.23 0H1.77C.791 0 0 .77 0 1.72v20.56C0 23.23.791 24 1.77 24h20.46c.978 0 1.77-.77 1.77-1.72V1.72C24 .77 23.208 0 22.23 0zM7.09 20.452H3.655V9H7.09v11.452zM5.373 7.634c-1.125 0-2.037-.912-2.037-2.037 0-1.124.912-2.037 2.037-2.037s2.037.912 2.037 2.037c0 1.125-.912 2.037-2.037 2.037zm14.44 12.818h-3.436v-5.636c0-1.344-.025-3.072-1.873-3.072-1.876 0-2.163 1.465-2.163 2.976v5.732H8.906V9H12.2v1.562h.049c.458-.867 1.576-1.778 3.244-1.778 3.464 0 4.1 2.28 4.1 5.242v6.426z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
