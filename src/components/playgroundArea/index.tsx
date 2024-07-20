"use client";
import { adventurer, avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import ToggleButton from "../common/toggleButton";
import Hairs from "../common/hairs";
import { downloadAsJPG } from "@/utility";
import Slider from "../common/slider";

const BackgroundColor = ["b6e3f4", "c0aede", "d1d4f9"];

const PlaygroundArea = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [avatarSvg, setAvatarSvg] = useState<string>("");
  const [avatarOptions, setAvatarOptions] = useState<object>({});
  const [rotate, setRotate] = useState<number>(0);
  const [radius, setRadius] = useState<number>(0);

  const hairs = Array.from({ length: 10 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const Eyebrows = Array.from({ length: 10 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const avatarCreation = () => {
    const avatar = createAvatar(adventurer, {
      seed: "Johny",
      ...avatarOptions,
    });

    setAvatar(avatar.toDataUri());
    setAvatarSvg(avatar.toString());
  };

  const updateOptions = (obj: object) => {
    const option = { ...avatarOptions, ...obj };
    console.log("options", option);
    setAvatarOptions(option);
  };

  useEffect(() => {
    avatarCreation();
  }, [JSON.stringify(avatarOptions)]);

  const downloadAvatar = () => {
    const blob = new Blob([avatarSvg], { type: "image/svg+xml" });

    console.log(avatar);
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a link element
    const a = document.createElement("a");
    a.href = url;
    a.download = "avatar.svg";

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Programmatically trigger the download
    a.click();

    // Clean up: Remove the anchor element and revoke the URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAvatarJpg = () => {
    downloadAsJPG(avatarSvg, "avatar.jpg");
  };

  return (
    <div className="h-[calc(100vh - 64px)] flex p-8 gap-6  flex-col md:flex-row">
      {/* left image container  */}
      <div className="w-full md:w-1/4">
        <div className="h-fit bg-[#ECF0F1] mb-4">
          {avatar ? (
            <div className="flex justify-center items-center">
              <Image src={avatar} height={10000} width={10000} alt="avatar" />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <p>Flip</p>

          <ToggleButton
            handleChange={(checked: boolean) =>
              updateOptions({ flip: checked })
            }
          />
        </div>
        <div>
          <p>Rotate</p>

          <Slider
            value={rotate}
            min={0}
            max={360}
            handleChange={(value: number) => {
              updateOptions({ rotate: value });
              setRotate(value);
            }}
          />
        </div>
        <div>
          <p>Radius</p>

          <Slider
            value={radius}
            min={0}
            max={50}
            handleChange={(value: number) => {
              updateOptions({ radius: value });
              setRadius(value);
            }}
          />
        </div>
      </div>

      {/* right toolbar container  */}
      <div className="w-full mb-4 md:w-3/4">
        <div>
          <div className="mb-4">
            <p className="font-semibold mb-4">Background Color</p>
            <div className="flex gap-2">

            {BackgroundColor?.map((c: string) => (
              <div
                className={`w-12 h-12 bg-[#${c}] cursor-pointer`}
                style={{backgroundColor:`#${c}`}}
                onClick={() => updateOptions({ backgroundColor: [c] })}
              ></div>
            ))}
            </div>

          </div>
          <div>
            <p className="font-semibold mb-4">Long Hairs</p>
            <div className="flex gap-7 flex-wrap">
              {hairs?.map((h: any) => {
                return (
                  <div
                    key={h}
                    className="w-20 h-20 cursor-pointer bg-white"
                    onClick={() => updateOptions({ hair: [`long${h}`] })}
                  >
                    <Hairs variant={h} url={`/hair/long-${h}.png`} />
                  </div>
                );
              })}
            </div>
          </div>
          {/* short hair  */}
          <div>
            <p className="font-semibold mb-4">Short Hairs</p>
            <div className="flex gap-7 flex-wrap">
              {hairs?.map((h: any) => {
                return (
                  <div
                    key={h}
                    className="w-20 h-20 cursor-pointer bg-white"
                    onClick={() => updateOptions({ hair: [`short${h}`] })}
                  >
                    <Hairs variant={h} url={`/hair/short-${h}.png`} />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Eyes  */}
          <div>
            <p className="font-semibold mb-4">Eyes</p>
            <div className="flex gap-7 flex-wrap">
              {hairs?.map((h: any) => {
                return (
                  <div
                    key={h}
                    className="w-20 h-20 cursor-pointer bg-white"
                    onClick={() => updateOptions({ eyes: [`variant${h}`] })}
                  >
                    <Hairs variant={h} url={`/eyes/variant-${h}.png`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eyebrows */}
          <div>
            <p className="font-semibold mb-4">Eyebrows</p>
            <div className="flex gap-7 flex-wrap">
              {Eyebrows?.map((h: any) => {
                return (
                  <div
                    key={h}
                    className="w-20 h-20 cursor-pointer bg-white"
                    onClick={() => updateOptions({ eyebrows: [`variant${h}`] })}
                  >
                    <Hairs variant={h} url={`/eyebrows/variant-${h}.png`} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        {/* <button
          className="bg-blue-700 text-white p-4 rounded-2xl"
          onClick={downloadAvatar}
        >
          Download
        </button> */}
        <button
          className="bg-blue-700 text-white px-4 py-3 rounded-2xl w-full lg:w-fit"
          onClick={downloadAvatarJpg}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default PlaygroundArea;
