<template>
  <div class="z-10 fixed top-0 left-0 mt-16 ml-16 pointer-events-none">
    <transition
      name="notification"
      mode="in-out"
      tag="div"
    >
      <div
        class="pointer-events-auto touch-area relative max-w-sm m-auto z-10 px-4 py-4 rounded bg-red-500 text-white text-sm"
        v-if="msg.title || msg.description"
        :class="msg.color"
        @click="close(msg.id)"
      >
        <div
          class="font-bold"
          v-if="msg.title"
        >
          {{ msg.title }}
        </div>
        <div
          class="whitespace-pre-line"
          v-if="msg.description"
        >
          {{ msg.description }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import controller from '@/modules/toast/controller'

export default {
    data() {
        return controller.data
    },
    methods: {
        close(id) {
            controller.hide(id)
        },
    },
}
</script>