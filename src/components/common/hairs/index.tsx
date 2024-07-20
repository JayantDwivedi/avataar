import Image from "next/image";
import React from "react";

interface IHairs {
  url: string;
  variant: number;
}

const Hairs = ({ url, variant }: IHairs) => {
  return (
    <div className="pointer">
      <Image src={url} height={10000} width={10000} alt={`${variant}`} />
    </div>
  );
};

export default Hairs;
