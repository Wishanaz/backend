import { useEffect, useRef, useState } from "react";

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import detectExpression from "../util/detectExpression";

export default function useFaceExpression(videoRef) {
  const faceLandmarkerRef = useRef(null);
  const [expression, setExpression] =
    useState("Click the button to detect expression...");

    async function setupCamera() {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      videoRef.current.srcObject = stream;

      return new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          resolve(videoRef.current);
        };
      });
    }

    async function loadModel() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      faceLandmarkerRef.current =
        await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            },

            runningMode: "VIDEO",

            outputFaceBlendshapes: true,

            numFaces: 1,
          }
        );
    }

  

async function detect() {
  const video = videoRef.current;

  if (!video || !faceLandmarkerRef.current) return;

  const results =
    faceLandmarkerRef.current.detectForVideo(
      video,
      performance.now()
    );

  if (results.faceBlendshapes?.length > 0) {
    const blendShapes =
      results.faceBlendshapes[0].categories;

    setExpression(
      detectExpression(blendShapes)
    );
  } else {
    setExpression("No face detected");
  }
}

    async function init() {
      await setupCamera();

      await loadModel();

      videoRef.current.play();

      // Remove automatic detection start so button click triggers detection
    }

  useEffect(() => {
    

    

    init();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [videoRef]);

  return {expression, detect};
}