<template>
    <div
        :style="{
            '--transition-duration': animationDurationValue + 'ms',
            '--transition-easing': animationEasing,
        }"
        class="ww-accordion-root"
        @keydown.esc="onEscapeKeyDown()"
    ></div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: [],
    setup() {},
};
</script>

<style lang="scss" scoped></style>
