import { useEffect, useState } from "react";

export default function CodeTyper({ code, typingSpeed = 80, pause = 1000 }) {
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!deleting && index < code.length) {
      timeout = setTimeout(() => setIndex(index + 1), typingSpeed);
    } else if (!deleting && index === code.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && index > 0) {
      timeout = setTimeout(() => setIndex(index - 1), typingSpeed / 2);
    } else if (deleting && index === 0) {
      timeout = setTimeout(() => setDeleting(false), pause / 2);
    }
    return () => clearTimeout(timeout);
  }, [index, deleting, code, typingSpeed, pause]);

  return <pre className="text-sm">{code.slice(0, index)}</pre>;
}
