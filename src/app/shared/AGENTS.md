# Shared curriculum and constants

- `bai-doc.service.ts` and `bai-kiem-tra.service.ts` use one-shot cached reads.
- Import handlers write to Firebase; invalidate caches after successful writes.
- `constants/Constant.ts` contains short configuration and mutable runtime catalog arrays.
  Never paste generated image/file lists here.
- Preserve enum values and Vietnamese curriculum data. Avoid reading Excel/binary files as text.
