import React from "react";

const UserTag = ({ user }: { user: { name: string; image: string } }) => {
  return (
    <div className="flex text-primary font-semibold gap-2 justify-center items-center">
      <img className="rounded-full h-6" src={user.image} />
      <div className="text-xs">{user.name}</div>
    </div>
  );
};

export default UserTag;
