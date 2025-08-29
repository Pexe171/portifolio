import { useEffect, useState } from "react";

export default function CodeTyper({ codes, typingSpeed = 80, pause = 1000 }) {
  const [codeIndex, setCodeIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const currentCode = codes[codeIndex];

  useEffect(() => {
    let timeout;
    if (!deleting && index < currentCode.length) {
      timeout = setTimeout(() => setIndex(index + 1), typingSpeed);
    } else if (!deleting && index === currentCode.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && index > 0) {
      timeout = setTimeout(() => setIndex(index - 1), typingSpeed / 2);
    } else if (deleting && index === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setCodeIndex((codeIndex + 1) % codes.length);
      }, pause / 2);
    }
    return () => clearTimeout(timeout);
  }, [index, deleting, currentCode, codeIndex, codes, typingSpeed, pause]);

  return <pre className="text-sm">{currentCode.slice(0, index)}</pre>;
}
