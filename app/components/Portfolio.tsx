"use client";

import { MotionConfig } from "framer-motion";
import SimpleView from "./simple/SimpleView";

export default function Portfolio() {
  return <MotionConfig reducedMotion="user"><SimpleView /></MotionConfig>;
}
