# Music + SFX for the nitsuah.io vertical site tour. 100 BPM, D minor, warm and light.
# Usage: python3 synth.py <spot.json> <out.wav>
# One soft chime lands on every page change (the scene starts in spot.json).
import json
import sys
import wave

import numpy as np
from scipy.signal import butter, fftconvolve, sosfilt

SR = 44100
rng = np.random.default_rng(42)
BEAT = 0.6


def hz(m): return 440.0 * 2 ** ((m - 69) / 12)
def lp(x, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), x)
def hp(x, f): return sosfilt(butter(2, f, 'high', fs=SR, output='sos'), x)


def place(buf, sig, t, g=1.0):
    i = int(t * SR)
    if i >= len(buf):
        return
    s = sig[: len(buf) - i]
    buf[i:i + len(s)] += s * g


def tone(f, dur, decay, harm=3):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * k * t) * 0.5 ** (k - 1) for k in range(1, harm + 1))
    return s * np.exp(-t * decay) * np.minimum(1, t / 0.004)


def pad(notes, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for m in notes:
        for d in (-0.003, 0.003):
            s += np.sin(2 * np.pi * hz(m) * (1 + d) * t) + 0.3 * np.sin(4 * np.pi * hz(m) * (1 + d) * t)
    env = np.minimum(1, t / 0.5) * np.minimum(1, (dur - t) / 0.5)
    return lp(s * env, 1500)


def kick():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * (50 + 80 * np.exp(-t * 25)) * t) * np.exp(-t * 12)


def hat():
    n = int(0.05 * SR)
    return hp(rng.standard_normal(n), 8000) * np.exp(-np.arange(n) / SR * 80)


def main():
    spot = json.load(open(sys.argv[1]))
    out = sys.argv[2]
    dur = float(spot['duration'])
    n = int(SR * dur)
    starts = [s[1] for s in spot['scenes']]
    outro = starts[-1]

    music = np.zeros(n)
    CHORDS = [[50, 53, 57], [58, 62, 65], [53, 57, 60, 65], [48, 52, 55]]
    ROOTS = [38, 33, 41, 36]
    for bar in range(int(dur // 2.1) + 1):
        t0 = bar * 2.1
        c = CHORDS[bar % 4]
        place(music, pad(c, 2.3), t0, 0.04)
        place(music, tone(hz(ROOTS[bar % 4]), 2.0, 1.5, 2), t0, 0.18)
        for i, m in enumerate([c[0] + 12, c[1] + 12, c[2] + 12, c[1] + 12]):
            place(music, tone(hz(m), 0.35, 12), t0 + i * 0.5 + 0.25, 0.035)

    drums = np.zeros(n)
    for b in np.arange(1.2, outro - 0.5, BEAT):
        place(drums, kick(), b, 0.3 if (b / BEAT) % 2 < 0.5 else 0.15)
    for b in np.arange(0, outro - 0.5, BEAT):
        place(drums, hat(), b + 0.3, 0.04)

    sfx = np.zeros(n)
    place(sfx, tone(hz(50), 2.5, 0.8, 2), 0, 0.12)
    for i, t0 in enumerate(starts[1:-1]):
        place(sfx, tone(hz(74 + [0, 2, 4, 7, 9][i % 5]), 0.5, 8, 2), t0 + 0.05, 0.07)
    for m in (62, 66, 69, 74):
        place(sfx, tone(hz(m), 2.5, 1.2), outro, 0.05)

    mix = music + drums + sfx
    ir = rng.standard_normal(int(0.5 * SR)) * np.exp(-np.arange(int(0.5 * SR)) / SR * 8)
    wet = fftconvolve(mix, lp(ir, 4000))[:n]
    mix = mix + 0.1 * wet / (np.max(np.abs(wet)) + 1e-9) * np.max(np.abs(mix))
    fade = np.ones(n)
    fade[-int(1.5 * SR):] = np.linspace(1, 0, int(1.5 * SR))
    mix = hp(mix * fade, 30)
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.75
    st = np.stack([mix, mix], axis=1)
    with wave.open(out, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((st * 32767).astype('<i2').tobytes())


if __name__ == '__main__':
    main()
