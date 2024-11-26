<template>
    <div>
        <wwLayout :v-bind="$attrs" path="contentLayout"/>
    </div>
</template>

<script>
import { computed, provide, ref } from 'vue';

export default {
    inheritAttrs: false,
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        const orientation = ref(() => props.content.orientation);
        const defaultValue = ref(() => props.content.defaultValue);
        const type = ref(() => props.content.type);

        const { value: componentValue, setValue: setComponentValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'text',
            defaultValue: props.content.defaultValue || null,
            componentType: 'element',
        });
        const value = computed({
            get: () => componentValue.value,
            set: value => {
                setComponentValue(value);
                emit('trigger-event', { name: 'change', event: { value } });
            },
        });

        provide('weweb-assets/ww-accordion-root', { value });

        function toggleAccordion(toggleValue) {
            value.value = value.value === toggleValue ? null : toggleValue;
        }

        function openAccordion(openValue) {
            value.value = openValue;
        }

        function closeAccordion() {
            value.value = null;
        }

        wwLib.wwElement.useRegisterElementLocalContext('ww-accordion-root', ref({ value }), {
            toggleAccordion: {
                method: toggleAccordion,
                editor: {
                    label: 'Toggle accordion',
                    action: 'toggleAccordion',
                },
            },
            openAccordion: {
                method: openAccordion,
                editor: {
                    label: 'Open accordion',
                    action: 'openAccordion',
                },
            },
            closeAccordion: {
                method: closeAccordion,
                editor: {
                    label: 'Close accordion',
                    action: 'closeAccordion',
                },
            },
        });

        return {
            type,
            defaultValue,
            orientation,
        };
    },
};
</script>
