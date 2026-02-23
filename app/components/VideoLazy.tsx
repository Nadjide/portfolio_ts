"use client";

import React, { useRef, useEffect, useState } from "react";

interface VideoLazyProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const VideoLazy: React.FC<VideoLazyProps> = ({ src, className, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Start loading when 10% visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      preload="none" // Key: don't download until asked
      muted
      playsInline
      loop
      {...props}
    >
      {isInView && <source src={src} type="video/mp4" />}
    </video>
  );
};

export default VideoLazy;