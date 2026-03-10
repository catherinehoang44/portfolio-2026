"use client";

import { useState, useEffect, useRef } from "react";

/** Types out `text` character by character when `active`. Resets when active becomes false or text changes. */
export function useTypewriterSingle(
  text: string,
  active: boolean,
  options: { charMs?: number } = {}
) {
  const { charMs = 28 } = options;
  const [index, setIndex] = useState(0);
  const prevTextRef = useRef(text);
  const prevActiveRef = useRef(active);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      prevActiveRef.current = false;
      return;
    }
    if (text !== prevTextRef.current) {
      prevTextRef.current = text;
      setIndex(0);
    }
    prevActiveRef.current = true;

    if (index >= text.length) return;

    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= text.length) return i;
        return i + 1;
      });
    }, charMs);
    return () => clearInterval(id);
  }, [active, text, charMs, index]);

  // Reset index when text changes and we're active (e.g. switched to another tag)
  useEffect(() => {
    if (active && text !== prevTextRef.current) {
      prevTextRef.current = text;
      setIndex(0);
    }
  }, [active, text]);

  return text.slice(0, index);
}

type Phase = "typing" | "hold" | "deleting" | "gap";

const DEFAULT_TYPING = {
  charMs: 45,
  deleteMs: 35,
  pauseAfterType: 800,
  pauseAfterDelete: 250,
  tickMs: 45,
};

/**
 * Cycles through words: type word → pause → delete → short pause → next word.
 * When paused (e.g. hover), returns hoverWord and stops the cycle.
 * Driven by a single interval so phase timeouts are not cleared by effect cleanup.
 */
export function useRotatingTypewriter(
  words: string[],
  options: {
    hoverWord: string;
    paused: boolean;
    charMs?: number;
    deleteMs?: number;
    pauseAfterType?: number;
    pauseAfterDelete?: number;
  }
) {
  const {
    hoverWord,
    paused,
    charMs = DEFAULT_TYPING.charMs,
    deleteMs = DEFAULT_TYPING.deleteMs,
    pauseAfterType = DEFAULT_TYPING.pauseAfterType,
    pauseAfterDelete = DEFAULT_TYPING.pauseAfterDelete,
  } = options;

  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const holdUntilRef = useRef(0);
  const gapUntilRef = useRef(0);
  const word = words[wordIndex] ?? "";
  const displayText = paused ? hoverWord : word.slice(0, charIndex);

  useEffect(() => {
    if (paused) return;

    const tick = () => {
      const now = Date.now();

      if (phase === "hold") {
        if (now < holdUntilRef.current) return;
        setPhase("deleting");
        return;
      }
      if (phase === "gap") {
        if (now < gapUntilRef.current) return;
        setWordIndex((i) => (i + 1) % words.length);
        setCharIndex(0);
        setPhase("typing");
        return;
      }
      if (phase === "typing") {
        const w = words[wordIndex] ?? "";
        if (charIndex >= w.length) {
          setPhase("hold");
          holdUntilRef.current = now + pauseAfterType;
          return;
        }
        setCharIndex((c) => c + 1);
        return;
      }
      if (phase === "deleting") {
        if (charIndex <= 0) {
          setPhase("gap");
          gapUntilRef.current = now + pauseAfterDelete;
          return;
        }
        setCharIndex((c) => c - 1);
      }
    };

    const intervalMs = phase === "typing" ? charMs : phase === "deleting" ? deleteMs : DEFAULT_TYPING.tickMs;
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [paused, phase, charIndex, wordIndex, words, word.length, charMs, deleteMs, pauseAfterType, pauseAfterDelete]);

  // When resuming from hover: show "anything" then delete it and continue
  const prevPausedRef = useRef(paused);
  useEffect(() => {
    if (prevPausedRef.current && !paused) {
      const idx = words.indexOf(hoverWord);
      if (idx >= 0) {
        setWordIndex(idx);
        setCharIndex(hoverWord.length);
        setPhase("deleting");
      }
    }
    prevPausedRef.current = paused;
  }, [paused, hoverWord, words]);

  return displayText;
}
