import { useRef, useState } from "react";
import useFaceExpression from "../hook/useFaceExpression";


// export default function FaceExpression() {
//   const videoRef = useRef(null);

  

//   const expression = useFaceExpression(
//     videoRef
//   );

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "20px",
//         marginTop: "30px",
//       }}
//     >
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         width={500}
//         style={{
//           borderRadius: "20px",
//         }}
//       />

//       <h1>{expression}</h1>

//       <button onClick={detect}>Detect Expression</button>
//     </div>
//   );
// }

export default function FaceExpression() {
  const videoRef = useRef(null);

  const {
    expression,
    detect
  } = useFaceExpression(videoRef);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={400}
        style={{
          borderRadius: "20px",
        }}
      />

      <h1>{expression}</h1>

      <button onClick={detect}>
        Detect Expression
      </button>
    </div>
  );
}