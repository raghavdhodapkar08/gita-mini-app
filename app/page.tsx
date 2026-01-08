"use client";

import { useState } from "react";
import verses from "../data/verse.json";
import translations from "../data/translation.json";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [lang, setLang] = useState<"english" | "hindi">("english");

  const currentVerse = verses[index];

  const chapters = Array.from(
    new Set(verses.map((v: any) => v.chapter_number))
  );

  const versesInChapter = verses.filter(
    (v: any) => v.chapter_number === currentVerse.chapter_number
  );

  const translation = translations.find(
    (t: any) =>
      t.lang === lang &&
      t.verse_id === currentVerse.id
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur rounded-3xl shadow-xl p-7 text-center">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-orange-700 mb-2 tracking-wide">
          Bhagavad Gita
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Chapter {currentVerse.chapter_number}, Verse {currentVerse.verse_number}
        </p>

        {/* Chapter / Verse Selectors */}
        <div className="flex justify-center gap-3 mb-6">
          <select
            className="rounded-full px-4 py-2 text-sm border bg-white shadow-sm"
            value={currentVerse.chapter_number}
            onChange={(e) => {
              const ch = Number(e.target.value);
              const i = verses.findIndex(
                (v: any) => v.chapter_number === ch
              );
              if (i !== -1) setIndex(i);
            }}
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>
                Chapter {ch}
              </option>
            ))}
          </select>

          <select
            className="rounded-full px-4 py-2 text-sm border bg-white shadow-sm"
            value={currentVerse.verse_number}
            onChange={(e) => {
              const vn = Number(e.target.value);
              const i = verses.findIndex(
                (v: any) =>
                  v.chapter_number === currentVerse.chapter_number &&
                  v.verse_number === vn
              );
              if (i !== -1) setIndex(i);
            }}
          >
            {versesInChapter.map((v: any) => (
              <option key={v.id} value={v.verse_number}>
                Verse {v.verse_number}
              </option>
            ))}
          </select>
        </div>

        {/* Language Toggle */}
        <div className="inline-flex rounded-full bg-orange-100 p-1 mb-8">
          {["english", "hindi"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l as any)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                lang === l
                  ? "bg-orange-500 text-white shadow"
                  : "text-orange-700"
              }`}
            >
              {l === "english" ? "English" : "Hindi"}
            </button>
          ))}
        </div>

        {/* Sanskrit */}
        <p className="text-xl text-gray-900 leading-relaxed mb-4 font-medium">
          {currentVerse.text}
        </p>

        {/* Transliteration */}
        <p className="text-sm italic text-gray-500 mb-6">
          {currentVerse.transliteration}
        </p>

        {/* Meaning */}
        <p className="text-gray-700 leading-relaxed mb-10">
          {translation
            ? translation.description
            : "Translation not available"}
        </p>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIndex(Math.max(index - 1, 0))}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
          >
            ⬅ Prev
          </button>

          <button
            onClick={() =>
              setIndex(Math.min(index + 1, verses.length - 1))
            }
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition shadow-lg"
          >
            Next ➡
          </button>
        </div>

      </div>
    </main>
  );
}
