import React from "react";

interface MyAvatarProps {
  name: string;
  size?: number;
}

const MyAvatar: React.FC<MyAvatarProps> = ({ name, size = 50 }) => {
  const seed = encodeURIComponent(name);
  const avatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${seed}&flip=true`;

  return (
    <img
      src={avatarUrl}
      alt={`${name}'s Avatar`}
      width={size}
      height={size}
      style={{ borderRadius: "50%", backgroundColor: "green" }} // Agar avatar berbentuk bulat
    />
  );
};

export default MyAvatar;
