import { ref } from 'vue'

// { instanceId, fromZone } of the creature awaiting the effect-summon
// draw/no-draw decision, or null when nothing is pending. It only becomes a
// logged "effect summon" (or a plain summon/set) once the decision resolves
// — see game.resolveEffectSummon().
export const effectSummonPending = ref(null)
