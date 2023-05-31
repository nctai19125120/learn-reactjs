import { useLayoutEffect, useState, useMemo, useRef } from "react";
import { Stage, Image, Layer, Rect } from "react-konva";

const BaseImageComponent = ({
  imageUrl,
  width,
  height,
  children,
  handleMouseDownOnStage = function () {},
  handleMouseDownOnImage = function () {},
  handleMouseMoveOnImage = function () {},
}) => {
  const imageRef = useRef(null);
  const [image, setImage] = useState();
  const [size, setSize] = useState({});

  const imageElement = useMemo(() => {
    const element = new window.Image();
    element.width = width || 650;
    element.height = height || 302;
    element.src = imageUrl;
    return element;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  // Run before update layout
  useLayoutEffect(() => {
    const onload = function () {
      setSize({
        width: imageElement.width,
        height: imageElement.height,
      });
      setImage(imageElement);
      imageRef.current = imageElement;
    };
    imageElement.addEventListener("load", onload);
    return () => {
      imageElement.removeEventListener("load", onload);
    };
  }, [imageElement]);

  const baseHandleMouseDown = (event) => {
    const stage = event.target.getStage();
    const pos = getMousePos(stage);
    handleMouseDownOnStage(pos);
  };

  const baseHandleMouseMove = (event) => {
    // handleMouseMoveOnImage();
  };

  const baseHandleMouseMoveOnImage = (event) => {
    const stage = event.target.getStage();
    const pos = getMousePos(stage);
    handleMouseMoveOnImage(pos);
  };

  const baseHandleMouseDownOnImage = (event) => {
    const stage = event.target.getStage();
    const pos = getMousePos(stage);
    handleMouseDownOnImage(pos);
  };

  const getMousePos = (stage) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y];
  };

  return (
    <>
      <Stage
        width={size.width}
        height={size.height}
        onMouseDown={baseHandleMouseDown}
        onMouseMove={baseHandleMouseMove}
      >
        <Layer>
          <Rect
            width={size.width}
            height={size.height}
            x={0}
            y={0}
            stroke="black"
            strokeWidth={4}
          />
          <Image
            onMouseDown={baseHandleMouseDownOnImage}
            onMouseMove={baseHandleMouseMoveOnImage}
            ref={imageRef}
            image={image}
            x={0}
            y={0}
            width={size.width}
            height={size.height}
          />
        </Layer>
        {children}
      </Stage>
    </>
  );
};

export default BaseImageComponent;
