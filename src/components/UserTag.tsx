import React from "react";

const UserTag = ({ userTag }: { userTag: { name: string; image: string } }) => {
  return (
    <div className="flex text-primary  mb-[0.5rem] ml-[0.5rem] font-semibold gap-2 justify-center items-center">
      <img className="rounded-full h-6" src={userTag.image} />
      <div className="text-xs">{userTag.name}</div>
    </div>
  );
};

export default UserTag;
