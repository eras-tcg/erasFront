<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/game'

const emit = defineEmits(['close'])
const game = useGameStore()

const entries = computed(() => [...game.eventLog].reverse())

function formatTime(ts) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}
</script>

<template>
  <Teleport to="body">
    <div class="gl-backdrop" @click.self="emit('close')">
      <div class="gl-modal">
        <div class="gl-header">
          <span class="gl-title">Historial de la partida</span>
          <button class="gl-close" @click="emit('close')">✕</button>
        </div>

        <div v-if="entries.length === 0" class="gl-empty">Sin eventos todavía</div>

        <div v-else class="gl-list">
          <div v-for="e in entries" :key="e.id" class="gl-row">
            <span class="gl-time">{{ formatTime(e.ts) }}</span>
            <span class="gl-text">{{ e.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.gl-backdrop {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.gl-modal {
  background: #1a1f2e;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  width: min(480px, 95vw);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.gl-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.gl-title { font-size: 0.9rem; font-weight: 700; color: #e0e0e0; }
.gl-close {
  background: none; border: none; color: rgba(255,255,255,0.5);
  font-size: 1rem; cursor: pointer; padding: 0.2rem 0.4rem; border-radius: 4px;
}
.gl-close:hover { color: #fff; background: rgba(255,255,255,0.1); }

.gl-empty { text-align: center; padding: 2rem; color: rgba(255,255,255,0.2); font-size: 0.8rem; }

.gl-list {
  overflow-y: auto; flex: 1; padding: 0.5rem;
  display: flex; flex-direction: column; gap: 0.2rem;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.2) transparent;
}
.gl-row {
  display: flex; align-items: baseline; gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.85);
}
.gl-row:nth-child(odd) { background: rgba(255,255,255,0.03); }
.gl-time { flex-shrink: 0; font-size: 0.65rem; color: rgba(255,255,255,0.35); font-variant-numeric: tabular-nums; }
.gl-text { flex: 1; }
</style>
