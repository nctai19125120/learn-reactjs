import { useLayoutEffect, useState, useMemo, useRef, useEffect } from "react";
import { Stage, Image, Layer, Rect } from "react-konva";

const BaseImageComponent = ({
  containerWidth,
  imageUrl,
  width,
  height,
  children,
  handleMouseDownOnStage = function () {},
  handleMouseDownOnImage = function () {},
  handleMouseMoveOnImage = function () {},
}) => {
  // Image props for image customization.
  const [imageProps, setImageProps] = useState({
    image: new window.Image(),
    scale: 1,
    rotation: 0,
    flipX: false,
    flipY: false,
  });
  const handleZoom = (factor) => {
    const newScale = imageProps.scale * factor;
    setImageProps({ ...imageProps, scale: newScale });
  };
  const handleFlip = (axis) => {
    const newValue = !imageProps[axis];
    setImageProps({ ...imageProps, [axis]: newValue });
  };
  const handleRotate = (direction) => {
    const newRotation = imageProps.rotation + direction * 90;
    setImageProps({ ...imageProps, rotation: newRotation });
  };

  const imageRef = useRef(null);
  const [image, setImage] = useState();
  const [size, setSize] = useState({});
  const [scaleRate, setScaleRate] = useState(1);

  useEffect(() => {
    if (containerWidth) {
      console.log("Scale rate set!");
      console.log((containerWidth) / width);
      setScaleRate((containerWidth) / width);
    }
  }, [containerWidth]);

  const imageElement = useMemo(() => {
    const element = new window.Image();
    element.width = width || 650;
    element.height = height || 302;
    element.src = imageUrl;

    setImageProps({
      ...imageProps,
      image: element,
      width: element.width,
      height: element.height,
    });
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
    <div>
      <button onClick={() => handleZoom(1.1)}>Zoom In</button>
      <button onClick={() => handleZoom(0.9)}>Zoom Out</button>
      <button onClick={() => handleFlip("flipX")}>Flip Horizontally</button>
      <button onClick={() => handleFlip("flipY")}>Flip Vertically</button>
      <button onClick={() => handleRotate(-1)}>Rotate Left</button>
      <button onClick={() => handleRotate(1)}>Rotate Right</button>
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
            strokeWidth={1}
            scaleX={scaleRate}
            scaleY={scaleRate}
          />
          <Image
            onMouseDown={baseHandleMouseDownOnImage}
            onMouseMove={baseHandleMouseMoveOnImage}
            ref={imageRef}
            image={image}
            x={imageProps.width / 2}
            y={imageProps.height / 2}
            width={imageProps.width * imageProps.scale}
            height={imageProps.height * imageProps.scale}
            rotation={imageProps.rotation}
            scaleX={imageProps.flipX ? -1 : 1}
            scaleY={imageProps.flipY ? -1 : 1}
            offsetX={imageProps.width / 2}
            offsetY={imageProps.height / 2}
          />
        </Layer>
        {children}
      </Stage>
    </div>
  );
};

export default BaseImageComponent;
